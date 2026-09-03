import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { PROFILE } from "../../../data";
import {
  LIMITS,
  buildMailtoUrl,
  validateContactForm,
  validateEmailField,
  validateMessage,
  validateName,
} from "../../utils/helpers";

/**
 * The contact form. Used by both the /contacts page and the homepage teaser,
 * which until now kept two near-identical copies that had drifted apart — one
 * of them mailed to an address nobody reads.
 *
 * This is a static site with no server, so "send" means handing the message to
 * the visitor's own mail client. The UI says exactly that. It never claims the
 * message was delivered, because we have no way of knowing whether it was.
 */
function ContactForm({ className = "" }) {
  const reduced = useReducedMotion();
  // Unique per instance, so the ids stay valid even if two forms ever share a page.
  const uid = useId();

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Wired to the Button's `loading` prop. The mail-client handoff is instant so
  // this barely flickers today, but it's what a real POST would hang off.
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // Runs the right check for one field and stores (or clears) its message.
  const checkField = (field, value) => {
    let message = null;
    if (field === "name") message = validateName(value);
    else if (field === "email") message = validateEmailField(value);
    else message = validateMessage(value);

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Only correct people live once they've already left the field or tried to
    // submit. Typing the "s" of an email address should not be an error.
    if (touched[name] || submitted) checkField(name, value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    checkField(name, value);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      // Clipboard access can be refused. No harm done — the address is right
      // there as a link next to the button.
      setCopied(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, message: true });

    const found = validateContactForm(values);
    setErrors(found);

    const count = Object.keys(found).length;
    if (count > 0) {
      setStatus({ kind: "invalid", count });
      // Drop the cursor on the first thing that needs fixing, so nobody has to
      // hunt back up the form for it.
      if (found.name) nameRef.current?.focus();
      else if (found.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setStatus(null);
    setCopied(false);
    setIsSending(true);

    try {
      // If you ever get a real form endpoint (Formspree, EmailJS, your own
      // /api/contact), replace these two lines with a POST of `values`, await
      // the response, and throw when it isn't ok. Only once that exists may the
      // message below say anything was actually sent.
      //
      // Not window.open(): popup blockers throw away a window.open() to a
      // mailto: without telling anyone, which is how this form used to report
      // success while doing nothing at all.
      window.location.href = buildMailtoUrl({
        to: PROFILE.email,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus({ kind: "opening" });
    } catch (error) {
      setStatus({ kind: "failed" });
    } finally {
      setIsSending(false);
    }

    // The typed values stay put. If the mail client never opened, clearing the
    // textarea would throw away the only copy of what they wrote.
  };

  return (
    <GlassCard className={`p-4 sm:p-6 lg:p-8 ${className}`}>
      <CardHeader className="px-0 pb-4 pt-0 sm:px-0 sm:pb-6 sm:pt-0">
        <CardTitle className="flex items-center">
          <MessageSquare
            className="mr-2 h-5 w-5 text-primary lg:h-6 lg:w-6"
            aria-hidden="true"
          />
          Send Message
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0 sm:px-0 sm:pb-0">
        {/* noValidate: the browser's native bubbles pre-empt our own messages
            and aren't announced properly. */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5 lg:space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor={`${uid}-name`}
              className="flex items-center text-sm font-medium text-foreground"
            >
              <User className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
              Name
            </label>
            <input
              ref={nameRef}
              id={`${uid}-name`}
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              enterKeyHint="next"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              placeholder="Enter your full name"
              // text-base (16px) at every width on purpose: iOS Safari zooms the
              // page when you focus an input smaller than that, and never zooms back.
              className={`w-full rounded-lg border bg-background/50 px-3 py-3 text-base backdrop-blur-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 [@media(pointer:coarse)]:min-h-[44px] ${
                errors.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border hover:border-primary/50"
              }`}
            />
            {errors.name && (
              <p
                id={`${uid}-name-error`}
                role="alert"
                className="flex items-start gap-1.5 text-sm text-destructive"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor={`${uid}-email`}
              className="flex items-center text-sm font-medium text-foreground"
            >
              <Mail className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
              Email
            </label>
            <input
              ref={emailRef}
              id={`${uid}-email`}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              autoCapitalize="none"
              spellCheck="false"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              placeholder="Enter your email address"
              className={`w-full rounded-lg border bg-background/50 px-3 py-3 text-base backdrop-blur-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 [@media(pointer:coarse)]:min-h-[44px] ${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border hover:border-primary/50"
              }`}
            />
            {errors.email && (
              <p
                id={`${uid}-email-error`}
                role="alert"
                className="flex items-start gap-1.5 text-sm text-destructive"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <label
                htmlFor={`${uid}-message`}
                className="flex items-center text-sm font-medium text-foreground"
              >
                <MessageSquare
                  className="mr-2 h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                Message
              </label>
              <span
                id={`${uid}-message-count`}
                className={`text-xs tabular-nums ${
                  values.message.length > LIMITS.message.max
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                <span className="sr-only">Message length: </span>
                {values.message.length} / {LIMITS.message.max}
                <span className="sr-only"> characters</span>
              </span>
            </div>
            <textarea
              ref={messageRef}
              id={`${uid}-message`}
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              // No maxLength on purpose: silently truncating a long pasted
              // message is worse than telling them it's too long.
              aria-describedby={
                errors.message
                  ? `${uid}-message-error ${uid}-message-count`
                  : `${uid}-message-count`
              }
              placeholder="Tell me about your project, ask a question, or just say hello..."
              className={`w-full resize-y rounded-lg border bg-background/50 px-3 py-3 text-base backdrop-blur-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 ${
                errors.message
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border hover:border-primary/50"
              }`}
            />
            {errors.message && (
              <p
                id={`${uid}-message-error`}
                role="alert"
                className="flex items-start gap-1.5 text-sm text-destructive"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* What actually happened. Note that none of these say "sent". */}
          {status && (
            <motion.div
              key={status.kind}
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
              className={`flex gap-2 rounded-lg border p-3 text-sm lg:p-4 lg:text-base ${
                status.kind === "opening"
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-destructive/40 bg-destructive/10 text-destructive"
              }`}
            >
              {status.kind === "opening" ? (
                <Mail
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary lg:h-5 lg:w-5"
                  aria-hidden="true"
                />
              ) : (
                <AlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0 lg:h-5 lg:w-5"
                  aria-hidden="true"
                />
              )}

              {status.kind === "invalid" ? (
                <p role="alert">
                  {status.count}{" "}
                  {status.count === 1 ? "field needs" : "fields need"} your
                  attention before this can be sent.
                </p>
              ) : (
                <div className="min-w-0 space-y-3">
                  <p
                    role={status.kind === "opening" ? "status" : "alert"}
                    className="break-words"
                  >
                    {status.kind === "opening"
                      ? "Opening your email app… Nothing has been sent yet — your email app is what actually sends it. If nothing happened, email me directly at "
                      : "Your browser couldn't open an email app. Please email me directly at "}
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="focus-ring break-words rounded-sm font-medium underline underline-offset-2"
                    >
                      {PROFILE.email}
                    </a>
                    .
                  </p>
                  <Button
                    type="button"
                    variant="subtle"
                    size="sm"
                    onClick={handleCopyEmail}
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? "Copied" : "Copy email address"}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Sits outside the box above so announcing the copy doesn't make a
              screen reader re-read the whole message. */}
          <span role="status" className="sr-only">
            {copied ? "Email address copied to clipboard." : ""}
          </span>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="group w-full"
            loading={isSending}
          >
            <Send
              className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 lg:h-5 lg:w-5"
              aria-hidden="true"
            />
            Send Message
          </Button>
        </form>
      </CardContent>
    </GlassCard>
  );
}

export default React.memo(ContactForm);
