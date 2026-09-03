import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, MessageSquare } from "lucide-react";

import Form from "./Form";
import { makeReveal, makeStagger, useIntersectionObserver } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { GlassCard, CardContent, CardHeader, CardTitle } from "../../ui/card";
import SectionHeading from "../../ui/SectionHeading";
import { CONTACT_INFO, PROFILE, SOCIAL_LINKS, getIcon } from "../../../data";

/**
 * Contact page: the form plus the ways to reach me that aren't a form.
 *
 * Both lists come from src/data. There is deliberately no phone row: this page
 * and the form used to show two different, unverifiable numbers, one of which
 * was an obvious placeholder. Better none than a wrong one.
 */

/** Tagged `showIn: ["contact"]` in src/data/social.js — no local copy here. */
const CONTACT_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) =>
  link.showIn.includes("contact")
);

const LINKEDIN = SOCIAL_LINKS.find((link) => link.id === "linkedin");

function Contacts() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const reduced = useReducedMotion();

  const containerVariants = makeStagger(reduced);
  const itemVariants = makeReveal(reduced);

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-8 lg:space-y-10"
        >
          <motion.div variants={itemVariants}>
            <SectionHeading
              title="Contact Me"
              subtitle="Ready to start your next project? Let's connect and discuss how we can work together to bring your ideas to life."
            />
          </motion.div>

          {/*
            Source order == visual order at every width, so there are no
            `order-*` overrides: the form is first in the DOM and first on
            screen. Tab order and reading order can never disagree.
          */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <Form className="h-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <GlassCard className="h-full p-4 sm:p-6 lg:p-8">
                <CardHeader className="px-0 pb-4 pt-0 sm:px-0 sm:pb-6 sm:pt-0">
                  <CardTitle className="flex items-center">
                    <Mail
                      className="mr-2 h-5 w-5 text-primary lg:h-6 lg:w-6"
                      aria-hidden="true"
                    />
                    Get In Touch
                  </CardTitle>
                  <p className="text-sm text-muted-foreground lg:text-base">
                    I'd love to hear from you. Send me a message and I'll respond
                    as soon as possible.
                  </p>
                </CardHeader>

                <CardContent className="space-y-6 px-0 pb-0 sm:px-0 sm:pb-0">
                  <ul className="space-y-3 lg:space-y-4">
                    {CONTACT_INFO.map((info) => {
                      const Icon = getIcon(info.icon);
                      return (
                        <li
                          key={info.id}
                          className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-colors hover:border-primary/50 lg:gap-4 lg:p-4"
                        >
                          <span className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                            <Icon
                              className="h-4 w-4 text-primary lg:h-5 lg:w-5"
                              aria-hidden="true"
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground lg:text-sm">
                              {info.label}
                            </p>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="focus-ring tap-target break-words rounded-sm text-sm font-medium transition-colors hover:text-primary lg:text-base"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="break-words text-sm font-medium lg:text-base">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div>
                    <h3 className="sr-only">Social profiles</h3>
                    <ul className="flex flex-wrap gap-2">
                      {CONTACT_SOCIAL_LINKS.map((link) => {
                        const Icon = getIcon(link.icon);
                        const external = link.href.startsWith("http");
                        return (
                          <li key={link.id}>
                            <a
                              href={link.href}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noopener noreferrer" : undefined}
                              className={`focus-ring inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-2 text-sm font-medium transition-colors hover:border-primary/50 [@media(pointer:coarse)]:min-h-[44px] ${link.color}`}
                            >
                              <Icon className="h-4 w-4" aria-hidden="true" />
                              {link.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-4 text-center sm:p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-6">
                <MessageSquare
                  className="mx-auto h-10 w-10 text-primary lg:h-12 lg:w-12"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold lg:text-2xl">
                  Let's Build Something Amazing Together
                </h3>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground lg:text-base">
                  Whether you have a project in mind, want to collaborate, or just
                  want to say hello, I'm always excited to connect with fellow
                  developers and potential clients.
                </p>
                <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row lg:mt-6 lg:gap-4">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <a href={`mailto:${PROFILE.email}`}>
                      <Mail
                        className="mr-2 h-4 w-4 lg:h-5 lg:w-5"
                        aria-hidden="true"
                      />
                      Send Email
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <a
                      href={LINKEDIN.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin
                        className="mr-2 h-4 w-4 lg:h-5 lg:w-5"
                        aria-hidden="true"
                      />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Contacts);
