import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import Form from "./Form";
import { useIntersectionObserver } from "../../../lib/utils";

function Contacts() {
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
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Contact Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Let's connect and discuss how we can work together on your next project
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="p-2">
            <Form />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contacts;
