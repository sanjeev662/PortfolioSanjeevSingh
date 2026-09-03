/**
 * Barrel for the portfolio data layer — the single source of truth for all
 * page content. Every array below lives at module scope and is created once.
 *
 *   import { PROJECTS, FEATURED_PROJECTS, getIcon } from "../../../data";
 *
 * Rules for anyone editing pages:
 *  - Never re-declare a content array inside a component body, and never wrap
 *    one of these imports in useMemo — they are already stable references.
 *  - Never paste a title, URL, email or achievement bullet back into JSX; edit
 *    it here so both the full page and its homepage teaser stay in sync.
 *  - Icons travel as string names. Resolve them with getIcon(name).
 */

export { ICON_MAP, getIcon } from "./icons";

export {
  PROJECTS,
  PROJECT_CATEGORIES,
  FEATURED_PROJECTS,
  PROJECT_SKILL_COUNT,
} from "./projects";

export {
  CERTIFICATES,
  FEATURED_CERTIFICATES,
  getCertificates,
} from "./certificates";

export { EXPERIENCE, EDUCATION, RECENT_EXPERIENCE } from "./experience";

export { PROFILE, PERSONAL_INFO, CONTACT_INFO, getAge } from "./profile";

export {
  SOCIAL_LINKS,
  HERO_SOCIAL_LINKS,
  FOOTER_SOCIAL_LINKS,
} from "./social";

export { DOMAINS } from "./domains";

export { SKILLS, SKILL_GROUPS } from "./skills";

export { NAV_ITEMS } from "./navigation";
