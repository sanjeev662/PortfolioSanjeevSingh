# AGENTS.md

Rules for AI coding agents (and people) working on Sanjeev Kumar Singh's
portfolio site. Read it before changing anything. It covers:

1. [The stack](#the-stack) and [where things live](#where-things-live)
2. [Development rules](#development-rules): the conventions this project follows
3. [The AI chat assistant](#the-ai-chat-assistant): its rules, some of which
   break the live chat without failing a test or the build
4. [Open items](#open-items)

## The stack

| Area | What we use |
|---|---|
| UI | React 18.3 (function components and hooks), plain JSX (no TypeScript) |
| Build and dev server | Create React App (`react-scripts` 5, webpack) |
| Routing | React Router 6. Every page is lazy-loaded (`React.lazy`) behind a `Suspense` and an error boundary that resets when the route changes |
| Styling | Tailwind CSS **3.4** (`tailwind.config.js`), with the `typography` and `forms` plugins. Six colour themes are CSS variables in `src/index.css` |
| Class helpers | `cn()` in `src/lib/utils.js` (`clsx` and `tailwind-merge`); `class-variance-authority` for the `Button` variants; `@radix-ui/react-slot` for `asChild` |
| Animation | Framer Motion, plus `react-type-animation` for the typed "Hi, I'm …" greeting on Home (static when reduced motion is on) |
| Icons | `lucide-react` |
| Page titles and meta | `react-helmet-async` (`HelmetProvider` in `App.js`; `<Helmet>` on Home, About and Projects) |
| Themes | `ThemeContext` (`src/contexts/ThemeContext.js`) puts the theme's class on `<html>` and saves it under the `portfolio-theme` key. Default: `dark` |
| AI chat | A Vercel serverless function, `api/chat.js`, calling Google Gemini with plain `fetch` (no SDK). See [the AI chat assistant](#the-ai-chat-assistant) |
| Tests | Jest (through `react-scripts`), React Testing Library and `jest-dom` |
| Hosting | Vercel. `vercel.json` has the SPA rewrite (not for `/api/`) and cache headers |
| Other | `web-vitals`. No Node version is pinned; local checks used Node 22 |

**Tailwind version trap:** Create React App ignores `postcss.config.js` and
runs its own Tailwind, which is v3.4. The `@tailwindcss/postcss` (v4) entry in
`package.json` isn't used, and isn't even installed. Write Tailwind v3 syntax
and config only.

## Where things live

```
api/chat.js                  Chat server function (Vercel)
docs/ai-chatbot-design.md    Chat design, API contract, test plan
public/                      index.html, favicon.ico, icons, og-image.png, manifest, sitemap.xml, robots.txt
src/App.js                   Providers, routes, Navbar, Footer, ScrollToTop, Chatbot
src/index.css                Theme variables and shared classes (focus-ring, tap-target, skip-link…)
src/data/                    ALL site content, plus the icon and image registries
src/contexts/ThemeContext.js Themes
src/lib/utils.js             cn(), useReducedMotion, useIntersectionObserver, makeReveal/makeStagger…
src/Components/
  Maincontaint/              Full pages: Home, About, Domain, Projects, Certificates, Contacts
  HomeComponents/            Homepage teasers for each section
  Navbar/, Footer/, Chatbot/
  ui/                        Shared pieces: Button, GlassCard, LazyImage, SectionHeading, Skeleton, ScrollToTop…
  utils/helpers.js           Contact form checks and the mailto: builder
  Assets/                    Images (.webp)
```

Routes: `/`, `/about`, `/domain`, `/projects`, `/certificates`, `/contacts`,
and a 404 page for anything else.

`.agents/` and `skills-lock.json` are local agent tooling and are git-ignored.

## Development rules

### Workflow

- **Branches:** `main` is production (https://portfolio-sanjeev-singh.vercel.app).
  `stage` deploys to https://stage.portfolio.saarvana.online/. Work on a
  branch, open a pull request into `stage`, and move `stage` into `main` with
  another pull request.
- **Don't push** unless the user asks for it in the current conversation.
  Commit locally and say what's ready.
- **Commit messages** explain what changed, why, and how it was checked.
- **Before calling a change done,** run:
  ```sh
  CI=true npx react-scripts test --watchAll=false   # all tests
  CI=true npm run build                              # warnings fail Vercel builds
  ```
  Then check it in a real browser, at phone and desktop widths and in both a
  light and a dark theme. Tests alone aren't enough.
- **Match the case of file names in imports exactly** (`Components`, not
  `components`). macOS doesn't care, but Vercel builds on Linux, which does.

### Code style

- **Plain, readable JSX** that reads top to bottom, with short comments that
  explain *why*. Don't split a page into many small components, add generic
  `variant`-prop components, or add config-driven rendering just for tidiness.
  Some repeated JSX is fine.
- **Reuse what exists** before writing something new: `Button` and its
  variants, `GlassCard`, `LazyImage` (for every content image; it falls back
  to a labelled panel if the image fails), `SectionHeading`, `cn()`, and the
  motion helpers in `src/lib/utils.js`.

### Content and data

- **All content lives in `src/data/*.js`:** profile, experience, education,
  skills, projects, certificates, domains, social links and navigation. Never
  put a title, URL, email or achievement in JSX. The full pages and their
  homepage teasers read the same data, so they can't drift apart.
- **Content follows Sanjeev's CV.** There are three role-tailored versions
  (Java-, Node- and JavaScript-leaning); their skills are identical.
- **Icons are stored as string names** and resolved with `getIcon()`.
  **Images are stored as string keys** and resolved with `getImage()`.
  Data files must never import files (see the chat rules below for why).
- **Keep the hero line** "… specializing in Java & JavaScript". A stronger
  repositioning was tried and deliberately reverted.

### Colours and themes

- **Six themes:** light, dark, midnight, obsidian (dark ones) and dawn, arctic
  (light ones). Each is a set of HSL variables in `src/index.css`: `--primary`,
  `--muted`, `--border`, `--success`, `--warning`, `--primary-hover` and so on.
- **Use theme tokens only** (`bg-card`, `text-foreground`, `text-primary`,
  `border-border`…). Never Tailwind palette colours like `blue-500` or
  `green-500`: they ignore the theme and failed contrast.
- **Never use `dark:` variants.** They only fire on the `dark` theme, not on
  midnight or obsidian.
- **Text on a coloured fill uses the solid token,** e.g. `bg-primary` with
  `text-primary-foreground`. A see-through fill like `bg-primary/75` let the
  page show through and dropped text to about 3.2:1. Faint status tints
  (`bg-warning/10` behind `text-foreground`) are fine, but measure any new one.
- **Text contrast must be at least 4.5:1 in all six themes.** Check it in the
  browser whenever colours change.

### Accessibility and motion

- **Focus:** use the `focus-ring` class for a visible keyboard focus ring. The
  skip link in the Navbar jumps to `#main-content`.
- **Touch:** targets are at least 44px on touch screens (`tap-target`, and the
  `Button` does it for coarse pointers).
- **Motion:** respect reduced motion with `useReducedMotion()`, and pass it to
  `makeReveal()` / `makeStagger()`.
- **Long text:** the body has `overflow-wrap: anywhere`, so long emails and URLs
  wrap instead of widening the page. Nothing may make a page scroll sideways at
  any width.

### Things not to change

- **Favicon:** keep `public/favicon.ico` exactly as it is on `main`, with a
  single `<link rel="icon">` in `public/index.html`. Extra PNG icon links
  override it.
- **Don't register `@tailwindcss/aspect-ratio`.** It replaced Tailwind's
  native `aspect-video` / `aspect-[3/2]` with no-ops and collapsed image boxes
  to 0px.
- **The contact form stays mailto: only** until a real sending service exists.
  It must never claim a message was sent (see the comment in `Form.jsx`).

### Tests

- **Jest runs through `react-scripts`,** with React Testing Library.
  `src/App.test.js` is a smoke test; the chat has its own tests.
- **Use `fireEvent`,** not `@testing-library/user-event`. user-event ships its
  own copy of `@testing-library/dom`, so its events cause `act()` warnings.

## The AI chat assistant

The "Ask about Sanjeev" chat. Its code is spread across several files, and
some of it breaks without any failing test or build. The full design is in
[docs/ai-chatbot-design.md](docs/ai-chatbot-design.md).

### How the chat works

| Part | File |
|---|---|
| Server function (holds the Gemini key, builds the prompt, calls Gemini) | `api/chat.js` |
| Chat UI: launcher, panel, reply formatting | `src/Components/Chatbot/Chatbot.jsx` |
| Tests | `src/Components/Chatbot/Chatbot.test.jsx` |
| Mounted once, outside the routes | `src/App.js` |
| What the bot knows | `src/data/*.js`, imported by `api/chat.js` |
| Image keys → URLs | `src/data/images.js` (`getImage`) |
| Floating-panel breakpoint `sm-tall` | `tailwind.config.js` |
| SPA rewrite that skips `/api/*` | `vercel.json` |

The browser only calls our own `POST /api/chat`. That function adds the
portfolio data as the system instruction and calls Google Gemini
(`generateContent`, model `gemini-3.5-flash-lite`, which the `GEMINI_MODEL`
environment variable can override). The chat keeps no memory: every request
sends the recent conversation.

### Rules that keep the chat working

#### The data files must load in plain Node

`api/chat.js` imports `profile.js`, `experience.js`, `skills.js`,
`projects.js`, `certificates.js`, `domains.js` and `social.js` from
`src/data`. On Vercel it runs in plain Node, which can't load images, CSS or
JSX.

- **Never import an asset (`.webp`, `.png`, `.svg`, `.css`), React, JSX or
  icon packages into those files.** Store images as string keys, like
  `image: "Projects/to-let-mern-app"`, and resolve them in components with
  `getImage()`. Store icons as string names and resolve them with `getIcon()`.
- **To add an image,** import it in `src/data/images.js` and add its key to
  `IMAGE_MAP`. A key that's missing returns `undefined` with no warning, so the
  image just doesn't show.
- **In `api/chat.js`, import the data files one by one,** never the
  `src/data/index.js` barrel. The barrel pulls in the image and icon registries.
- **Breaking this fails silently.** Tests and the site build still pass, because
  neither runs `api/chat.js` in Node. The live chat then returns an error for
  every message. After touching any data file, run:
  ```sh
  node --input-type=module -e "await import('./api/chat.js'); console.log('ok')"
  ```
  It must print `ok`. A warning about the module type is expected and harmless.
- **Card components take different props.** `ProjectCard` takes the image
  *key* and resolves it itself. `CertificateCard` takes a resolved *URL*, so
  its callers must call `getImage()` first.

#### Secrets and the endpoint

- **Keep `GEMINI_API_KEY` only in Vercel's environment variables**
  (Development, Preview and Production). **Never** give it a `REACT_APP_`
  prefix: Create React App copies those variables into the public JavaScript.
- **The key goes in the `x-goog-api-key` header,** never in the URL. Never log
  what visitors write.
- **Keep the rewrite in `vercel.json` excluding `/api/`.** Otherwise
  `/api/chat` serves `index.html`.
- **Request shape:** `POST /api/chat` with
  `{ "messages": [{ "role": "user" | "model", "text": "..." }] }`. It returns
  `{ "reply" }` or `{ "error" }`, and the last message must be from `user`.
- **Keep these limits** unless you're deliberately changing them:
  - 500 characters per visitor message. `MAX_MESSAGE_LENGTH` must match in
    `api/chat.js` and `Chatbot.jsx`.
  - the last 10 messages of history
  - 5,000 characters per earlier reply
  - `maxOutputTokens` 1024 (Gemini 3 counts its thinking against this)
  - a 9-second timeout
  - 20 messages per 10 minutes per IP address. This count lives in memory, so
    it's best effort only.

#### The prompt and the reply formatting must match

- **Answers come only from `src/data`.** Don't add outside facts. Keep the
  skill-bar percentages in `skills.js` out of the prompt: they're illustrative,
  not from the CV, and the bot would quote them as facts. Keep age out too.
- **The prompt in `api/chat.js` asks for a small Markdown subset:** paragraphs,
  `- ` bullets that start with a **bold** name, `###` headings only for answers
  with several parts, `[label](url)` links, no bare URLs, and no tables, code
  blocks, HTML or emoji.
- **`Chatbot.jsx` renders exactly that subset** plus `*italic*`, `` `code` ``,
  numbered lists, one level of nested bullets, and bare URLs and emails as
  links. **If you change one side, change the other.** Markdown the renderer
  doesn't understand shows up as raw symbols.
- **Replies must never render as HTML.** No `dangerouslySetInnerHTML` and no
  Markdown library that outputs HTML. Links may only go to `http(s)` and
  `mailto:` addresses. The test "never renders HTML or javascript: links from a
  reply" guards this; keep it passing.

#### Look and layout

- **Reply bubbles are `bg-background` with `border-border`,** not `bg-muted`.
  Links and list markers use `text-primary`, which is only 4.0:1 on `muted` in
  the dark theme, but at least 4.9:1 on `background` in every theme.
- **Keep it compact.** The site owner wants small sizing: 13px message text in
  the floating panel and 14px in the full-screen view. Don't make text or the
  panel bigger without asking.
- **On phones the input stays at 16px** (`text-base`). iPhones zoom the page
  in when an input smaller than 16px gets focus.
- **The floating panel (380 × 600) appears only at `sm-tall`:** at least 640px
  wide *and* 500px tall. Anything smaller, including a phone on its side, gets
  a full-screen chat. The launcher button uses `sm` so it stays lined up with
  `ScrollToTop`, which sits just above it.
- **`sm-tall` is a "raw" screen,** which switches off Tailwind's `min-*` and
  `max-*` variants (`max-sm:`, `min-[600px]:` and so on). Nothing uses them
  today. If you need them, replace `sm-tall` rather than dropping this rule.

#### Behaviour that has regression tests

Don't undo these; each one fixed a real bug:

- The launcher stays mounted (just hidden) while the chat is open. Unmounting it
  with an exit animation lost it for good if the chat closed within 0.2s.
- Escape closes the chat wherever focus is, and focus returns to the launcher.
- After clicking a suggested question, focus stays in the input.
- A new reply scrolls into view from its first line, not its last.

#### Testing the chat

- **`npm start` doesn't run `api/`.** To test the real function locally, use
  `vercel dev`. To check only the UI, serve `build/` with a small local server
  that answers `/api/chat` with sample Markdown replies.
- **Browser-check these sizes:** a phone at 320–414px, a phone on its side
  (e.g. 740×360), a tablet and a desktop, plus all six themes. The chat must
  never scroll the page sideways.
- **One IP can send only 20 messages per 10 minutes,** so long test runs
  against the real function will hit that limit.
- **Playwright MCP saves screenshots into `.playwright-mcp/`** in this repo,
  which isn't git-ignored. Don't commit that folder.

### Chat change history

| Commit | Change |
|---|---|
| `9e9dca2` | Data images became string keys resolved by `getImage()`, so the data files load in Node |
| `f84c2f5` | Added the `/api/chat` function |
| `3d78d44` | Added the floating chat UI |
| `83f5722` | Added the design doc and README setup |
| `7138b71` | Replies formatted as Markdown (prompt and renderer); bordered reply bubble |
| `25720db` | Made the chat compact again: 14px text, 380 × 600 panel |
| `59a5e59` | 13px text in the floating panel |
| `cd25f34` | Phones on their side get the full-screen chat (`sm-tall`) |

Add a row when you make a chat change that matters.

## Open items

Nobody has decided on these yet. Don't start them without asking.

### Site

- **Invented numbers:** the skill-bar percentages in `src/data/skills.js`
  (88/84/85/86) aren't from the CV.
- **Duplicated code:** the copy-to-clipboard handler is repeated in
  `Contacts.jsx`, `About.jsx` and `HomeAbout.jsx`.
- **Contact form:** it only opens the visitor's mail app (mailto:). Real sending
  needs a service such as Formspree or EmailJS.
- **Security alerts and build tool:** about 116 Dependabot alerts on `main` come
  from `react-scripts`. The fix is a move from Create React App to Vite.

### Chat

- **Not verified yet:** whether real Gemini follows the formatting rules. Check
  on stage with "Show me his best projects". You should see bold project names
  and "Live demo · Source code" links.
- **Hardening not done yet:**
  - a shared or daily rate limit (for example Upstash Redis)
  - request size caps
  - restricting the Google key (billing off, Gemini API only)
- **Rules that aren't enforced yet:**
  - a lint rule that blocks asset imports in `src/data/*.js`
  - a test that every image key in the data exists in `IMAGE_MAP`
  - making `CertificateCard` resolve keys itself, like `ProjectCard`
