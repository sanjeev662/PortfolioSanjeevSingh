/**
 * @jest-environment node
 */
import handler from "../../../api/chat";

// Tests for api/chat.js, the server side of the chat. They live here because
// Create React App only runs tests under src/. Gemini is replaced with a fake
// fetch that returns the given reply text.

function geminiReplies(text) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ candidates: [{ content: { parts: [{ text }] } }] }),
  });
}

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
  });

  it("asks Gemini to end every reply with follow-up questions that play to Sanjeev's strengths", async () => {
    geminiReplies("An answer.");

    await askChat("What does he do?");

    const sent = JSON.parse(global.fetch.mock.calls[0][1].body);
    const instruction = sent.systemInstruction.parts[0].text;
    expect(instruction).toContain("FOLLOW_UPS:");
    expect(instruction).toContain("Steer toward Sanjeev's strengths");
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

  it("keeps the whole answer when the model leaves the section out", async () => {
    geminiReplies("Just an answer that ends in **bold**.");

    const { body } = await askChat("What does he do?");

    expect(body).toEqual({ reply: "Just an answer that ends in **bold**.", followUps: [] });
  });
});
