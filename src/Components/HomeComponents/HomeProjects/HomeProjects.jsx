import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";

import { Button } from "../../ui/button";
import SectionHeading from "../../ui/SectionHeading";
import { useIntersectionObserver } from "../../../lib/utils";
import { FEATURED_PROJECTS } from "../../../data";
import ProjectCard from "../../Maincontaint/Projects/ProjectCard";

// There are four featured projects but only three columns at lg, so the teaser
// shows three — a fourth would sit alone on its own row. The rest are behind
// the "View All Projects" link.
const teaserProjects = FEATURED_PROJECTS.slice(0, 3);

function HomeProjects() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const prefersReducedMotion = useReducedMotion();

  // Both the travel distance and the stagger collapse when the visitor has
  // asked for reduced motion.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-accent/5 via-background to-background"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-10 lg:space-y-12"
        >
          <motion.div variants={itemVariants}>
            <SectionHeading
              title="Featured Projects"
              subtitle="Showcasing my latest work in full-stack development, real-time applications, and modern web technologies"
              icon={FolderOpen}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {teaserProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} className="h-full">
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(HomeProjects);
