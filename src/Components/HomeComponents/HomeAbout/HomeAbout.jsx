import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Mail, 
  Briefcase,
  Download,
  UserCheck,
  ArrowRight,
  Code,
  Database,
  Brain,
  Trophy,
  Building2,
  ExternalLink,
  Clock,
  Award
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
  }
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

function HomeAbout() {
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
    <section ref={ref} className="section-padding bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          {/* Introduction Paragraph */}
          <motion.div variants={itemVariants}>
            <div className="p-4 space-y-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  I'm Sanjeev Singh and{" "}
                  <span className="gradient-text">Potential Learner (^_^)</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
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
                    <h3 className="text-xl font-bold text-center lg:text-left">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {personalInfo.map((info, index) => (
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
                      {skills.map((skill, index) => (
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
                            {/* <span className="text-sm font-medium text-primary">{skill.percentage}%</span> */}
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
                                <Building2 className="w-4 h-4" />
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
                  <GlassCard className="p-6 h-full">
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
                                <p className="font-medium text-base">{exp.company}</p>
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
            </div>
          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/about">
                View Complete Profile
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeAbout;
