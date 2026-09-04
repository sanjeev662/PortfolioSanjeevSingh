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
 */

import namekartImg from "../Components/Assets/Certificates/namekart_intern.webp";
import rydeuImg from "../Components/Assets/Certificates/rydeu_intern.webp";
import icpcImg from "../Components/Assets/Certificates/icpc.webp";
import iitkMlImg from "../Components/Assets/Certificates/iitk_ml.webp";
import udemyImg from "../Components/Assets/Certificates/udemy.webp";
import isroImg from "../Components/Assets/Certificates/isro.webp";
import riseImg from "../Components/Assets/Certificates/rise.webp";
import sparkImg from "../Components/Assets/Certificates/spark.webp";
import multigradImg from "../Components/Assets/Certificates/multigrad.webp";
import unicompilerImg from "../Components/Assets/Certificates/unicompiler.webp";
import tcsImg from "../Components/Assets/Certificates/tcs.webp";
import nitMijoramImg from "../Components/Assets/Certificates/nit_mijoram.webp";
import codechefImg from "../Components/Assets/Certificates/codechef.webp";
import hackerrankImg from "../Components/Assets/Certificates/hackerrank_java.webp";
import uietImg from "../Components/Assets/Certificates/uiet.webp";

export const CERTIFICATES = [
  {
    id: "namekart-intern",
    title: "Namekart Pvt. Ltd",
    image: namekartImg,
    tagline: "SDE Intern",
    siteUrl: "https://www.namekart.com/",
    featured: true,
  },
  {
    id: "rydeu-intern",
    title: "Rydeu Logistics India Pvt. Ltd",
    image: rydeuImg,
    tagline: "Backend Development Intern",
    siteUrl: "https://www.rydeu.com/",
    featured: true,
  },
  {
    id: "acm-icpc",
    title: "ACM-ICPC",
    image: icpcImg,
    tagline: "ICPC 2022 Regionalist",
    siteUrl: "https://icpc.global/",
    year: "2022",
    featured: true,
  },
  {
    id: "iit-kanpur-ml",
    title: "IIT Kanpur",
    image: iitkMlImg,
    tagline: "Machine Learning Course",
    siteUrl: "https://www.iitk.ac.in/",
    featured: false,
  },
  {
    id: "udemy-web-dev-bootcamp",
    title: "Udemy",
    image: udemyImg,
    tagline: "Web Development Bootcamp",
    siteUrl: "https://www.udemy.com/",
    featured: false,
  },
  {
    id: "isro-ml",
    title: "ISRO",
    image: isroImg,
    tagline: "Machine Learning",
    siteUrl: "https://www.isro.gov.in/",
    featured: false,
  },
  {
    id: "rise-higher-education",
    title: "Rise Higher Education Inc",
    image: riseImg,
    tagline: "Full Stack Development Intern",
    siteUrl: "https://www.risehighereducation.com/",
    featured: false,
  },
  {
    id: "sparks-foundation",
    title: "The Sparks Foundation",
    image: sparkImg,
    tagline: "Web Development & Designing Intern",
    siteUrl: "https://www.thesparksfoundationsingapore.org/",
    featured: false,
  },
  {
    id: "multigrad-fightage",
    title: "Fightage Pvt Ltd (Multigrad)",
    image: multigradImg,
    tagline: "Full Stack Development Intern",
    siteUrl: "https://multigrad.in/",
    featured: false,
  },
  {
    id: "unicompiler",
    title: "UNICompiler",
    image: unicompilerImg,
    tagline: "Web Dev Intern",
    siteUrl: "https://unicompiler.com/",
    featured: false,
  },
  {
    id: "tcs-soft-skills",
    title: "Tata Consultancy Services",
    image: tcsImg,
    tagline: "TCS Soft Skills Certificate",
    siteUrl: "https://www.tcs.com/",
    featured: false,
  },
  {
    id: "nit-mijoram",
    title: "NIT Mijoram",
    image: nitMijoramImg,
    tagline: "Web Dev Contest",
    siteUrl: "https://www.nitmz.ac.in/",
    featured: false,
  },
  {
    id: "codechef-snackdown",
    title: "Codechef",
    image: codechefImg,
    tagline: "SnackDown Certificate",
    siteUrl: "https://www.codechef.com/",
    featured: false,
  },
  {
    id: "hackerrank-java",
    title: "Hackerrank",
    image: hackerrankImg,
    tagline: "Java Certification",
    siteUrl: "https://www.hackerrank.com/",
    featured: false,
  },
  {
    id: "uiet-csjmu-iot",
    title: "UIET CSJMU",
    image: uietImg,
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
