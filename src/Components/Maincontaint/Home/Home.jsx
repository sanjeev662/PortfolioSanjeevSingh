import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet-async";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";
import logo from "../../Assets/Images/me2.png";
import HomeAbout from "../../HomeComponents/HomeAbout/HomeAbout";
import HomeCertificate from "../../HomeComponents/HomeCertificates/HomeCertificates";
import HomeContacts from "../../HomeComponents/HomeContacts/HomeContacts";
import HomeDomain from "../../HomeComponents/HomeDomain/HomeDomain";
import HomeProjects from "../../HomeComponents/HomeProjects/HomeProjects";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/sanjeev662",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-gray-100"
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sanjeev662/",
    label: "LinkedIn",
    color: "hover:text-blue-600"
  },
  {
    icon: Mail,
    href: "mailto:sanjeevsinghkaushik662@gmail.com",
    label: "Email",
    color: "hover:text-red-500"
  }
];

function Home() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sanjeev Kumar Singh - Full Stack Developer | Portfolio</title>
        <meta name="description" content="Full Stack Developer specializing in JavaScript, Java, React.js, and Spring Boot. Explore my projects, certificates, and professional journey." />
        <meta name="keywords" content="Sanjeev Singh, Full Stack Developer, JavaScript, Java, React, Spring Boot, Portfolio" />
        <meta property="og:title" content="Sanjeev Kumar Singh - Full Stack Developer" />
        <meta property="og:description" content="Full Stack Developer specializing in JavaScript, Java, React.js, and Spring Boot" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://portfolio-sanjeev-singh.vercel.app/" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
          
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <div className="relative z-10 container-custom section-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2 
                }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.img
                    src={logo}
                    alt="Sanjeev Kumar Singh"
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl ring-4 ring-primary/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              {/* Name with Typing Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-4"
              >
                <TypeAnimation
                  cursor={true}
                  sequence={[
                    "",
                    500,
                    "Hi, I'm Sanjeev Kumar Singh",
                    2000,
                    "Hi, I'm a Full Stack Developer",
                    2000,
                    "Hi, I'm a Problem Solver",
                    2000,
                  ]}
                  wrapper="h1"
                  repeat={Infinity}
                  className="text-2xl md:text-4xl font-bold gradient-text"
                />
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
                >
                  Software Development Engineer (SDE) specializing in{" "}
                  <span className="text-primary font-semibold">Java</span> &{" "}
                  <span className="text-primary font-semibold">JavaScript</span>
                </motion.p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex justify-center space-x-6"
              >
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="group"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Download Resume
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToNext}
                  className="group"
                >
                  Explore My Work
                  <ArrowDown className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToNext}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
            </motion.div>
          </motion.div>
        </section>

        {/* Home Sections */}
        <div className="space-y-20">
          <div id="about-section">
            <HomeAbout />
          </div>
          
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </div>
          
          <HomeCertificate />
          
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </div>
          
          <HomeProjects />
          
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </div>
          
          <HomeDomain />
          
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </div>
          
          <HomeContacts />
        </div>
      </div>
    </>
  );
}

export default Home;
