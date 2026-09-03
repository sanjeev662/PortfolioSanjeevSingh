import React, { useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FolderOpen, Grid3X3, List, Search, X } from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";
import SectionHeading from "../../ui/SectionHeading";
import { useIntersectionObserver } from "../../../lib/utils";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_SKILL_COUNT,
  FEATURED_PROJECTS,
} from "../../../data";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { ref, hasIntersected } = useIntersectionObserver();
  const prefersReducedMotion = useReducedMotion();

  // Both the travel distance and the stagger collapse when the visitor has
  // asked for reduced motion.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" },
    },
  };

  // Worth memoizing: this runs 12 projects x 3 string scans on every keystroke.
  // Lower-casing the query once instead of once per field is the whole trick.
  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }
      if (!query) return true;

      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("All");
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects - Sanjeev Kumar Singh | Full Stack Developer Portfolio</title>
        <meta name="description" content="Explore Sanjeev Kumar Singh's portfolio of full-stack web applications, including MERN stack projects, real-time applications, and modern web solutions." />
        <meta name="keywords" content="Sanjeev Singh Projects, Full Stack Projects, MERN Stack, React Projects, Node.js Applications, Web Development Portfolio" />
      </Helmet>

      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="space-y-10 lg:space-y-12"
          >
            <motion.div variants={itemVariants}>
              <SectionHeading
                title="My Projects"
                subtitle="A showcase of my technical skills and creativity through various web applications and software solutions"
                icon={FolderOpen}
              />
            </motion.div>

            {/* Filters and Search */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Search: always full width so it never competes with the
                      chips for horizontal space at tablet widths. */}
                  <div role="search" className="relative">
                    <label htmlFor="project-search" className="sr-only">
                      Search projects by name, description or technology
                    </label>
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      id="project-search"
                      type="text"
                      inputMode="search"
                      autoComplete="off"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full rounded-lg border border-border/60 bg-background/60 py-3 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    {searchTerm && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    )}
                  </div>

                  {/* Category chips scroll horizontally instead of wrapping into
                      a six-row wall between 640px and 1024px. */}
                  <div className="flex items-center gap-3">
                    <div className="no-scrollbar -mx-1 flex flex-1 snap-x gap-2 overflow-x-auto px-1 py-1">
                      {PROJECT_CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                          <Button
                            key={category}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            aria-pressed={isActive}
                            onClick={() => setSelectedCategory(category)}
                            className="shrink-0 snap-start whitespace-nowrap"
                          >
                            {category}
                          </Button>
                        );
                      })}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 border-l border-border/60 pl-3">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        aria-label="Grid view"
                        aria-pressed={viewMode === "grid"}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        aria-label="List view"
                        aria-pressed={viewMode === "list"}
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <p aria-live="polite" className="text-sm text-muted-foreground">
                    Showing {filteredProjects.length} of {PROJECTS.length} projects
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Projects */}
            {filteredProjects.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                    : "mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:gap-8"
                }
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} className="h-full">
                    <ProjectCard {...project} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="py-12 text-center">
                <div className="mb-4 text-5xl sm:text-6xl" aria-hidden="true">
                  🔍
                </div>
                <h3 className="mb-2 text-lg font-bold sm:text-xl">No projects found</h3>
                <p className="mb-6 text-muted-foreground">
                  Try adjusting your search terms or category filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8">
                  <div>
                    <div className="mb-1 text-2xl font-bold text-primary sm:mb-2">
                      {PROJECTS.length}
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-base">
                      Total Projects
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-bold text-primary sm:mb-2">
                      {FEATURED_PROJECTS.length}
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-base">
                      Featured Projects
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-bold text-primary sm:mb-2">
                      {PROJECT_CATEGORIES.length - 1}
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-base">
                      Categories
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-bold text-primary sm:mb-2">
                      {PROJECT_SKILL_COUNT}
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-base">
                      Technologies Used
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Projects);
