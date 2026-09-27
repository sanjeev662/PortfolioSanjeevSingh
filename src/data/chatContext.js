/**
 * Extra context for the AI chat: anything the assistant should know about
 * Sanjeev that the rest of src/data doesn't already say. api/chat.js adds
 * this text to the portfolio data it sends to Gemini with every question, and
 * the chat treats it as fact, like everything else here. The site itself
 * doesn't show it.
 *
 * To add something, write plain sentences or "- " bullet points between the
 * two backticks below, e.g. (placeholders, not real facts):
 *
 *   - Open to full-time SDE roles from <month year>.
 *   - Notice period: <n> days.
 *   - Prefers backend work in Java and Spring Boot.
 *
 * Rules:
 * - Only true facts. The chat repeats them to visitors as facts.
 * - Only things you're happy for anyone to read: any visitor can get them by
 *   asking.
 * - Keep it short. All of it goes to Gemini with every question, so each line
 *   adds a little to the cost and time of every reply.
 * - Don't type a backtick (`) or "${" inside the text; they break it.
 * - Keep this file plain: api/chat.js loads it in Node, so never import
 *   anything here.
 * - Changes reach the chat on the next deploy.
 */

export const CHAT_CONTEXT = `
`;
