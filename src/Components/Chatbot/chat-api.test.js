/**
 * @jest-environment node
 */
import handler from "../../../api/chat";

// Tests for api/chat.js, the server side of the chat. They live here because
// Create React App only runs tests under src/. Gemini is replaced with a fake
// fetch that returns the given reply text.

// A sample note, as it might be added to src/data/chatContext.js (which
// starts out empty).
jest.mock("../../data/chatContext", () => ({
  CHAT_CONTEXT: "\n- Open to backend SDE roles.\n",
}));

function geminiAnswer(text) {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve({ candidates: [{ content: { parts: [{ text }] } }] }),
  };
}

function geminiError(status) {
  return { ok: false, status, json: () => Promise.resolve({ error: { message: "Error" } }) };
}

function geminiReplies(text) {
  global.fetch = jest.fn().mockResolvedValue(geminiAnswer(text));
}

// What fetch throws when AbortSignal.timeout() cuts an attempt off.
const STALLED = Object.assign(new Error("The operation timed out."), { name: "TimeoutError" });

function askChat(question) {
  return new Promise((resolve) => {
    const res = {
      setHeader() {},
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(body) {
        resolve({ status: this.statusCode, body });
      },
    };
    handler({ method: "POST", body: { messages: [{ role: "user", text: question }] }, headers: {} }, res);
  });
}

describe("api/chat", () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-key";
  });

  afterEach(() => {
    delete global.fetch;
    delete process.env.GEMINI_API_KEY;
    jest.restoreAllMocks();
  });

  it("asks Gemini to end every reply with follow-up questions that play to Sanjeev's strengths", async () => {
    geminiReplies("An answer.");

    await askChat("What does he do?");

    const sent = JSON.parse(global.fetch.mock.calls[0][1].body);
    const instruction = sent.systemInstruction.parts[0].text;
    expect(instruction).toContain("FOLLOW_UPS:");
    expect(instruction).toContain("Steer toward Sanjeev's strengths");
  });

  it("adds the notes from src/data/chatContext.js to what Gemini is told", async () => {
    geminiReplies("An answer.");

    await askChat("Is he open to new roles?");

    const sent = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(sent.systemInstruction.parts[0].text).toContain(
      "## More about Sanjeev\n- Open to backend SDE roles."
    );
  });

  it("splits the follow-up questions off the reply", async () => {
    geminiReplies(
      [
        "Sanjeev is an SDE at **Namekart**.",
        "",
        "FOLLOW_UPS:",
        "- What did he build at Rydeu?",
        "- Which projects use React?",
        "- What are his top achievements?",
      ].join("\n")
    );

    const { status, body } = await askChat("What does he do?");

    expect(status).toBe(200);
    expect(body).toEqual({
      reply: "Sanjeev is an SDE at **Namekart**.",
      followUps: [
        "What did he build at Rydeu?",
        "Which projects use React?",
        "What are his top achievements?",
      ],
    });
  });

  it("accepts a Markdown-styled marker and keeps only short questions, at most three", async () => {
    geminiReplies(
      [
        "An answer.",
        "",
        "---",
        "**Follow-ups:**",
        "1. **What did he build at Rydeu?**",
        "* Which projects use React?",
        "- Not a question",
        `- ${"Very long ".repeat(12)}question?`,
        "- One more?",
        "- And another?",
      ].join("\n")
    );

    const { body } = await askChat("What does he do?");

    expect(body).toEqual({
      reply: "An answer.",
      followUps: ["What did he build at Rydeu?", "Which projects use React?", "One more?"],
    });
  });

  it("tries again when Gemini stalls, and answers from the next attempt", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValueOnce(STALLED).mockResolvedValueOnce(geminiAnswer("An answer."));

    const { status, body } = await askChat("What does he do?");

    expect(status).toBe(200);
    expect(body.reply).toBe("An answer.");
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("retries Google's server errors, then gives up with the busy message after three attempts", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(geminiError(503))
      .mockRejectedValueOnce(STALLED)
      .mockResolvedValueOnce(geminiError(500));

    const { status, body } = await askChat("What does he do?");

    expect(status).toBe(502);
    expect(body.error).toMatch(/busy right now/);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("doesn't retry a request Gemini rejects", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue(geminiError(400));

    const { status } = await askChat("What does he do?");

    expect(status).toBe(502);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("keeps the whole answer when the model leaves the section out", async () => {
    geminiReplies("Just an answer that ends in **bold**.");

    const { body } = await askChat("What does he do?");

    expect(body).toEqual({ reply: "Just an answer that ends in **bold**.", followUps: [] });
  });
});
