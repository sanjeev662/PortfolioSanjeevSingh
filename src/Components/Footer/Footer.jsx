import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Code, Coffee, Heart, Quote } from "lucide-react";

import { FOOTER_SOCIAL_LINKS, NAV_ITEMS, PROFILE, getIcon } from "../../data";
import { getRandomQuote } from "../../constants/codingQuotes";

function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  // Picked once. The old code seeded state with a quote and then immediately
  // replaced it from a mount effect, so the first pick was always wasted.
  const [currentQuote] = useState(getRandomQuote);

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    },
  };

  return (
    <footer className="border-t border-border/50 bg-gradient-to-t from-accent/10 to-background">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Branding */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center sm:text-left"
          >
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
              <Code className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="gradient-text text-lg font-bold">{PROFILE.shortName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafted with{" "}
              <Heart className="inline h-4 w-4 text-red-500" aria-hidden="true" /> and lots
              of <Coffee className="inline h-4 w-4 text-amber-600" aria-hidden="true" />
            </p>
          </motion.div>

          {/* Quick links — same NAV_ITEMS the navbar uses, so they can't drift */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
            className="text-center sm:text-left"
          >
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h2>
            <nav aria-label="Footer">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="focus-ring inline-flex min-h-[36px] items-center rounded-md py-1 text-sm text-muted-foreground transition-colors hover:text-primary [@media(pointer:coarse)]:min-h-[44px]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            className="text-center sm:text-left"
          >
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h2>
            <ul className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {FOOTER_SOCIAL_LINKS.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <li key={social.id}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors duration-300 ${social.color}`}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Copyright */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
            className="text-center sm:text-left md:text-right"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} {PROFILE.shortName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">All rights reserved</p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 border-t border-border/50 pt-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center">
              <Quote className="mr-2 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Developer Wisdom
              </span>
            </div>
            <blockquote className="mb-2 text-sm font-medium italic leading-relaxed text-foreground md:text-base">
              "{currentQuote.quote}"
            </blockquote>
            <cite className="text-xs font-semibold not-italic text-muted-foreground">
              — {currentQuote.author}
            </cite>
            <div className="mt-4 border-t border-border/30 pt-4">
              <p className="text-xs text-muted-foreground">
                Debugged with patience, deployed with pride • Refresh for new wisdom
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
