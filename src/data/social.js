/**
 * Single source of truth for external social / contact links.
 *
 * The hero (Home.jsx), the footer (Footer/Footer.jsx) and the contact page each
 * used to keep their own copy. They now share this list and filter it by
 * `showIn` — do NOT re-add a local socialLinks array to any component.
 *
 *   SOCIAL_LINKS.filter((link) => link.showIn.includes("footer"))
 *
 * `icon` is a STRING name; resolve it with `getIcon()` from ./icons.
 * `color` is the existing Tailwind hover utility for that brand.
 */

export const SOCIAL_LINKS = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@sscreation101/featured",
    icon: "Youtube",
    color: "hover:text-red-500",
    showIn: ["footer"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/sanjeev662",
    icon: "Github",
    // GitHub has no brand colour that works on every theme, so it hovers to the
    // theme's own foreground. (A `dark:` pair would only fire on the `dark`
    // theme and come out near-invisible on midnight and obsidian.)
    color: "hover:text-foreground",
    showIn: ["hero", "footer", "contact"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sanjeev662/",
    icon: "Linkedin",
    color: "hover:text-blue-600",
    showIn: ["hero", "footer", "contact"],
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/sanjeevsingh_24/",
    icon: "Instagram",
    color: "hover:text-pink-500",
    showIn: ["footer"],
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100009128253547",
    icon: "Facebook",
    color: "hover:text-blue-500",
    showIn: ["footer"],
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:sanjeevsinghkaushik662@gmail.com",
    icon: "Mail",
    color: "hover:text-green-500",
    showIn: ["hero", "footer", "contact"],
  },
  {
    id: "stack-overflow",
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/22363267/sanjeev-kumar-singh",
    icon: "ExternalLink",
    color: "hover:text-orange-500",
    showIn: ["contact"],
  },
];

/** Ready-made slices for the two surfaces that render a social row. */
export const HERO_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) =>
  link.showIn.includes("hero")
);

export const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) =>
  link.showIn.includes("footer")
);
