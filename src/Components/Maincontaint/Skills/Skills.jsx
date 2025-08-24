import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Code, 
  Database, 
  Brain, 
  Trophy, 
  Award,
  Star,
  Target,
  BookOpen
} from "lucide-react";

import { GlassCard, Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useIntersectionObserver } from "../../../lib/utils";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Java", level: 85 },
      { name: "HTML5 & CSS3", level: 88 },
      { name: "TypeScript", level: 80 }
    ]
  },
  {
    title: "Frontend Technologies",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Redux", level: 82 },
      { name: "Bootstrap & Tailwind CSS", level: 88 },
      { name: "Material UI", level: 80 }
    ]
  },
  {
    title: "Backend Technologies",
    icon: Database,
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "JPA", level: 75 },
      { name: "JWT Authentication", level: 82 }
    ]
  },
  {
    title: "Databases & Tools",
    icon: Database,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "SQL, MySQL, PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Git, GitHub, GitLab", level: 88 },
      { name: "RESTful APIs", level: 85 },
      { name: "Postman, Figma", level: 80 }
    ]
  }
];

const achievements = [
  {
    title: "ICPC Mathura-Kanpur Regionals 2022",
    description: "Qualifier (Top 10% among 5000+ participants)",
    icon: Trophy
  },
  {
    title: "Problem Solving",
    description: "700+ algorithmic problems solved on GeeksforGeeks and other coding platforms",
    icon: Brain
  },
  {
    title: "CodeChef",
    description: "3-star rating",
    icon: Target
  },
  {
    title: "HackerRank",
    description: "5-star rating",
    icon: Star
  },
  {
    title: "GeeksforGeeks",
    description: "Institute Rank 2 among 500+ students",
    icon: BookOpen
  }
];

function Skills() {
  const { ref, hasIntersected } = useIntersectionObserver();
  
  // Memoize static data
  const memoizedSkillCategories = useMemo(() => skillCategories, []);
  const memoizedAchievements = useMemo(() => achievements, []);
  
  // Memoize animation variants
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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }), []);

  return (
    <>
      <Helmet>
        <title>Skills - Sanjeev Kumar Singh | Technical Expertise</title>
        <meta name="description" content="Explore Sanjeev Kumar Singh's technical skills in full-stack development, programming languages, frameworks, and competitive programming achievements." />
        <meta name="keywords" content="Sanjeev Singh Skills, JavaScript, Java, React, Node.js, Full Stack Developer Skills, Programming Languages" />
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
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">Technical Skills</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A comprehensive overview of my technical expertise and programming capabilities
              </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {memoizedSkillCategories.map((category, categoryIndex) => (
                <motion.div key={category.title} variants={itemVariants}>
                  <GlassCard className="p-6 h-full">
                    <CardHeader className="px-0 pt-0 pb-6">
                      <CardTitle className="text-xl font-bold flex items-center">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-3`}>
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm">{skill.name}</h5>
                              <span className="text-sm font-medium text-primary">{skill.level}%</span>
                            </div>
                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                                initial={{ width: 0 }}
                                animate={hasIntersected ? { width: `${skill.level}%` } : { width: 0 }}
                                transition={{ 
                                  duration: 1, 
                                  delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                  ease: "easeOut"
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <CardHeader className="px-0 pt-0 pb-6">
                  <CardTitle className="text-2xl font-bold flex items-center justify-center">
                    <Award className="w-6 h-6 mr-3 text-primary" />
                    Achievements & Competitive Programming
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="px-0 pb-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memoizedAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.title}
                        variants={itemVariants}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <achievement.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>

            {/* Skills Summary Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">700+</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">12+</div>
                  <div className="text-sm text-muted-foreground">Projects Built</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Skills);