import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import CertificateCard from "../../Maincontaint/Certificates/CertificateCard";
import SectionHeading from "../../ui/SectionHeading";
import { Button } from "../../ui/button";
import {
  useIntersectionObserver,
  makeReveal,
  makeStagger,
} from "../../../lib/utils";
import { FEATURED_CERTIFICATES } from "../../../data";

/**
 * Homepage teaser. Renders the SAME CertificateCard as the /certificates page
 * from the SAME data — only the heading copy, the item count and the CTA differ.
 */
function HomeCertificates() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = makeStagger(prefersReducedMotion);
  const itemVariants = makeReveal(prefersReducedMotion);

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
              title="Certificates & Achievements"
              subtitle="Professional certifications and achievements that showcase my expertise and continuous learning"
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CERTIFICATES.map((certificate) => (
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
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/certificates">
                <Award className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
                View All Certificates
                <ArrowRight
                  className="ml-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
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

export default React.memo(HomeCertificates);
