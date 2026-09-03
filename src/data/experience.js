/**
 * Single source of truth for professional experience and education.
 *
 * Consumed by BOTH the full About page and the homepage About teaser.
 * Do NOT re-declare these arrays inside a component body.
 *
 * Every date range, company, location, achievement bullet and certificate link
 * is copied verbatim from About.jsx. The `tech` comma-string that the components
 * used to `.split(", ")` on every render is already a real array here — render
 * `role.tech.map(...)` directly.
 */

export const EXPERIENCE = [
  {
    id: "namekart-sde",
    period: "July 2024 – Present",
    title: "Software Development Engineer (SDE)",
    company: "Namekart Private Limited",
    location: "Noida, India",
    achievements: [
      "Integrated an LLM-powered AI assistant with RAG using NLP, enabling users to ask any query in natural language and receive real-time reports and data summaries, reducing manual analysis time by 50% and enhancing decision-making across teams",
      "Developed a Mailing system that streamlines bulk email management and automates marketing campaigns, facilitating effective tracking of email performance and achieving a 60% increase in customer engagement",
      "Created location tracking system with 99% accuracy, monitoring 100+ daily user movements across 10+ cities",
      "Built a data scraping system using puppeteer and cheerio for data extraction, with frontend visualization for operational analysis",
      "Redesigned the main dashboard using microfrontend architecture, enabling seamless integration of applications developed independently by different teams, enhancing flexibility for development and testing",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "JPA",
      "Microservices Architecture",
      "React",
      "Node.js",
      "MySQL",
      "Docker",
      "Azure",
    ],
  },
  {
    id: "rydeu-backend-intern",
    period: "November 2023 – June 2024",
    title: "Backend Developer Intern",
    company: "Rydeu Logistics India Pvt. Ltd.",
    location: "Bengaluru, India (Remote)",
    achievements: [
      "Optimized 20+ critical APIs, reducing average response time from 2s to 1.2s, improving performance by 40%",
      "Engineered KeyCloak authentication system, enhancing security for 100+ users, reducing unauthorized access by 95%",
      "Designed international bank account system, managing 1000+ accounts across 10+ countries with 100% accuracy",
      "Developed automated vendor offer feature, reducing manual effort by 70% and increasing participation by 35%",
      "Integrated Freshwork CRM for customer interaction and email marketing, resulting in 30% increase in lead conversions",
    ],
    tech: [
      "Node.js",
      "PostgreSQL",
      "Sequelize",
      "GitLab",
      "Next.js",
      "Redux",
      "TypeScript",
      "Material UI",
      "Zoho CRM",
    ],
  },
  {
    id: "multigrad-fullstack-intern",
    period: "July 2023 - September 2023",
    title: "Full Stack Development Intern",
    company: "Fightage Pvt Ltd (Multigrad)",
    location: "Remote",
    certificate:
      "https://drive.google.com/file/d/1pnetigvEpF4VFIMCwEWomPMKii3Y8rxS/view?usp=drive_link",
    achievements: [
      "Contributed to full stack web development as a proactive intern",
      "Took charge of Node.js and React.js projects, showcasing skills in both frontend and backend technologies",
      "Collaborated within a team to build and enhance web applications using Figma",
    ],
    tech: ["Node.js", "React.js", "Figma"],
  },
  {
    id: "rise-fullstack-intern",
    period: "April 2023 - June 2023",
    title: "Full Stack Development Intern",
    company: "Rise Higher Education Inc",
    location: "Remote",
    certificate:
      "https://drive.google.com/file/d/11-jxusAkYH0Laxa4OXAXfuSmHCXtVNJU/view",
    achievements: [
      "Collaborated with cross-functional teams to design, develop and deploy applications from end-to-end using MERN",
      "Managed database implementation and optimized RESTful API development for seamless integration",
      "Deployed cloud applications using strategic deployment and efficient techniques",
    ],
    tech: ["MERN Stack", "RESTful APIs", "Cloud Deployment"],
  },
];

export const EDUCATION = [
  {
    id: "btech-csjmu",
    period: "November 2020 – June 2024",
    title: "Bachelor of Technology in Information Technology",
    institution: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    link: "http://csjmu.ac.in/school-of-engineering-and-technology",
    description:
      "Graduated with strong foundation in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.",
  },
  {
    id: "schooling-nagaji",
    period: "2012 - 2019",
    title: "Primary and Secondary Education",
    institution:
      "Naga Ji Saraswati Vidya Mandir Senior Secondary School, Maldepur - Ballia",
    link: "https://nagajimaldepur.in/",
    description:
      "Completed higher and secondary education through CBSE Board with subjects P.C.M & Sanskrit.",
  },
];

/**
 * The two most recent roles — what the homepage About teaser showed before this
 * module existed. Derived so it can never drift from EXPERIENCE.
 */
export const RECENT_EXPERIENCE = EXPERIENCE.slice(0, 2);
