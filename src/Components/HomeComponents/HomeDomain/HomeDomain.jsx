import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, ExternalLink, Github } from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SectionHeading from "../../ui/SectionHeading";
import {
  cn,
  makeReveal,
  makeStagger,
  useIntersectionObserver,
} from "../../../lib/utils";
import { DOMAINS, getIcon } from "../../../data";

// The homepage teaser for the Technical Domains page: the same three cards
// from DOMAINS, plus a link through to the full page.
function HomeDomain() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const reduced = useReducedMotion();

  const containerVariants = useMemo(() => makeStagger(reduced), [reduced]);
  const itemVariants = useMemo(() => makeReveal(reduced), [reduced]);

  return (
    <section
      ref={ref}
      id="Domain"
      className="section-padding bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-10"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants}>
            <SectionHeading
              title="Technical Domains"
              subtitle="Explore my expertise across different technical domains and specializations"
            />
          </motion.div>

          {/* Domain cards. Equal height per row, one column at 360px. */}
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {DOMAINS.map((domain) => {
              const DomainIcon = getIcon(domain.icon);

              return (
                <motion.div key={domain.id} variants={itemVariants}>
                  {/* One hover effect only: GlassCard's `interactive` lift. */}
                  <GlassCard interactive className="flex h-full flex-col p-5 sm:p-6">
                    <CardHeader className="p-0 pb-4 sm:p-0 sm:pb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className={cn(
                            "flex-shrink-0 rounded-lg bg-gradient-to-r p-3 shadow-lg",
                            domain.color
                          )}
                        >
                          <DomainIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                        <CardTitle className="text-base sm:text-lg font-bold">
                          {domain.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-4 p-0 sm:p-0">
                      {/* Full Stack Development lists its stack as sections. */}
                      {domain.sections && (
                        <div className="space-y-4">
                          {domain.sections.map((section) => (
                            <div key={section.id} className="space-y-1.5">
                              <h4 className="flex items-center font-semibold text-primary">
                                <span
                                  aria-hidden="true"
                                  className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary"
                                />
                                {section.title}
                              </h4>
                              <p className="pl-4 text-sm leading-relaxed text-muted-foreground">
                                {section.tech}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* The other two domains list profile links instead. */}
                      {domain.links && (
                        <ul className="space-y-3">
                          {domain.links.map((link) => {
                            const LinkIcon = getIcon(link.icon);

                            return (
                              <li
                                key={link.id}
                                // Stacks below 475px so the label and the link
                                // stop colliding on a 360px screen.
                                className="flex flex-col gap-1 rounded-lg border border-border/50 bg-background/50 p-2 transition-colors hover:border-primary/50 xs:flex-row xs:items-center xs:justify-between xs:gap-3"
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  <LinkIcon
                                    className="h-4 w-4 flex-shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                  />
                                  <span className="text-sm font-medium break-words">
                                    {link.label}:
                                  </span>
                                </span>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${link.label}: ${link.text}`}
                                  className="focus-ring tap-target inline-flex items-center gap-1 rounded-sm text-sm text-primary transition-colors hover:text-primary/80"
                                >
                                  <span className="break-words">{link.text}</span>
                                  <ExternalLink
                                    className="h-3 w-3 flex-shrink-0"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* Amber tint built from a translucent accent so it reads
                          correctly on all six themes, not just light and dark. */}
                      {domain.achievement && (
                        <div className="mt-auto rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
                          <div className="flex items-start gap-2">
                            <Award
                              className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
                              aria-hidden="true"
                            />
                            <a
                              href={domain.achievement.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="focus-ring tap-target rounded-sm text-sm font-medium text-foreground break-words hover:underline"
                            >
                              {domain.achievement.text}
                            </a>
                          </div>
                        </div>
                      )}

                      {domain.projectLink && (
                        <div className="mt-auto pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <a
                              href={domain.projectLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                              />
                              {domain.projectLink.text}
                              <ExternalLink
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                              />
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/domain">
                View More Domains
                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "ml-2 h-5 w-5",
                    !reduced && "transition-transform group-hover:translate-x-1"
                  )}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(HomeDomain);
