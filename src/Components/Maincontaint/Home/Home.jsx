import React from "react";
import "./Home.css";
import logo from "../../Assets/Images/me2.png";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import HomeAbout from "../../HomeComponents/HomeAbout/HomeAbout";
import HomeCertificate from "../../HomeComponents/HomeCertificates/HomeCertificates";
import HomeContacts from "../../HomeComponents/HomeContacts/HomeContacts";
import HomeDomain from "../../HomeComponents/HomeDomain/HomeDomain";
import HomeProjets from "../../HomeComponents/HomeProjects/HomeProjects";

function Home() {
  return (
    <div id="Home" className="d-flex flex-column">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div 
            className="hero-avatar"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img src={logo} alt="Sanjeev Singh" className="photo" />
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypeAnimation
              cursor={true}
              sequence={[
                "Sanjeev Kumar Singh",
                2000,
                "Full-Stack Developer",
                2000,
                "Problem Solver",
                2000,
                "Tech Enthusiast",
                2000
              ]}
              wrapper="span"
              repeat={Infinity}
              speed={50}
            />
          </motion.h1>

          <motion.h5 
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting Digital Experiences with Code & Creativity
          </motion.h5>

          <motion.p 
            className="hero-description"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate Full-Stack Developer with expertise in modern web technologies. 
            I build scalable, user-friendly applications that solve real-world problems.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#projects" className="hero-btn hero-btn-primary">
              View My Work
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              Get In Touch
            </a>
          </motion.div>
        </div>
        
        <div className="scroll-indicator"></div>
      </section>

      {/* Content Sections */}
      <div className="content-section">
        <HomeAbout />
      </div>
      
      <div className="section-divider"></div>
      
      <div className="content-section">
        <HomeCertificate />
      </div>
      
      <div className="section-divider"></div>
      
      <div className="content-section">
        <HomeProjets />
      </div>
      
      <div className="section-divider"></div>
      
      <div className="content-section">
        <HomeDomain />
      </div>
      
      <div className="section-divider"></div>
      
      <div className="content-section">
        <HomeContacts />
      </div>
    </div>
  );
}

export default Home;
