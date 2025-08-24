import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  User, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Mail, 
  Briefcase,
  Download,
  UserCheck,
  Code,
  Database,
  Brain,
  Trophy,
  Building,
  Clock,
  Award,
  ExternalLink
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useIntersectionObserver } from "../../../lib/utils";

const personalInfo = [
  { icon: GraduationCap, label: "Degree", value: "B-Tech Information Technology" },
  { icon: Calendar, label: "Graduation Year", value: "2024" },
  { icon: User, label: "Age", value: "23" },
  { icon: MapPin, label: "City", value: "New Delhi, India" },
  { icon: Mail, label: "E-mail", value: "sanjeevsinghkaushik662@gmail.com" },
  { icon: Briefcase, label: "Current Role", value: "Software Development Engineer (SDE)" },
];

const skills = [
  { 
    name: "Frontend Development", 
    tech: "React.js, Next.js, TypeScript, MUI",
    percentage: 84,
    icon: Code,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Backend Development", 
    tech: "Node.js, Spring Boot, MySQL, MongoDB",
    percentage: 88,
    icon: Database,
    color: "from-green-500 to-emerald-500"
  },
  { 
    name: "Data Structures & Algorithms", 
    tech: "Java",
    percentage: 85,
    icon: Brain,
    color: "from-purple-500 to-violet-500"
  },
  { 
    name: "Competitive Programming", 
    tech: "Java",
    percentage: 86,
    icon: Trophy,
    color: "from-orange-500 to-red-500"
  },
];

const education = [
  {
    period: "November 2020 – June 2024",
    title: "Bachelor of Technology in Information Technology",
    institution: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    link: "http://csjmu.ac.in/school-of-engineering-and-technology",
    description: "Graduated with strong foundation in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks."
  },
  {
    period: "2012 - 2019",
    title: "Primary and Secondary Education",
    institution: "Naga Ji Saraswati Vidya Mandir Senior Secondary School, Maldepur - Ballia",
    link: "https://nagajimaldepur.in/",
    description: "Completed higher and secondary education through CBSE Board with subjects P.C.M & Sanskrit."
  }
];

const experience = [
  {
    period: "July 2024 – Present",
    title: "Software Development Engineer (SDE)",
    company: "Namekart Private Limited",
    location: "Noida, India",
    achievements: [
      "Integrated an LLM-powered AI assistant with RAG using NLP, enabling users to ask any query in natural language and receive real-time reports and data summaries, reducing manual analysis time by 50% and enhancing decision-making across teams",
      "Developed a Mailing system that streamlines bulk email management and automates marketing campaigns, facilitating effective tracking of email performance and achieving a 60% increase in customer engagement",
      "Created location tracking system with 99% accuracy, monitoring 100+ daily user movements across 10+ cities",
      "Built a data scraping system using puppeteer and cheerio for data extraction, with frontend visualization for operational analysis",
      "Redesigned the main dashboard using microfrontend architecture, enabling seamless integration of applications developed independently by different teams, enhancing flexibility for development and testing"
    ],
    tech: "Java, Spring Boot, JPA, Microservices Architecture, React, Node.js, MySQL, Docker, Azure"
  },
  {
    period: "November 2023 – June 2024",
    title: "Backend Developer Intern",
    company: "Rydeu Logistics India Pvt. Ltd.",
    location: "Bengaluru, India (Remote)",
    achievements: [
      "Optimized 20+ critical APIs, reducing average response time from 2s to 1.2s, improving performance by 40%",
      "Engineered KeyCloak authentication system, enhancing security for 100+ users, reducing unauthorized access by 95%",
      "Designed international bank account system, managing 1000+ accounts across 10+ countries with 100% accuracy",
      "Developed automated vendor offer feature, reducing manual effort by 70% and increasing participation by 35%",
      "Integrated Freshwork CRM for customer interaction and email marketing, resulting in 30% increase in lead conversions"
    ],
    tech: "Node.js, PostgreSQL, Sequelize, GitLab, Next.js, Redux, TypeScript, Material UI, Zoho CRM"
  },
  {
    period: "July 2023 - September 2023",
    title: "Full Stack Development Intern",
    company: "Fightage Pvt Ltd (Multigrad)",
    location: "Remote",
    certificate: "https://drive.google.com/file/d/1pnetigvEpF4VFIMCwEWomPMKii3Y8rxS/view?usp=drive_link",
    achievements: [
      "Contributed to full stack web development as a proactive intern",
      "Took charge of Node.js and React.js projects, showcasing skills in both frontend and backend technologies",
      "Collaborated within a team to build and enhance web applications using Figma"
    ],
    tech: "Node.js, React.js, Figma"
  },
  {
    period: "April 2023 - June 2023",
    title: "Full Stack Development Intern",
    company: "Rise Higher Education Inc",
    location: "Remote",
    certificate: "https://drive.google.com/file/d/11-jxusAkYH0Laxa4OXAXfuSmHCXtVNJU/view",
    achievements: [
      "Collaborated with cross-functional teams to design, develop and deploy applications from end-to-end using MERN",
      "Managed database implementation and optimized RESTful API development for seamless integration",
      "Deployed cloud applications using strategic deployment and efficient techniques"
    ],
    tech: "MERN Stack, RESTful APIs, Cloud Deployment"
  }
];

function About() {
  const { ref, hasIntersected } = useIntersectionObserver();
  
  // Memoize static data to prevent re-creation
  const memoizedPersonalInfo = useMemo(() => personalInfo, []);
  const memoizedSkills = useMemo(() => skills, []);
  const memoizedEducation = useMemo(() => education, []);
  const memoizedExperience = useMemo(() => experience, []);

  // Memoize animation variants to prevent re-creation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced for better performance
        ease: "easeOut",
      },
    },
  }), []);

  return (
    <>
      <Helmet>
        <title>About - Sanjeev Kumar Singh | Full Stack Developer</title>
        <meta name="description" content="Learn about Sanjeev Kumar Singh's professional journey, education, experience, and technical skills as a Full Stack Developer specializing in JavaScript and Java." />
        <meta name="keywords" content="Sanjeev Singh About, Full Stack Developer Experience, Software Engineer Background, JavaScript Java Developer" />
      </Helmet>

      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Passionate Full Stack Developer with expertise in modern web technologies and a strong foundation in problem-solving
              </p>
            </motion.div>

            {/* Introduction Paragraph */}
            <motion.div variants={itemVariants}>
              <div className="p-4 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-left">
                    I'm Sanjeev Singh and{" "}
                    <span className="gradient-text">Potential Learner (^_^)</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg text-left">
                    Hi! My name is Sanjeev Singh. I'm a passionate Full Stack Developer with expertise in 
                    JavaScript, Java, React.js, Node.js, and Spring Boot. I have a strong foundation in 
                    Data Structures and Algorithms, and I'm continuously learning and enthusiastic about 
                    Open Source development. I enjoy working on end-to-end products and collaborating with 
                    teams to build innovative solutions.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 min-h-[420px]">
                  {/* Left Column - Personal Information (60% width) */}
                  <div className="flex-[0.6] space-y-5 flex flex-col justify-between">
                    <div className="space-y-5">
                      <h3 className="text-xl font-bold text-left">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {memoizedPersonalInfo.map((info, index) => (
                          <motion.div
                            key={info.label}
                            variants={itemVariants}
                            className="flex items-center space-x-2 p-2.5 rounded-lg bg-background/50 border border-border/50 min-h-[60px]"
                          >
                            <info.icon className="w-4 h-4 text-primary flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-muted-foreground">{info.label}:</p>
                              <p className="font-medium text-sm truncate">{info.value}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                        <Button variant="gradient" size="default" className="group h-10" asChild>
                          <a
                            href="https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                            Download CV
                          </a>
                        </Button>
                        <Button variant="outline" size="default" className="h-10" asChild>
                          <Link to="/contacts">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Hire Me
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Technical Skills (40% width) */}
                  <div className="flex-[0.4] space-y-5 flex flex-col justify-between">
                    <div className="space-y-5">
                      <h3 className="text-xl font-bold text-center lg:text-left">Technical Skills</h3>
                      <div className="space-y-4">
                        {memoizedSkills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            className="space-y-2 min-h-[60px] flex flex-col justify-center"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <skill.icon className="w-4 h-4 text-primary" />
                                <div>
                                  <h5 className="font-semibold text-sm">{skill.name}</h5>
                                  <p className="text-sm text-muted-foreground truncate">{skill.tech}</p>
                                </div>
                              </div>
                              <span className="text-sm font-medium text-primary">{skill.percentage}%</span>
                            </div>
                            <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={hasIntersected ? { width: `${skill.percentage}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education & Experience */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Education */}
              <motion.div variants={itemVariants}>
                <GlassCard className="p-6 h-full">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      {memoizedEducation.map((edu, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative pl-6 border-l-2 border-primary/20 last:border-l-0"
                        >
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.period}</span>
                            </div>
                            <h4 className="font-semibold text-lg">{edu.title}</h4>
                            <a
                              href={edu.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center space-x-1"
                            >
                              <span>{edu.institution}</span>
                            </a>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {edu.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants}>
                <GlassCard className="p-6 h-full">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-primary" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-8">
                      {memoizedExperience.map((exp, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative pl-6 border-l-2 border-primary/20 last:border-l-0"
                        >
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg text-primary">{exp.title}</h4>
                              <p className="font-medium">{exp.company}</p>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {exp.location}
                              </p>
                            </div>
                            {exp.certificate && (
                              <a
                                href={exp.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-primary hover:underline text-sm"
                              >
                                <Award className="w-4 h-4" />
                                <span>View Certificate</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start space-x-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.split(', ').map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-accent/50 text-accent-foreground text-xs rounded-md font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default React.memo(About);
