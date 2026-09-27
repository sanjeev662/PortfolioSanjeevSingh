# AGENTS.md

Instructions for AI coding tools working on this repo: Sanjeev Kumar Singh's portfolio site (React, Create React App, Tailwind, Vercel), with an AI chat ("Ask about Sanjeev") backed by Google Gemini.

## Commands

```sh
npm install
npm start                                         # dev server on http://localhost:3000 (no /api, so the chat shows a connection error)
vercel dev                                        # site + /api/chat; needs the Vercel CLI, `vercel link`, and GEMINI_API_KEY in Vercel's Development env
CI=true npx react-scripts test --watchAll=false   # run all tests once
CI=true npm run build                             # production build; warnings fail it, as on Vercel
node --input-type=module -e "await import('./api/chat.js'); console.log('ok')"   # after editing src/data: must print ok
```

## Stack

- React 18.3, plain JSX (no TypeScript), function components and hooks.
- Create React App (`react-scripts` 5). It ignores `postcss.config.js` and runs its own Tailwind 3.4, so write Tailwind v3 syntax only. The `@tailwindcss/postcss` (v4) entry in `package.json` is unused.
- Tailwind CSS 3.4 with the `typography` and `forms` plugins. Six colour themes are CSS variables in `src/index.css`.
- React Router 6. Every page is `React.lazy` inside a keyed `Suspense` and an error boundary (`src/App.js`).
- Framer Motion; `react-type-animation` for the typed greeting on Home.
- `lucide-react` icons; `react-helmet-async` for page titles and meta tags.
- `cn()` (`clsx` + `tailwind-merge`), `class-variance-authority` for `Button` variants, `@radix-ui/react-slot`.
- Jest, React Testing Library and `jest-dom`, run through `react-scripts`.
- Vercel hosting. `api/chat.js` is a Vercel serverless function that calls Gemini with plain `fetch` (no SDK). Model `gemini-3.5-flash-lite`; `GEMINI_MODEL` overrides it.
- Node 22 locally; no version is pinned.

## Project structure

```
api/chat.js                      Chat server function
docs/ai-chatbot-design.md        Chat design, API contract, test plan
public/                          index.html, favicon.ico, icons, og-image.png, manifest, sitemap.xml, robots.txt
src/App.js                       Providers, routes, Navbar, Footer, ScrollToTop, Chatbot
src/index.css                    Theme variables; shared classes (focus-ring, tap-target, skip-link…)
src/data/                        All site content, plus the icon (icons.js) and image (images.js) registries
src/data/chatContext.js          Extra facts for the AI chat only (CHAT_CONTEXT); the site doesn't show them
src/contexts/ThemeContext.js     Theme class on <html>, saved as `portfolio-theme`, default `dark`
src/lib/utils.js                 cn(), useReducedMotion, useIntersectionObserver, makeReveal, makeStagger
src/Components/Maincontaint/     Full pages: Home, About, Domain, Projects, Certificates, Contacts
src/Components/HomeComponents/   Homepage teasers for each section
src/Components/Chatbot/          Chat UI and its tests
src/Components/ui/               Button, GlassCard, LazyImage, SectionHeading, Skeleton, ScrollToTop…
src/Components/utils/helpers.js  Contact form checks and the mailto: builder
src/Components/Assets/           Images (.webp)
```

Routes: `/`, `/about`, `/domain`, `/projects`, `/certificates`, `/contacts`, and a 404 page.

## Code style

- Write plain JSX that reads top to bottom, with short comments that explain *why*.
- Don't split pages into many small components, or add generic `variant`-prop components or config-driven rendering just for tidiness. Some repeated JSX is fine.
- Reuse what exists: `Button` and its variants, `GlassCard`, `LazyImage` (for every content image), `SectionHeading`, `cn()`, and the motion helpers in `src/lib/utils.js`.
- Match file-name case exactly in imports (`Components`, not `components`). Vercel builds on Linux, which is case-sensitive.

## Content and data

- All content lives in `src/data/*.js`. Never hard-code a title, URL, email or achievement in JSX. Full pages and their homepage teasers read the same data.
- Content comes from Sanjeev's CV, which isn't in the repo. Don't invent facts; ask for them.
- Icons are string names, resolved with `getIcon()`.
- Images are string keys like `"Projects/to-let-mern-app"`, resolved with `getImage()`. To add an image, import it in `src/data/images.js` and add it to `IMAGE_MAP`. A missing key returns `undefined` with no warning.
- Keep the hero line "… specializing in Java & JavaScript". A stronger version was deliberately reverted.
- Facts the chat should know but the site doesn't show (availability, notice period, preferences, FAQ answers) go in `src/data/chatContext.js`, as plain sentences or `- ` bullets inside the `CHAT_CONTEXT` template string. It starts empty. The rules:
  - true, public facts only: the chat states them as fact to any visitor
  - keep it short: it's sent with every question
  - no backticks or `${` inside the text
  - never add an import to that file

## Styling and themes

- There are six themes. Light ones: light, dawn, arctic. Dark ones: dark, midnight, obsidian. Their colours are HSL variables in `src/index.css`.
- Use theme tokens only (`bg-card`, `text-foreground`, `text-primary`, `border-border`, `text-success`, `text-warning`…). Never use Tailwind palette colours like `blue-500`; they ignore the theme.
- Never use `dark:` variants. They only fire on the `dark` theme.
- Text on a coloured fill uses the solid token, e.g. `bg-primary` with `text-primary-foreground`. See-through fills like `bg-primary/75` dropped text contrast to about 3.2:1. Faint tints (`bg-warning/10`) are OK only behind `text-foreground`.
- Text contrast must be at least 4.5:1 in all six themes. Measure it in the browser when colours change.
- No page may scroll sideways at any width. The body already has `overflow-wrap: anywhere`.

## Accessibility

- Show keyboard focus with the `focus-ring` class. The Navbar's skip link targets `#main-content`.
- Touch targets are at least 44px (`tap-target`; `Button` handles coarse pointers itself).
- Respect reduced motion: use `useReducedMotion()` and pass it to `makeReveal()` / `makeStagger()`.

## AI chat

The browser calls `POST /api/chat` (`api/chat.js`), which builds Gemini's system instruction from `src/data` and calls Gemini `generateContent`. The UI is `src/Components/Chatbot/Chatbot.jsx`, mounted once in `App.js` outside the routes. Full details: `docs/ai-chatbot-design.md`.

### Keep the function loading (it breaks silently)

`api/chat.js` imports `profile`, `experience`, `skills`, `projects`, `certificates`, `domains`, `social` and `chatContext` from `src/data`, and runs in plain Node on Vercel. The site build never loads it, and its Jest tests (which stub asset imports) can't catch this, so a mistake only shows up as every chat message failing in production.

- Never import assets (`.webp`, `.png`, `.svg`, `.css`), React, JSX or icon packages in those data files.
- In `api/chat.js`, import data files one by one, never the `src/data/index.js` barrel.
- After editing any data file, run the Node import check from [Commands](#commands).
- `ProjectCard` takes an image key and resolves it itself. `CertificateCard` takes a resolved URL, so its callers must call `getImage()`.

### Secrets and API contract

- `GEMINI_API_KEY` lives only in Vercel's environment variables (Development, Preview, Production). Never prefix it with `REACT_APP_`: Create React App puts those in the public JavaScript.
- Send the key in the `x-goog-api-key` header, never in the URL. Never log visitor messages.
- The SPA rewrite in `vercel.json` must keep excluding `/api/`.
- Request: `{ "messages": [{ "role": "user" | "model", "text": "..." }] }`, with the last message from `user`. Response: `{ "reply", "followUps" }` or `{ "error" }`.
- Limits:
  - 500 characters per visitor message (`MAX_MESSAGE_LENGTH`, the same in `api/chat.js` and `Chatbot.jsx`)
  - the last 10 messages of history
  - 5,000 characters per earlier reply
  - `maxOutputTokens` 1024 (Gemini 3's thinking counts against it)
  - each Gemini attempt times out after 6 s. An attempt that stalls, or gets a Google 5xx, is retried, up to 3 attempts (18 s at worst). `maxDuration` 25 in `vercel.json` makes room for that: keep the two in step. Gemini stalls on roughly 1 request in 4 while healthy replies take 1–2 s, so don't remove the retry. Don't retry 4xx errors (bad request, quota).
  - 20 messages per 10 minutes per IP (kept in memory, so best effort only)

### Prompt and reply formatting

- Answers come only from `src/data`, including `chatContext.js`, which is added under "## More about Sanjeev" when it isn't empty. Keep the skill-bar percentages in `skills.js` (not from the CV) and Sanjeev's age out of the prompt.
- The prompt asks for a Markdown subset: paragraphs, `- ` bullets starting with a **bold** name, `###` headings only for multi-part answers, and `[label](url)` links. No bare URLs, tables, code blocks, HTML or emoji.
- `Chatbot.jsx` renders that subset plus `*italic*`, `` `code` ``, numbered lists, one level of nested bullets, and bare URLs and emails as links. Change the prompt and the renderer together; anything unsupported shows as raw symbols.

### Follow-up questions

- The prompt tells Gemini to end every reply with a `FOLLOW_UPS:` line and 2–3 `- ` questions. `splitFollowUps()` in `api/chat.js` cuts that section off (`FOLLOW_UPS_LINE` also accepts `**FOLLOW_UPS:**` and `Follow-ups:`). It returns the rest as `reply`, plus up to 3 questions that end in `?` and are at most 100 characters, as `followUps`. Change the prompt and `FOLLOW_UPS_LINE` together.
- A missing section must never lose the answer: the whole text becomes `reply`, with `followUps: []`.
- `Chatbot.jsx` shows the questions as buttons under the latest reply only (`pickFollowUps()`). It drops any the visitor already asked, and when fewer than 2 are left it tops up from `FALLBACK_FOLLOW_UPS`, so there are always 2–3.
- Suggestions must steer toward Sanjeev's strengths (experience, projects, skills, achievements) and be answerable from `src/data`. Never suggest questions about weaknesses, gaps or missing information. Every entry in `FALLBACK_FOLLOW_UPS` must meet the same bar.
- Never render replies as HTML: no `dangerouslySetInnerHTML`, and no Markdown library that outputs HTML. Links go only to `http(s)` and `mailto:` addresses. A test guards this.

### Chat UI

- Reply bubbles are `bg-background` with `border-border`, not `bg-muted`. The `text-primary` links and list markers are only 4.0:1 on `muted` in the dark theme, but at least 4.9:1 on `background` in every theme.
- Keep it compact: 13px text in the floating panel, 14px in the full-screen chat. Don't make text or the panel bigger without asking.
- The header has a "New chat" button (`SquarePen` icon) next to Close. It's always rendered so the header never changes height, and disabled while the chat is empty or a reply is loading (a late reply would bring the old conversation back). It clears the messages, follow-ups and error, and moves focus to the input.
- The header subtitle ("AI answers from this portfolio") is kept short so it fits on one line beside both buttons, down to 375px wide.
- On phones the input stays at 16px (`text-base`). iPhones zoom the page in on smaller inputs.
- The floating 380 × 600 panel appears only at `sm-tall` (at least 640px wide **and** 500px tall; defined in `tailwind.config.js`). Anything smaller, including a phone on its side, gets the full-screen chat. The launcher uses `sm` so it stays lined up with `ScrollToTop`.
- `sm-tall` is a "raw" screen, which switches off Tailwind's `min-*` and `max-*` variants. Don't use them; if you need them, replace `sm-tall` first.
- Keep these behaviours; each has a regression test:
  - The launcher stays mounted (just hidden) while the chat is open.
  - Escape closes the chat from anywhere, and focus returns to the launcher.
  - Focus stays in the input after a suggested question is clicked.
  - A new reply scrolls into view from its first line.
  - Follow-up questions disappear when the next question is sent, skip questions already asked, and top up from the fallback list.
  - "New chat" is disabled when there's nothing to clear or a reply is loading; it clears the conversation, and the next question is sent with no history.

## Testing and verification

- Before calling a change done, run the tests and `CI=true npm run build`. Then check it in a real browser at phone (320–414px), phone-on-its-side (about 740×360), tablet and desktop sizes, in a light and a dark theme (all six when colours change).
- Use `fireEvent`, not `@testing-library/user-event`. user-event ships its own copy of `@testing-library/dom`, which causes `act()` warnings.
- `api/chat.js` is tested in `src/Components/Chatbot/chat-api.test.js`, because Create React App only runs tests under `src/`. It uses `@jest-environment node` with a fake `fetch` for Gemini. Keep the browser-only stubs in `src/setupTests.js` behind its `isBrowser` check, or Node-environment tests fail.
- To check the chat UI without a key, serve `build/` with a small local server that answers `/api/chat` with sample Markdown replies. Real replies need `vercel dev`, and one IP can send only 20 messages per 10 minutes.
- Playwright MCP saves screenshots to `.playwright-mcp/`, which isn't git-ignored. Don't commit that folder.

## Git

- `main` is production (portfolio-sanjeev-singh.vercel.app). `stage` is staging (stage.portfolio.saarvana.online). Work on a branch, open a pull request into `stage`, then another from `stage` into `main`.
- Never push unless the user asks in the current conversation. Commit locally and report what's ready.
- Commit messages say what changed, why, and how it was checked.

## Don't change without asking

- **Favicon:** `public/favicon.ico` must match `main`, with a single `<link rel="icon">` in `public/index.html`. Extra PNG icon links override it.
- **Aspect-ratio plugin:** don't register `@tailwindcss/aspect-ratio`. It turns the native `aspect-video` and `aspect-[3/2]` classes into no-ops.
- **Contact form:** it only opens the visitor's mail app (mailto:), and must never claim a message was sent (see `Form.jsx`).
- **Don't start these unless asked:**
  - moving from Create React App to Vite
  - a contact-form sending service
  - changing the skill-bar percentages
  - merging the duplicated copy-to-clipboard handlers
  - chat hardening (a shared rate limit, request size caps)
