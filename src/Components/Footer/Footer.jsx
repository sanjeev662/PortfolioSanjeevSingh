import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Facebook, 
  Mail,
  Heart,
  Code,
  Coffee,
  Quote
} from "lucide-react";
import { getRandomQuote } from "../../constants/codingQuotes";

const socialLinks = [
  {
    icon: Youtube,
    href: "https://www.youtube.com/@sscreation101/featured",
    label: "YouTube",
    color: "hover:text-red-500"
  },
  {
    icon: Github,
    href: "https://github.com/sanjeev662",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-gray-100"
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sanjeev662",
    label: "LinkedIn",
    color: "hover:text-blue-600"
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/sanjeevsingh_24/",
    label: "Instagram",
    color: "hover:text-pink-500"
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100009128253547",
    label: "Facebook",
    color: "hover:text-blue-500"
  },
  {
    icon: Mail,
    href: "mailto:sanjeevsinghkaushik662@gmail.com",
    label: "Email",
    color: "hover:text-green-500"
  }
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentQuote, setCurrentQuote] = useState(() => getRandomQuote());

  // Get a new random quote on component mount
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  return (
    <footer className="bg-gradient-to-t from-accent/10 to-background border-t border-border/50">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg gradient-text">Sanjeev Singh</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafted with <Heart className="w-4 h-4 inline text-red-500" /> and lots of{" "}
              <Coffee className="w-4 h-4 inline text-amber-600" />
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} Sanjeev Singh
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All rights reserved
            </p>
          </motion.div>
        </div>

        {/* Bottom Section - Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border/50"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center mb-3"
            >
              <Quote className="w-4 h-4 text-primary mr-2" />
              <span className="text-xs font-medium text-primary tracking-wider uppercase">
                Developer Wisdom
              </span>
            </motion.div>
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm md:text-base text-foreground font-medium italic mb-2 leading-relaxed"
            >
              "{currentQuote.quote}"
            </motion.blockquote>
            <motion.cite
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs text-muted-foreground font-semibold not-italic"
            >
              — {currentQuote.author}
            </motion.cite>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 pt-4 border-t border-border/30"
            >
              <p className="text-xs text-muted-foreground">
                Crafted with passion, powered by innovation • Refresh for new wisdom
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
