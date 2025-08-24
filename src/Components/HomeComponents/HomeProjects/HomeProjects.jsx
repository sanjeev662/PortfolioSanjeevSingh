import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";

import { Button } from "../../ui/button";
import { useIntersectionObserver } from "../../../lib/utils";
import ProjectCard from "./HomeProjectCard";

import amazonp from "../../Assets/Projects/amazon-app.png";
import chatp from "../../Assets/Projects/chat-app.png";
import bankp from "../../Assets/Projects/bank-app.png";
import toletapp from "../../Assets/Projects/to-let-mern-app.png";

function HomeProjects() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const projectlist = [
    {
      title: "To-Let (RoomOnRent)",
      imgUrl: toletapp,
      uTubeUrl: "https://www.youtube.com/embed/0Esg-oJse-c",
      demoUrl: "https://to-let-room-on-rent.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/ToLet-RoomOnRent",
      description:
        "Explore rental options on our user-friendly platform. From cozy rooms to spacious flats and luxurious hotels, easily filter listings. Navigate property locations with embedded Google Maps. Connect directly with owners, discuss availability, and make decisions using real-time chat. Experience seamless rental search with our feature-rich platform",
      skills: ["React", "Node.js", "MongoDB", "Google Maps", "Socket.IO"],
      category: "Full Stack",
      featured: true,
    },
    {
      title: "Real-time Chat App",
      imgUrl: chatp,
      uTubeUrl: "https://www.youtube.com/embed/L-XgmT3mwc8",
      demoUrl: "https://clone-chat-app-5h0j.onrender.com",
      codeUrl: "https://github.com/sanjeev662/Clone-Chat-App",
      description:
        "A modern chat application with real-time messaging, user authentication, and group chat functionality. Built with MERN stack and Socket.IO for seamless communication experience.",
      skills: ["React", "Node.js", "Socket.IO", "MongoDB"],
      category: "Real-time App",
      featured: true,
    },
    {
      title: "Amazon Clone",
      imgUrl: amazonp,
      uTubeUrl: "https://www.youtube.com/embed/35JEg51Fkuw",
      demoUrl: "https://amazon-clone-app-ytbo.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/Amazon-Clone-App",
      description:
        "A comprehensive e-commerce platform replicating Amazon's core features including user authentication, shopping cart, product catalog, and responsive design for optimal user experience.",
      skills: ["React", "Node.js", "Authentication", "E-commerce"],
      category: "E-commerce",
      featured: false,
    },    
  ];

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
    <section ref={ref} className="section-padding bg-gradient-to-br from-accent/5 via-background to-background">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Showcasing my latest work in full-stack development, real-time applications, and modern web technologies
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-2"
          >
            {projectlist.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeProjects;
