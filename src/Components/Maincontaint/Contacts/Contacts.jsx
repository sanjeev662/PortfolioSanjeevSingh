import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink 
} from "lucide-react";
import Form from "./Form";
import { useIntersectionObserver } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";

function Contacts() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const socialLinks = [
    {
      icon: Phone,
      label: "Phone",
      href: "tel:950-600-9121",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:sanjeevsinghkaushik662@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sanjeev662/",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/sanjeev662",
      color: "from-gray-700 to-gray-900"
    },
    {
      icon: ExternalLink,
      label: "Stack Overflow",
      href: "https://stackoverflow.com/users/22363267/sanjeev-kumar-singh",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Memoize social links to prevent re-creation
  const memoizedSocialLinks = useMemo(() => socialLinks, []);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced for better performance
        ease: "easeOut",
      },
    },
  }), []);

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-8 lg:space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 lg:space-y-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">Contact Me</h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Ready to start your next project? Let's connect and discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Form />
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 lg:p-8 text-center">
              <div className="space-y-4 lg:space-y-6">
                <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-primary mx-auto" />
                <h3 className="text-xl lg:text-2xl font-bold">Let's Build Something Amazing Together</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base px-4">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'm always excited to connect with fellow developers and potential clients.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center mt-4 lg:mt-6 px-4">
                  <Button variant="gradient" size="lg" className="w-full sm:w-auto" asChild>
                    <a href="mailto:sanjeevsinghkaushik662@gmail.com">
                      <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <a href="https://www.linkedin.com/in/sanjeev662/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
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
