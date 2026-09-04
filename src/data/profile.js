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
 *  - The phone number comes from the CV. It was previously a placeholder
 *    ("+91 XXXXX XXXXX") and had been removed rather than shipped as a fake.
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
    "Full Stack Developer building production backends with Spring Boot and Node.js, and the React interfaces on top of them",
  bio: "I'm a Full Stack Developer at Namekart, where I own a domain-name platform across 30+ modules — the Spring Boot services behind it, the multi-agent AI workflows that automate client reporting, and the React interfaces the team works in every day. I care about systems that hold up in production: filtered search that stays in the millisecond range over millions of rows, workflows that retry themselves when something fails, and screens that stay simple as the data grows. Away from feature work I've solved 800+ algorithmic problems in Java and qualified for the ICPC regionals.",
  /** The split heading above the bio — the second half renders as gradient text. */
  intro: {
    lead: "I'm Sanjeev Singh, a",
    highlight: "Full Stack Developer",
  },
  email: "sanjeevsinghkaushik662@gmail.com",
  /** Display form and the tel: form, which must have no spaces or dashes. */
  phone: "+91 95060 09121",
  phoneHref: "tel:+919506009121",
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
  { id: "phone", icon: "Phone", label: "Phone", value: PROFILE.phone },
  { id: "city", icon: "MapPin", label: "City", value: PROFILE.location },
  { id: "email", icon: "Mail", label: "E-mail", value: PROFILE.email },
  {
    id: "current-role",
    icon: "Briefcase",
    label: "Current Role",
    value: PROFILE.role,
  },
];

/** The "Get In Touch" rows on the contact page. */
export const CONTACT_INFO = [
  {
    id: "email",
    icon: "Mail",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    id: "phone",
    icon: "Phone",
    label: "Phone",
    value: PROFILE.phone,
    href: PROFILE.phoneHref,
  },
  {
    id: "location",
    icon: "MapPin",
    label: "Location",
    value: PROFILE.location,
    href: null,
  },
];
