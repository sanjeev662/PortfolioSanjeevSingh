import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Brain, 
  Trophy, 
  ExternalLink, 
  Github,
  Award,
  Star,
  BookOpen,
  Target
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useIntersectionObserver } from "../../../lib/utils";
import icpcc from "../../Assets/Certificates/icpc.jpg";

const domains = [
  {
    icon: Code,
    title: "Full Stack Development",
    color: "from-blue-500 to-cyan-500",
    sections: [
      {
        title: "Frontend Development",
        tech: "React.js, Next.js, TypeScript, Bootstrap, Tailwind CSS, Material UI"
      },
      {
        title: "Backend Development", 
        tech: "Node.js, Express.js, Spring Boot"
      },
      {
        title: "Databases",
        tech: "SQL, MySQL, PostgreSQL, MongoDB"
      }
    ],
    projectLink: {
      url: "https://github.com/sanjeev662",
      text: "View Projects"
    }
  },
  {
    icon: Brain,
    title: "Data Structure and Algorithms",
    color: "from-purple-500 to-violet-500",
    links: [
      { label: "College-DSA Repo", url: "https://github.com/sanjeev662/DS-JAVA", text: "My Codes", icon: Github },
      { label: "College-OOPS Repo", url: "https://github.com/sanjeev662/OOPS-JAVA", text: "My Codes", icon: Github },
      { label: "GeeksforGeeks DSA", url: "https://auth.geeksforgeeks.org/user/sanjeev662", text: "My Profile", icon: BookOpen }
    ]
  },
  {
    icon: Trophy,
    title: "Competitive Programming",
    color: "from-orange-500 to-red-500",
    links: [
      { label: "CodeChef", url: "https://www.codechef.com/users/sanjeev662", text: "sanjeev662", icon: Target },
      { label: "CodeForces", url: "https://codeforces.com/profile/sanjeev662", text: "sanjeev662", icon: Target },
      { label: "HackerRank", url: "https://www.hackerrank.com/sanjeev662", text: "5★ Rating", icon: Star }
    ],
    achievement: {
      text: "ICPC Regionalist'2022 (Top 10%)",
      image: icpcc
    }
  }
];

function Domain() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section ref={ref} className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Technical Domains</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore my expertise across different technical domains and specializations
            </p>
          </motion.div>

          {/* Domains Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div key={domain.title} variants={itemVariants}>
                <GlassCard className="h-full p-8 group hover:scale-105 transition-all duration-300">
                  <CardHeader className="px-0 pt-0 pb-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${domain.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <domain.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                        {domain.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-0 pb-0 space-y-6">
                    {/* Sections for Full Stack Development */}
                    {domain.sections && (
                      <div className="space-y-4">
                        {domain.sections.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            <h5 className="font-semibold text-primary flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                              {section.title}
                            </h5>
                            <p className="text-sm text-muted-foreground leading-relaxed pl-4">{section.tech}</p>
                          </div>
                        ))}
                        
                        {domain.projectLink && (
                          <div className="pt-4">
                            <Button variant="outline" size="sm" className="w-full group" asChild>
                              <a href={domain.projectLink.url} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                {domain.projectLink.text}
                                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Links for other domains */}
                    {domain.links && (
                      <div className="space-y-3">
                        {domain.links.map((link, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                            <div className="flex items-center space-x-2">
                              <link.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{link.label}</span>
                            </div>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors group"
                            >
                              <span className="text-sm font-medium">{link.text}</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievement for Competitive Programming */}
                    {domain.achievement && (
                      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                          <a 
                            href={domain.achievement.image} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 hover:underline flex items-center space-x-1 group"
                          >
                            <span>{domain.achievement.text}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Domain;