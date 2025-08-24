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
  Trophy
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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Introduction & Personal Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <GlassCard className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      I'm Sanjeev Singh and{" "}
                      <span className="gradient-text">Potential Learner (^_^)</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Hi! My name is Sanjeev Singh. I'm a passionate Full Stack Developer with expertise in 
                      JavaScript, Java, React.js, Node.js, and Spring Boot. I have a strong foundation in 
                      Data Structures and Algorithms, and I'm continuously learning and enthusiastic about 
                      Open Source development. I enjoy working on end-to-end products and collaborating with 
                      teams to build innovative solutions.
                    </p>
                  </div>

                  {/* Personal Information Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {personalInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        variants={itemVariants}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/50"
                      >
                        <info.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground">{info.label}:</p>
                          <p className="font-medium text-sm truncate">{info.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
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

            {/* Right Column - Skills */}
            <motion.div variants={itemVariants} className="space-y-8">
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
          </div>

          {/* Quick Experience Highlight */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-primary" />
                    Current Position
                  </h3>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Software Development Engineer (SDE)</h4>
                    <p className="text-muted-foreground">Namekart Private Limited</p>
                    <p className="text-sm text-muted-foreground">July 2024 – Present • Noida, India</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                    Education
                  </h3>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">B.Tech Information Technology</h4>
                    <p className="text-muted-foreground">Chhatrapati Shahu Ji Maharaj University</p>
                    <p className="text-sm text-muted-foreground">2020 – 2024 • Kanpur, India</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button variant="outline" size="lg" className="group" asChild>
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
