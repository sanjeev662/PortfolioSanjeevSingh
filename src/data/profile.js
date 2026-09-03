/**
 * Single source of truth for identity / bio / personal-info copy.
 *
 * Consumed by the About page, the homepage About teaser, the hero, the footer
 * and the contact page. Do NOT paste the name, email, resume link or bio back
 * into a component — import from here so there is exactly one place to edit.
 *
 * Icons are STRING names, not imported components, so this module stays free of
 * React and lucide-react. Resolve them with `getIcon()` from ./icons.
 *
 * Two deliberate corrections vs. the old hardcoded copy:
 *  - "Age: 23" was a frozen literal that silently rots. It is now derived from
 *    `birthYear` via getAge().
 *  - There is no known phone number, so no phone row exists. Do not re-add a
 *    placeholder like "+91 XXXXX XXXXX".
 */

/**
 * Derived from three snapshots of the old hardcoded "Age" literal:
 * 21 on 2023-08-19, 21 on 2024-01-10, 23 on 2025-08-04. The only birth year
 * consistent with all three is 2002 (birthday falls between February and early
 * August), which also matches a November 2020 B.Tech start at age 18.
 */
const BIRTH_YEAR = 2002;

/** Current age in whole years. Correct for the bulk of the calendar year. */
export function getAge() {
  return new Date().getFullYear() - BIRTH_YEAR;
}

export const PROFILE = {
  name: "Sanjeev Kumar Singh",
  shortName: "Sanjeev Singh",
  role: "Software Development Engineer (SDE)",
  tagline:
    "Passionate Full Stack Developer with expertise in modern web technologies and a strong foundation in problem-solving",
  bio: "Hi! My name is Sanjeev Singh. I'm a passionate Full Stack Developer with expertise in JavaScript, Java, React.js, Node.js, and Spring Boot. I have a strong foundation in Data Structures and Algorithms, and I'm continuously learning and enthusiastic about Open Source development. I enjoy working on end-to-end products and collaborating with teams to build innovative solutions.",
  /** The split heading above the bio — the second half renders as gradient text. */
  intro: {
    lead: "I'm Sanjeev Singh and",
    highlight: "Potential Learner (^_^)",
  },
  email: "sanjeevsinghkaushik662@gmail.com",
  location: "New Delhi, India",
  degree: "B-Tech Information Technology",
  graduationYear: "2024",
  birthYear: BIRTH_YEAR,
  resumeUrl:
    "https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view",
  siteUrl: "https://portfolio-sanjeev-singh.vercel.app/",
};

/** The icon/label/value rows in the About page's "Personal Information" grid. */
export const PERSONAL_INFO = [
  {
    id: "degree",
    icon: "GraduationCap",
    label: "Degree",
    value: PROFILE.degree,
  },
  {
    id: "graduation-year",
    icon: "Calendar",
    label: "Graduation Year",
    value: PROFILE.graduationYear,
  },
  { id: "age", icon: "User", label: "Age", value: String(getAge()) },
  { id: "city", icon: "MapPin", label: "City", value: PROFILE.location },
  { id: "email", icon: "Mail", label: "E-mail", value: PROFILE.email },
  {
    id: "current-role",
    icon: "Briefcase",
    label: "Current Role",
    value: PROFILE.role,
  },
];

/**
 * The "Get In Touch" rows on the contact page.
 * The phone row is intentionally gone — the number was a placeholder.
 */
export const CONTACT_INFO = [
  {
    id: "email",
    icon: "Mail",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    id: "location",
    icon: "MapPin",
    label: "Location",
    value: PROFILE.location,
    href: null,
  },
];
