import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// The one contact form in the app — this teaser used to keep a diverging copy.
import Form from "../../Maincontaint/Contacts/Form";
import { makeReveal, makeStagger, useIntersectionObserver } from "../../../lib/utils";
import { Button } from "../../ui/button";
import SectionHeading from "../../ui/SectionHeading";

function HomeContacts() {
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
              subtitle="Let's connect and discuss how we can work together on your next project"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mx-auto w-full max-w-3xl">
            <Form />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/contacts">
                More ways to reach me
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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

export default React.memo(HomeContacts);
