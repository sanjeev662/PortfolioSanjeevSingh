import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";

import { Button } from "../ui/button";
import { PROFILE } from "../../data";

/**
 * The floating "Ask about Sanjeev" chat. Mounted once in App.js, outside the
 * routes, so it shows on every page and the conversation survives navigation
 * (but not a reload — nothing is stored).
 *
 * The browser only talks to our own /api/chat function (api/chat.js), which
 * holds the Gemini key and adds the portfolio data. See
 * docs/ai-chatbot-design.md.
 */

const FIRST_NAME = PROFILE.shortName.split(" ")[0];

// Must match MAX_MESSAGE_LENGTH in api/chat.js.
const MAX_MESSAGE_LENGTH = 500;

const SUGGESTED_QUESTIONS = [
  "What's his tech stack?",
  "What does he do at Namekart?",
  "Show me his best projects",
  "Has he done competitive programming?",
];

const CONNECTION_ERROR =
  "Couldn't reach the assistant. Check your connection and try again.";

// A URL ends at whitespace, and trailing punctuation belongs to the sentence.
// The capturing group makes split() keep the URLs at the odd indexes.
const URL_PATTERN = /(https?:\/\/\S*[^\s.,;:!?)\]'"])/;

/** Plain text with bare URLs turned into links. Never renders HTML. */
function renderWithLinks(text) {
  return text.split(URL_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring rounded-sm font-medium underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // The conversation, in the shape /api/chat expects: { role, text }.
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messageListRef = useRef(null);
  const hasOpenedRef = useRef(false);

  // Opening moves focus into the panel; closing hands it back to the launcher
  // (but not on first load, when the chat has never been opened).
  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      inputRef.current?.focus();
    } else if (hasOpenedRef.current) {
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  // Escape closes the panel wherever focus is, not only inside it: focus can
  // land on <body>, e.g. when a link in a reply opened a new tab.
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Keep the newest message in view.
  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isSending, error]);

  async function sendConversation(conversation) {
    setIsSending(true);
    setError(null);

    let ok = false;
    let data = {};
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      ok = response.ok;
      data = await response.json();
    } catch {
      // A network failure, or a reply that isn't JSON (e.g. Vercel's own
      // timeout page). Both fall through to the error below.
    }

    if (ok && data.reply) {
      setMessages([...conversation, { role: "model", text: data.reply }]);
    } else {
      setError(data.error || CONNECTION_ERROR);
    }
    setIsSending(false);
  }

  function ask(question) {
    const text = question.trim();
    if (!text || isSending) return;

    const conversation = [...messages, { role: "user", text }];
    setMessages(conversation);
    setInput("");
    // A clicked suggestion disappears once the conversation starts, which
    // would drop focus to <body>. Keep it in the input for the follow-up.
    inputRef.current?.focus();
    sendConversation(conversation);
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  // Retry resends the conversation as it stands: it still ends with the
  // question that failed.
  function handleRetry() {
    sendConversation(messages);
  }

  const reveal = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
        transition: { duration: 0.2 },
      };

  const lastMessage = messages[messages.length - 1];
  const canRetry = error && lastMessage?.role === "user" && !isSending;

  return (
    <>
      {/* The launcher stays mounted and is only hidden while the panel is
          open. Unmounting it with an exit animation meant closing the chat
          within 0.2s of opening it left the launcher gone for good.
          Clear of the home indicator on iOS; ScrollToTop stacks above it. */}
      <div
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        className={`fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <Button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          variant="glow"
          aria-label={`Open chat: ask about ${FIRST_NAME}`}
          title={`Ask about ${FIRST_NAME}`}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            {...reveal}
            role="dialog"
            aria-labelledby="chatbot-title"
            // Full screen on phones; a floating panel from `sm` up. Above the
            // navbar (z-50) so it isn't cut off on small screens.
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            className="fixed inset-0 z-[60] flex flex-col bg-card text-card-foreground sm:inset-auto sm:bottom-8 sm:right-8 sm:h-[min(600px,calc(100dvh_-_4rem))] sm:w-[380px] sm:rounded-xl sm:border sm:border-border sm:shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
              <div>
                <h2 id="chatbot-title" className="text-base font-semibold">
                  Ask about {FIRST_NAME}
                </h2>
                <p className="text-xs text-muted-foreground">
                  AI assistant that answers from this portfolio
                </p>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                aria-label="Close chat"
                className="shrink-0 rounded-full"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <div
              ref={messageListRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
            >
              {/* The greeting is display-only; it isn't sent to the API. */}
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-foreground">
                Hi! I can answer questions about {FIRST_NAME}'s skills,
                experience, projects and education.
              </p>

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <p
                    key={index}
                    className="ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                  >
                    {message.text}
                  </p>
                ) : (
                  <p
                    key={index}
                    className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-foreground"
                  >
                    {renderWithLinks(message.text)}
                  </p>
                )
              )}

              {isSending && (
                <p className="w-fit rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-muted-foreground">
                  <span className="animate-pulse">Thinking…</span>
                </p>
              )}

              {error && (
                <div className="rounded-lg border border-destructive px-3 py-2 text-foreground">
                  <p>{error}</p>
                  {canRetry && (
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                      Retry
                    </Button>
                  )}
                </div>
              )}

              {messages.length === 0 && !isSending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <Button
                      key={question}
                      onClick={() => ask(question)}
                      variant="outline"
                      size="sm"
                      className="h-auto whitespace-normal rounded-full py-1.5 text-left text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border px-4 pt-3"
            >
              <label htmlFor="chatbot-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder={`Ask about ${FIRST_NAME}…`}
                autoComplete="off"
                className="min-h-[44px] w-full flex-1 rounded-lg border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send"
                loading={isSending}
                disabled={!input.trim()}
                className="h-11 w-11 shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
            <p className="px-4 pb-3 pt-2 text-[11px] leading-snug text-muted-foreground">
              AI answers can be wrong. Messages are sent to Google Gemini.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
