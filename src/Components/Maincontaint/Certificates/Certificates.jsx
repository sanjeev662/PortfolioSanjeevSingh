import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import CertificateCard from "./CertificateCard";
import SectionHeading from "../../ui/SectionHeading";
import { Button } from "../../ui/button";
import {
  useIntersectionObserver,
  makeReveal,
  makeStagger,
} from "../../../lib/utils";
import { CERTIFICATES } from "../../../data";

// Fifteen cards at once is a wall, so start with nine and let people ask for the rest.
const INITIAL_COUNT = 9;

function Certificates() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const prefersReducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT);

  const containerVariants = makeStagger(prefersReducedMotion);
  const itemVariants = makeReveal(prefersReducedMotion);

  const visible = CERTIFICATES.slice(0, visibleCount);
  const showingAll = visibleCount >= CERTIFICATES.length;

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-background via-background to-accent/5"
    >
      <div className="container-custom max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <SectionHeading
              icon={Award}
              title="Certificates & Achievements"
              subtitle="Professional certifications, internship completions, and competitive programming achievements demonstrating continuous learning and excellence."
            />
          </motion.div>

          {/* Live region so screen readers hear the new count after "Show more". */}
          <motion.p
            variants={itemVariants}
            role="status"
            aria-live="polite"
            className="text-center text-sm text-muted-foreground"
          >
            Showing {visible.length} of {CERTIFICATES.length} certificates
          </motion.p>

          <div
            id="certificates-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((certificate) => (
              <motion.div
                key={certificate.id}
                variants={itemVariants}
                className="h-full"
              >
                <CertificateCard
                  title={certificate.title}
                  tagline={certificate.tagline}
                  image={certificate.image}
                  siteUrl={certificate.siteUrl}
                  year={certificate.year}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              aria-expanded={showingAll}
              aria-controls="certificates-grid"
              onClick={() =>
                setVisibleCount(showingAll ? INITIAL_COUNT : CERTIFICATES.length)
              }
            >
              {showingAll ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  Show fewer
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  Show {CERTIFICATES.length - visibleCount} more
                </>
              )}
            </Button>
          </motion.div>

          {/* Neutral tokens instead of blue-50/blue-950 pairs: `dark:` only fires
              on the dark theme, so hardcoded pairs came out light on midnight
              and obsidian. */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 pt-4 sm:gap-4 md:grid-cols-4"
          >
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
              <div className="mb-1 text-xl font-bold text-primary">15+</div>
              <div className="text-xs text-muted-foreground">Total Certificates</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
              <div className="mb-1 text-xl font-bold text-primary">6+</div>
              <div className="text-xs text-muted-foreground">Internships</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
              <div className="mb-1 text-xl font-bold text-primary">5+</div>
              <div className="text-xs text-muted-foreground">Tech Courses</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
              <div className="mb-1 text-xl font-bold text-primary">3+</div>
              <div className="text-xs text-muted-foreground">Competitions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Certificates);
