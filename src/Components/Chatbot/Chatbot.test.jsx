import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Chatbot from "./Chatbot";

// The chat only ever talks to our own /api/chat function, so these tests stub
// fetch with that function's responses. api/chat.js itself runs on Vercel,
// outside this Jest setup.
//
// fireEvent rather than user-event: user-event ships its own copy of
// @testing-library/dom, so its events skip React's act() wrapping and every
// click logs an act() warning.

function replyWith(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
}

async function openChat() {
  fireEvent.click(screen.getByRole("button", { name: /open chat/i }));
  return screen.findByRole("dialog", { name: /ask about sanjeev/i });
}

describe("Chatbot", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete global.fetch;
  });

  it("opens with suggested questions and focuses the input", async () => {
    render(<Chatbot />);

    await openChat();

    expect(screen.getByRole("button", { name: "What's his tech stack?" })).toBeInTheDocument();
    expect(screen.getByLabelText("Your question")).toHaveFocus();
  });

  it("sends the conversation to /api/chat and shows the reply", async () => {
    global.fetch.mockResolvedValueOnce(replyWith(200, { reply: "He works with Java and React." }));
    render(<Chatbot />);

    await openChat();
    fireEvent.change(screen.getByLabelText("Your question"), {
      target: { value: "What does he use?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByText("He works with Java and React.")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({ method: "POST" })
    );
    const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(sentBody).toEqual({ messages: [{ role: "user", text: "What does he use?" }] });
    // The suggestions only show on an empty conversation.
    expect(screen.queryByRole("button", { name: "What's his tech stack?" })).not.toBeInTheDocument();
  });

  it("shows the server's error and retries the same question", async () => {
    global.fetch
      .mockResolvedValueOnce(replyWith(429, { error: "The assistant is busy right now." }))
      .mockResolvedValueOnce(replyWith(200, { reply: "Second time lucky." }));
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "Has he done competitive programming?" }));

    expect(await screen.findByText("The assistant is busy right now.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(await screen.findByText("Second time lucky.")).toBeInTheDocument();
    expect(screen.queryByText("The assistant is busy right now.")).not.toBeInTheDocument();
    const retriedBody = JSON.parse(global.fetch.mock.calls[1][1].body);
    expect(retriedBody.messages).toEqual([
      { role: "user", text: "Has he done competitive programming?" },
    ]);
  });

  it("keeps focus in the input after a suggested question is asked", async () => {
    global.fetch.mockResolvedValueOnce(replyWith(200, { reply: "Java and React." }));
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "What does he do at Namekart?" }));

    // The suggestion buttons are gone now; focus must not fall to <body>.
    expect(await screen.findByText("Java and React.")).toBeInTheDocument();
    expect(screen.getByLabelText("Your question")).toHaveFocus();
  });

  it("closes on Escape even when focus is outside the panel", async () => {
    render(<Chatbot />);

    await openChat();
    document.body.focus();
    fireEvent.keyDown(document.body, { key: "Escape" });

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("falls back to a connection message when the request itself fails", async () => {
    global.fetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "What's his tech stack?" }));

    expect(await screen.findByText(/couldn't reach the assistant/i)).toBeInTheDocument();
  });

  it("turns bare URLs and emails in replies into links", async () => {
    global.fetch.mockResolvedValueOnce(
      replyWith(200, {
        reply:
          "The code is at https://github.com/sanjeev662/ToLet-RoomOnRent. Email sanjeev@example.com.",
      })
    );
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "Show me his best projects" }));

    // Shown without "https://"; the sentence's full stop is not part of the link.
    const link = await screen.findByRole("link", {
      name: "github.com/sanjeev662/ToLet-RoomOnRent",
    });
    expect(link).toHaveAttribute("href", "https://github.com/sanjeev662/ToLet-RoomOnRent");
    expect(screen.getByRole("link", { name: "sanjeev@example.com" })).toHaveAttribute(
      "href",
      "mailto:sanjeev@example.com"
    );
  });

  it("formats Markdown in replies as headings, lists, bold text and links", async () => {
    const reply = [
      "Sanjeev has built several **full-stack** apps.",
      "",
      "### Projects",
      "",
      "* **To-Let**: a room-rental platform. [Live demo](https://to-let-room-on-rent.vercel.app/)",
      "",
      "* **Route-Finder**: walking routes with `Google Maps`.",
      "  - Built in 2023",
      "",
      "3. Third",
      "4. Fourth",
    ].join("\n");
    global.fetch.mockResolvedValueOnce(replyWith(200, { reply }));
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "Show me his best projects" }));

    expect(await screen.findByRole("heading", { level: 3, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText("full-stack").tagName).toBe("STRONG");
    expect(screen.getByText("Google Maps").tagName).toBe("CODE");
    expect(screen.getByRole("link", { name: "Live demo" })).toHaveAttribute(
      "href",
      "https://to-let-room-on-rent.vercel.app/"
    );

    // The blank line between the two bullets doesn't split them into two
    // lists, the indented item nests under Route-Finder, and the numbered
    // list keeps its numbering.
    const [bullets, nested, numbered] = screen.getAllByRole("list");
    expect(bullets.tagName).toBe("UL");
    expect(bullets.children).toHaveLength(2);
    expect(bullets.children[1]).toContainElement(nested);
    expect(nested).toHaveTextContent("Built in 2023");
    expect(numbered.tagName).toBe("OL");
    expect(numbered).toHaveAttribute("start", "3");

    // No Markdown syntax is left showing.
    expect(screen.getByRole("dialog")).not.toHaveTextContent(/\*\*|###|`/);
  });

  it("never renders HTML or javascript: links from a reply", async () => {
    global.fetch.mockResolvedValueOnce(
      replyWith(200, {
        reply: '<img src="x" onerror="alert(1)"> [click me](javascript:alert(1))',
      })
    );
    render(<Chatbot />);

    await openChat();
    fireEvent.click(screen.getByRole("button", { name: "What's his tech stack?" }));

    const dialog = await screen.findByRole("dialog");
    expect(await screen.findByText(/<img src="x"/)).toBeInTheDocument();
    expect(dialog.querySelector("img")).toBeNull();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  // Straight after opening, on purpose: the launcher used to unmount with an
  // exit animation, and closing mid-animation left it gone for good.
  it("closes on Escape, even straight after opening, and returns focus to the launcher", async () => {
    render(<Chatbot />);

    await openChat();
    fireEvent.keyDown(screen.getByLabelText("Your question"), { key: "Escape" });

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /open chat/i })).toHaveFocus()
    );
  });
});
