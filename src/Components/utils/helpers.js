/**
 * Shared form validation + formatting helpers.
 *
 * Each validator returns `null` when the value is acceptable, or a human-readable
 * error string when it is not — so callers can do `const err = validateEmail(v)`
 * and treat a truthy result as the message to display.
 *
 * The legacy boolean-returning `validateEmail` / `validateText` are kept as
 * `isValidEmail` / `isNonEmpty` for anything that only needs a yes/no answer.
 */

// Deliberately pragmatic rather than RFC-5322-complete: catches real typos
// (missing @, missing TLD, trailing dot) without rejecting valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
};

export function isValidEmail(email) {
  return EMAIL_RE.test(String(email ?? "").trim().toLowerCase());
}

export function isNonEmpty(text) {
  return String(text ?? "").trim().length > 0;
}

export function validateName(value) {
  const v = String(value ?? "").trim();
  if (!v) return "Please enter your name.";
  if (v.length < LIMITS.name.min) return "That name looks too short.";
  if (v.length > LIMITS.name.max) return `Please keep it under ${LIMITS.name.max} characters.`;
  return null;
}

export function validateEmailField(value) {
  const v = String(value ?? "").trim();
  if (!v) return "Please enter your email address.";
  if (v.length > LIMITS.email.max) return "That email address is too long.";
  if (!isValidEmail(v)) return "Please enter a valid email address.";
  return null;
}

export function validateMessage(value) {
  const v = String(value ?? "").trim();
  if (!v) return "Please enter a message.";
  if (v.length < LIMITS.message.min)
    return `Please write at least ${LIMITS.message.min} characters.`;
  if (v.length > LIMITS.message.max)
    return `Please keep it under ${LIMITS.message.max} characters.`;
  return null;
}

/** Validates the whole contact form at once. Returns an object of field -> error. */
export function validateContactForm({ name, email, message }) {
  const errors = {};
  const nameError = validateName(name);
  const emailError = validateEmailField(email);
  const messageError = validateMessage(message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  return errors;
}

/** Builds a mailto: URL with properly percent-encoded subject and body. */
export function buildMailtoUrl({ to, name, email, message }) {
  const subject = `Portfolio enquiry from ${name}`;
  const body = `${message}\n\n—\nName: ${name}\nEmail: ${email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Backwards-compatible aliases for the original API.
export const validateEmail = isValidEmail;
export const validateText = isNonEmpty;
