import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  Briefcase,
  Clock,
  Download,
  ExternalLink,
  MapPin,
  UserCheck,
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SectionHeading from "../../ui/SectionHeading";
import {
  cn,
  makeReveal,
  makeStagger,
  useIntersectionObserver,
} from "../../../lib/utils";
import {
  PERSONAL_INFO,
  PROFILE,
  RECENT_EXPERIENCE,
  SKILLS,
  getIcon,
} from "../../../data";

// The homepage teaser for the About page: who I am, the skill bars, and only
// the two most recent roles. Education and the older roles live on /about.
function HomeAbout() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const reduced = useReducedMotion();

  const containerVariants = useMemo(() => makeStagger(reduced), [reduced]);
  const itemVariants = useMemo(() => makeReveal(reduced), [reduced]);

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-background via-background to-accent/5"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-10 sm:space-y-14 lg:space-y-16"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants}>
            <SectionHeading title="About Me" />
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="space-y-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold">
              {PROFILE.intro.lead}{" "}
              <span className="gradient-text">{PROFILE.intro.highlight}</span>
            </h3>
            <p className="mx-auto max-w-4xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {PROFILE.bio}
            </p>
          </motion.div>

          {/* Personal info and skills side by side on large screens, stacked below. */}
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Personal information */}
            <div className="space-y-5 lg:col-span-3">
              <h3 className="text-lg sm:text-xl font-bold">
                Personal Information
              </h3>

              <dl className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {PERSONAL_INFO.map((info) => {
                  const Icon = getIcon(info.icon);

                  return (
                    <motion.div
                      key={info.id}
                      variants={itemVariants}
                      className="flex items-start gap-2 rounded-lg border border-border/50 bg-background/50 p-2.5"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <dt className="text-sm text-muted-foreground">
                          {info.label}:
                        </dt>
                        {/* break-words, not truncate — the email has to stay readable. */}
                        <dd className="text-sm font-medium break-words">
                          {info.value}
                        </dd>
                      </div>
                    </motion.div>
                  );
                })}
              </dl>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 pt-2 sm:flex-row"
              >
                <Button variant="gradient" className="group" asChild>
                  <a
                    href={PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download
                      aria-hidden="true"
                      className={cn(
                        "mr-2 h-4 w-4",
                        !reduced && "group-hover:animate-bounce"
                      )}
                    />
                    Download CV
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contacts">
                    <UserCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                    Hire Me
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Technical skills */}
            <div className="space-y-5 lg:col-span-2">
              <h3 className="text-lg sm:text-xl font-bold">
                <Link
                  to="/domain#technical-skills"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-sm hover:text-primary"
                >
                  Technical Skills
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="sr-only">— see the full skills breakdown</span>
                </Link>
              </h3>

              <ul className="space-y-4">
                {SKILLS.map((skill, index) => {
                  const Icon = getIcon(skill.icon);

                  return (
                    <motion.li
                      key={skill.id}
                      variants={itemVariants}
                      className="space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <Icon
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="text-sm font-semibold">{skill.name}</h4>
                            <span className="shrink-0 text-xs font-semibold tabular-nums text-primary">
                              {skill.percentage}%
                            </span>
                          </div>
                          {/* line-clamp, not truncate — the stack stays legible. */}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {skill.tech}
                          </p>
                        </div>
                      </div>

                      <div
                        role="progressbar"
                        aria-valuenow={skill.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                        className="relative h-2 overflow-hidden rounded-full border border-border/70 bg-muted"
                      >
                        {/* Under reduced motion the bar starts full, so nothing sweeps. */}
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-primary"
                          initial={{ width: reduced ? `${skill.percentage}%` : 0 }}
                          animate={{
                            width:
                              hasIntersected || reduced
                                ? `${skill.percentage}%`
                                : 0,
                          }}
                          transition={{
                            duration: reduced ? 0 : 1,
                            delay: reduced ? 0 : index * 0.2,
                          }}
                        />
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Recent experience — the two latest roles only. */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 sm:p-6">
              <CardHeader className="p-0 pb-4 sm:p-0 sm:pb-4">
                <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
                  <Briefcase
                    className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-0">
                <ol className="space-y-8">
                  {RECENT_EXPERIENCE.map((exp, index) => (
                    <motion.li
                      key={exp.id}
                      variants={itemVariants}
                      className="relative pl-8"
                    >
                      {/* Dot per role, connector down to the next one, none on the last. */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-3.5 w-3.5 rounded-full bg-primary"
                      />
                      {index < RECENT_EXPERIENCE.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-1.5 top-4 -bottom-8 w-0.5 bg-primary/20"
                        />
                      )}

                      <div className="space-y-3">
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock
                            className="h-4 w-4 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{exp.period}</span>
                        </p>

                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-primary">
                            {exp.title}
                          </h4>
                          <p className="font-medium">{exp.company}</p>
                          <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin
                              className="h-3 w-3 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span>{exp.location}</span>
                          </p>
                        </div>

                        {exp.certificate && (
                          <a
                            href={exp.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View certificate for ${exp.title} at ${exp.company}`}
                            className="focus-ring tap-target inline-flex items-center gap-1 rounded-sm text-sm text-primary hover:underline"
                          >
                            <Award
                              className="h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span>View Certificate</span>
                            <ExternalLink
                              className="h-3 w-3 flex-shrink-0"
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {/* Real bullets instead of a "•" span faking them. */}
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
                          {exp.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>

                        {/* exp.tech is already an array in src/data — no .split() needed. */}
                        <ul className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-md bg-accent/50 px-2 py-1 text-xs font-medium text-accent-foreground"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/about">
                Read more about me
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

export default React.memo(HomeAbout);
