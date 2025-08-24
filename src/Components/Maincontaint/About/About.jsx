import React from "react";
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
    percentage: 90,
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
    percentage: 82,
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
      "Integrated AI-powered assistant using NLP, enabling natural language queries and real-time reports, reducing manual analysis time by 50%",
      "Developed Mailing system for bulk email management and marketing campaigns, achieving 60% increase in customer engagement",
      "Created location tracking system with 99% accuracy, monitoring 100+ daily user movements across 10+ cities",
      "Built data scraping system using puppeteer and cheerio with frontend visualization for operational analysis",
      "Redesigned main dashboard using microfrontend architecture for seamless integration of applications"
    ],
    tech: "Java, Spring Boot, JPA, Microfrontend Architecture, React, Node.js, SQL"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

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
              <h1 className="text-2xl md:text-4xl font-bold gradient-text">About Me</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Passionate Full Stack Developer with expertise in modern web technologies and a strong foundation in problem-solving
              </p>
            </motion.div>

            {/* Introduction & Personal Info */}
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div variants={itemVariants}>
                <GlassCard className="p-8 h-full">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-4">
                        I'm Sanjeev Singh and{" "}
                        <span className="gradient-text">Potential Learner (^_^)</span>
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Hi! My name is Sanjeev Singh. I'm a passionate Full Stack Developer with expertise in 
                        JavaScript, Java, React.js, Node.js, and Spring Boot. I have a strong foundation in 
                        Data Structures and Algorithms, and I'm continuously learning and enthusiastic about 
                        Open Source development. I enjoy working on end-to-end products and collaborating with 
                        teams to build innovative solutions.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="gradient" size="lg" className="group" asChild>
                        <a
                          href="https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                          Download CV
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/contacts">
                          <UserCheck className="w-5 h-5 mr-2" />
                          Hire Me
                        </Link>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassCard className="p-8 h-full">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <User className="w-6 h-6 mr-2 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="grid gap-4">
                      {personalInfo.map((info, index) => (
                        <motion.div
                          key={info.label}
                          variants={itemVariants}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/50"
                        >
                          <info.icon className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-muted-foreground">{info.label}:</p>
                            <p className="font-medium text-sm">{info.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              </motion.div>
            </div>

            {/* Skills Section */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Code className="w-6 h-6 mr-2 text-primary" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <skill.icon className="w-5 h-5 text-primary" />
                            <div>
                              <h5 className="font-semibold">{skill.name}</h5>
                              <p className="text-sm text-muted-foreground">{skill.tech}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-primary">{skill.percentage}%</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
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
                </CardContent>
              </GlassCard>
            </motion.div>

            {/* Education & Experience */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Education */}
              <motion.div variants={itemVariants}>
                <GlassCard className="p-8 h-full">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      {education.map((edu, index) => (
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
                              <Building className="w-4 h-4" />
                              <span>{edu.institution}</span>
                              <ExternalLink className="w-3 h-3" />
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
                <GlassCard className="p-8 h-full">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-primary" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-8">
                      {experience.map((exp, index) => (
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

export default About;
