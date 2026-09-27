import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";

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

// Offered under a reply when the model suggested fewer than two follow-up
// questions of its own (api/chat.js asks it for 2-3). Each one leads to a
// strength the portfolio covers well.
const FALLBACK_FOLLOW_UPS = [
  ...SUGGESTED_QUESTIONS,
  "What are his top achievements?",
  "Where did he intern before Namekart?",
  "Which certifications does he have?",
];

/**
 * The 2-3 follow-up questions shown under a reply: the model's suggestions,
 * topped up from FALLBACK_FOLLOW_UPS when it gave fewer than two, and never
 * a question the visitor has already asked.
 */
function pickFollowUps(suggested, conversation) {
  // Compare loosely, so "Show me his projects?" matches "show me his projects".
  const normalise = (question) => question.toLowerCase().replace(/[\s?.!]+$/, "");
  const seen = new Set(
    conversation
      .filter((message) => message.role === "user")
      .map((message) => normalise(message.text))
  );

  const picked = [];
  function offer(question) {
    if (picked.length < 3 && !seen.has(normalise(question))) {
      seen.add(normalise(question));
      picked.push(question);
    }
  }

  suggested.forEach(offer);
  if (picked.length < 2) FALLBACK_FOLLOW_UPS.forEach(offer);
  return picked;
}

const CONNECTION_ERROR =
  "Couldn't reach the assistant. Check your connection and try again.";

// The assistant's messages: the greeting, replies and the typing dots.
// A bordered bubble on the page background rather than a grey `muted` fill:
// links and list markers are in the primary colour, which is at least 4.9:1
// on `background` in all six themes but only 4.0:1 on `muted` in dark.
const REPLY_BUBBLE =
  "w-fit max-w-full space-y-2 rounded-2xl rounded-bl-md border border-border bg-background px-3.5 py-2.5 text-foreground";

/*
 * Reply formatting
 *
 * api/chat.js asks the model for a small part of Markdown, and this is all
 * the chat understands:
 *
 *   ### Heading     - bullet (or * bullet)     1. numbered item
 *   **bold**   *italic*   `code`   [label](https://…)   bare URLs and emails
 *
 * Anything else shows as the plain text it is. Replies become React elements,
 * never HTML (no dangerouslySetInnerHTML), and links only go to http(s) and
 * mailto: addresses, so a reply can't inject markup or a javascript: link.
 * Hand-written rather than a Markdown library because the chat loads on every
 * page and needs so little.
 */

const HEADING_LINE = /^#{1,6}\s+(.+)$/;
const RULE_LINE = /^\s*(?:-\s*){3,}$|^\s*(?:\*\s*){3,}$/;
// Groups: 1 the indent, 2 the number (numbered items only), 3 the item text.
const LIST_ITEM_LINE = /^(\s*)(?:[-*•]|(\d+)[.)])\s+(.*)$/;

// One alternative per inline style. At each position they're tried left to
// right, so a [label](url) link wins over the bare URL inside it. A bare URL
// ends at whitespace, and trailing punctuation belongs to the sentence.
// Groups: 1-2 link label and URL, 3 bold, 4 code, 5 bare URL, 6 email, 7 italic.
const INLINE_PATTERN =
  /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|\*\*(.+?)\*\*|`([^`]+)`|(https?:\/\/\S*[^\s.,;:!?)\]'"*])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|\*([^*\s](?:[^*]*[^*\s])?)\*/g;

function renderLink(href, label, key) {
  const isEmail = href.startsWith("mailto:");
  return (
    <a
      key={key}
      href={href}
      // Web links open in a new tab so the chat stays where it is.
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="focus-ring rounded-sm text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
    >
      {label}
    </a>
  );
}

/** One line of text with bold, italic, code and links turned into elements. */
function renderInline(text) {
  const parts = [];
  let end = 0; // where the previous match ended

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const [whole, linkLabel, linkUrl, bold, code, url, email, italic] = match;
    const key = match.index;
    parts.push(text.slice(end, match.index));

    if (linkUrl) {
      parts.push(renderLink(linkUrl, linkLabel, key));
    } else if (bold) {
      parts.push(
        <strong key={key} className="font-semibold">
          {renderInline(bold)}
        </strong>
      );
    } else if (code) {
      parts.push(
        <code key={key} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.875em]">
          {code}
        </code>
      );
    } else if (url) {
      // "https://www.github.com/sanjeev662/" reads as "github.com/sanjeev662".
      const shortUrl = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      parts.push(renderLink(url, shortUrl, key));
    } else if (email) {
      parts.push(renderLink(`mailto:${email}`, email, key));
    } else {
      parts.push(<em key={key}>{renderInline(italic)}</em>);
    }
    end = match.index + whole.length;
  }

  parts.push(text.slice(end));
  return parts;
}

/** A reply as headings, paragraphs and lists. */
function renderReply(text) {
  // First group the lines into blocks...
  const blocks = [];
  let paragraph = null; // the paragraph still being read, if any
  let list = null; // the list still being read, if any
  let previousLineBlank = false;

  for (const line of text.split(/\r?\n/)) {
    const isBlank = line.trim() === "";
    const heading = line.match(HEADING_LINE);
    const item = line.match(LIST_ITEM_LINE);

    if (isBlank) {
      // Ends a paragraph. A list carries on if another item follows.
      paragraph = null;
    } else if (RULE_LINE.test(line)) {
      blocks.push({ type: "rule" });
      paragraph = list = null;
    } else if (heading) {
      blocks.push({ type: "heading", text: heading[1] });
      paragraph = list = null;
    } else if (item) {
      const [, indent, number, itemText] = item;
      const ordered = number !== undefined;
      if (list && indent.length >= 2) {
        // An indented item goes under the item before it.
        list.items[list.items.length - 1].children.push(itemText);
      } else {
        if (!list || list.ordered !== ordered) {
          list = { type: "list", ordered, start: Number(number) || 1, items: [] };
          blocks.push(list);
        }
        list.items.push({ text: itemText, children: [] });
      }
      paragraph = null;
    } else if (list && !previousLineBlank && /^\s/.test(line)) {
      // An indented line straight after an item is more of that item.
      list.items[list.items.length - 1].text += ` ${line.trim()}`;
    } else if (paragraph) {
      paragraph.lines.push(line.trim());
    } else {
      paragraph = { type: "paragraph", lines: [line.trim()] };
      blocks.push(paragraph);
      list = null;
    }
    previousLineBlank = isBlank;
  }

  // ...then turn the blocks into elements.
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      return (
        <h3 key={index} className="pt-1 text-[15px] font-semibold leading-snug first:pt-0 sm-tall:text-[14px]">
          {renderInline(block.text)}
        </h3>
      );
    }
    if (block.type === "rule") {
      return <hr key={index} className="border-border" />;
    }
    if (block.type === "paragraph") {
      // Single line breaks are kept, e.g. "Email: …" and "Phone: …" lines.
      return (
        <p key={index}>
          {block.lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {renderInline(line)}
            </React.Fragment>
          ))}
        </p>
      );
    }

    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag
        key={index}
        start={block.ordered && block.start !== 1 ? block.start : undefined}
        className={`space-y-1 pl-5 marker:text-primary ${
          block.ordered ? "list-decimal marker:font-semibold" : "list-disc"
        }`}
      >
        {block.items.map((listItem, itemIndex) => (
          <li key={itemIndex} className="pl-1">
            {renderInline(listItem.text)}
            {listItem.children.length > 0 && (
              <ul className="mt-1 list-[circle] space-y-1 pl-5">
                {listItem.children.map((child, childIndex) => (
                  <li key={childIndex}>{renderInline(child)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ListTag>
    );
  });
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // The conversation, in the shape /api/chat expects: { role, text }.
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  // Questions offered under the latest reply; cleared when the next one is sent.
  const [followUps, setFollowUps] = useState([]);

  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messageListRef = useRef(null);
  // Set only while the newest message is a reply.
  const latestReplyRef = useRef(null);
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

  // Keep the newest message in view. A new reply is shown from its first
  // line, so a long answer reads top to bottom instead of opening at its end.
  // Anything else (a question, the typing dots, an error) scrolls to the bottom.
  useEffect(() => {
    const list = messageListRef.current;
    if (!list) return;

    const latestReply = latestReplyRef.current;
    if (latestReply && !isSending && !error) {
      list.scrollTop = latestReply.offsetTop - 12;
    } else {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, isSending, error, isOpen]);

  async function sendConversation(conversation) {
    setIsSending(true);
    setError(null);
    setFollowUps([]);

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
      const suggested = Array.isArray(data.followUps)
        ? data.followUps.filter((question) => typeof question === "string")
        : [];
      setFollowUps(pickFollowUps(suggested, conversation));
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
            // Full screen on phones (upright or on their side); a floating
            // panel where there's room (`sm-tall`, see tailwind.config.js).
            // Above the navbar (z-50) so it isn't cut off on small screens.
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            className="fixed inset-0 z-[60] flex flex-col bg-card text-card-foreground sm-tall:inset-auto sm-tall:bottom-8 sm-tall:right-8 sm-tall:h-[min(600px,calc(100dvh_-_4rem))] sm-tall:w-[380px] sm-tall:rounded-2xl sm-tall:border sm-tall:border-border sm-tall:shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <h2 id="chatbot-title" className="text-base font-semibold leading-tight">
                    Ask about {FIRST_NAME}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    AI assistant that answers from this portfolio
                  </p>
                </div>
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

            {/* `relative` makes this the element reply positions are measured
                from when scrolling a new reply into view. */}
            <div
              ref={messageListRef}
              aria-live="polite"
              className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed sm-tall:text-[13px]"
            >
              {/* The greeting is display-only; it isn't sent to the API. */}
              <div className={REPLY_BUBBLE}>
                <p>
                  Hi! I can answer questions about {FIRST_NAME}'s skills,
                  experience, projects and education.
                </p>
              </div>

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <p
                    key={index}
                    className="ml-auto w-fit max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-primary-foreground"
                  >
                    {message.text}
                  </p>
                ) : (
                  <div
                    key={index}
                    ref={index === messages.length - 1 ? latestReplyRef : null}
                    className={REPLY_BUBBLE}
                  >
                    {renderReply(message.text)}
                  </div>
                )
              )}

              {followUps.length > 0 && (
                <div
                  role="group"
                  aria-label="Suggested follow-up questions"
                  className="flex flex-wrap gap-2"
                >
                  {followUps.map((question) => (
                    <Button
                      key={question}
                      onClick={() => ask(question)}
                      variant="outline"
                      size="sm"
                      className="h-auto whitespace-normal rounded-full px-3 py-1.5 text-left text-[13px] leading-snug sm-tall:text-[12px]"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}

              {isSending && (
                <div className={REPLY_BUBBLE}>
                  {/* Three dots that bounce in turn, and stay still with
                      reduced motion. The text is for screen readers. */}
                  <span aria-hidden="true" className="flex h-[1.625em] items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground motion-safe:animate-bounce [animation-delay:300ms]" />
                  </span>
                  <span className="sr-only">Thinking…</span>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-destructive bg-background px-4 py-3 text-foreground">
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
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <Button
                        key={question}
                        onClick={() => ask(question)}
                        variant="outline"
                        size="sm"
                        className="h-auto whitespace-normal rounded-full px-3 py-1.5 text-left text-[13px] leading-snug sm-tall:text-[12px]"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
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
                className="min-h-[44px] w-full flex-1 rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm-tall:text-[13px]"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send"
                loading={isSending}
                disabled={!input.trim()}
                className="h-11 w-11 shrink-0 rounded-xl"
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
