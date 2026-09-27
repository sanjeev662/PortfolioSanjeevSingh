/**
 * Single source of truth for the certificate list.
 *
 * Consumed by BOTH the full Certificates page and the homepage teaser section.
 * Do NOT re-declare certificate arrays inside a component body — import
 * CERTIFICATES / FEATURED_CERTIFICATES instead.
 *
 * Order and copy come from Certificates.jsx (the full page). The homepage
 * currently shows the first three entries; those carry `featured: true`.
 *
 * `issuer` and `year` are intentionally absent on most rows: the source files
 * never stated them and inventing them would put false claims on the site.
 * Populate them only from a verifiable certificate.
 *
 * `image` is a STRING key; resolve it with `getImage()` from ./images. Keep
 * this file free of asset imports: the chatbot's server function imports it.
 */

export const CERTIFICATES = [
  {
    id: "namekart-intern",
    title: "Namekart Pvt. Ltd",
    image: "Certificates/namekart_intern",
    tagline: "SDE Intern",
    siteUrl: "https://www.namekart.com/",
    featured: true,
  },
  {
    id: "rydeu-intern",
    title: "Rydeu Logistics India Pvt. Ltd",
    image: "Certificates/rydeu_intern",
    tagline: "Backend Development Intern",
    siteUrl: "https://www.rydeu.com/",
    featured: true,
  },
  {
    id: "acm-icpc",
    title: "ACM-ICPC",
    image: "Certificates/icpc",
    tagline: "ICPC 2022 Regionalist",
    siteUrl: "https://icpc.global/",
    year: "2022",
    featured: true,
  },
  {
    id: "iit-kanpur-ml",
    title: "IIT Kanpur",
    image: "Certificates/iitk_ml",
    tagline: "Machine Learning Course",
    siteUrl: "https://www.iitk.ac.in/",
    featured: false,
  },
  {
    id: "udemy-web-dev-bootcamp",
    title: "Udemy",
    image: "Certificates/udemy",
    tagline: "Web Development Bootcamp",
    siteUrl: "https://www.udemy.com/",
    featured: false,
  },
  {
    id: "isro-ml",
    title: "ISRO",
    image: "Certificates/isro",
    tagline: "Machine Learning",
    siteUrl: "https://www.isro.gov.in/",
    featured: false,
  },
  {
    id: "rise-higher-education",
    title: "Rise Higher Education Inc",
    image: "Certificates/rise",
    tagline: "Full Stack Development Intern",
    siteUrl: "https://www.risehighereducation.com/",
    featured: false,
  },
  {
    id: "sparks-foundation",
    title: "The Sparks Foundation",
    image: "Certificates/spark",
    tagline: "Web Development & Designing Intern",
    siteUrl: "https://www.thesparksfoundationsingapore.org/",
    featured: false,
  },
  {
    id: "multigrad-fightage",
    title: "Fightage Pvt Ltd (Multigrad)",
    image: "Certificates/multigrad",
    tagline: "Full Stack Development Intern",
    siteUrl: "https://multigrad.in/",
    featured: false,
  },
  {
    id: "unicompiler",
    title: "UNICompiler",
    image: "Certificates/unicompiler",
    tagline: "Web Dev Intern",
    siteUrl: "https://unicompiler.com/",
    featured: false,
  },
  {
    id: "tcs-soft-skills",
    title: "Tata Consultancy Services",
    image: "Certificates/tcs",
    tagline: "TCS Soft Skills Certificate",
    siteUrl: "https://www.tcs.com/",
    featured: false,
  },
  {
    id: "nit-mijoram",
    title: "NIT Mijoram",
    image: "Certificates/nit_mijoram",
    tagline: "Web Dev Contest",
    siteUrl: "https://www.nitmz.ac.in/",
    featured: false,
  },
  {
    id: "codechef-snackdown",
    title: "Codechef",
    image: "Certificates/codechef",
    tagline: "SnackDown Certificate",
    siteUrl: "https://www.codechef.com/",
    featured: false,
  },
  {
    id: "hackerrank-java",
    title: "Hackerrank",
    image: "Certificates/hackerrank_java",
    tagline: "Java Certification",
    siteUrl: "https://www.hackerrank.com/",
    featured: false,
  },
  {
    id: "uiet-csjmu-iot",
    title: "UIET CSJMU",
    image: "Certificates/uiet",
    tagline: "Internet of Things (IOT)",
    siteUrl: "http://csjmu.ac.in/",
    featured: false,
  },
];

/** The homepage teaser row — derived, never a hand-maintained second list. */
export const FEATURED_CERTIFICATES = CERTIFICATES.filter(
  (certificate) => certificate.featured
);

/**
 * Escape hatch for surfaces that want "the first N" rather than the curated
 * featured set (e.g. a wider homepage grid). Still derived from CERTIFICATES.
 */
export function getCertificates(limit) {
  return typeof limit === "number" ? CERTIFICATES.slice(0, limit) : CERTIFICATES;
}
