import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";
import "./HomeProjects.css";
import ProjectCard from "./HomeProjectCard";

import amazonp from "../../Assets/Projects/amazon-app.png";
import chatp from "../../Assets/Projects/chat-app.png";
import bankp from "../../Assets/Projects/bank-app.png";
import feedbackp from "../../Assets/Projects/feedback-app.png";

function Projects() {
  const projectlist = [
    {
      title: "To-Let (RoomOnRent)",
      imgUrl: bankp,
      uTubeUrl: "https://www.youtube.com/embed/0Esg-oJse-c",
      demoUrl: "https://to-let-room-on-rent.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/ToLet-RoomOnRent",
      description:
        "Explore rental options on our user-friendly platform. From cozy rooms to spacious flats and luxurious hotels, easily filter listings. Navigate property locations with embedded Google Maps. Connect directly with owners, discuss availability, and make decisions using real-time chat. Experience seamless rental search with our feature-rich platform",
      skills: "React, NodeJs, MongoDb, Google-Map, Chat, Socket.IO",
    },
    {
      title: "Chat-App",
      imgUrl: chatp,
      uTubeUrl: "https://www.youtube.com/embed/L-XgmT3mwc8",
      demoUrl: "https://clone-chat-app-5h0j.onrender.com",
      codeUrl: "https://github.com/sanjeev662/Clone-Chat-App",
      description:
        "It is Chat app beta version with basic functionality like Authorization, one to one and group chat using MERN stack and with the help of socket.IO .",
      skills: "React, NodeJs, socket.IO",
    },
    {
      title: "Amazon-App",
      imgUrl: amazonp,
      uTubeUrl: "https://www.youtube.com/embed/35JEg51Fkuw",
      demoUrl: "https://amazon-clone-app-ytbo.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/Amazon-Clone-App",
      description:
        "This is a MERN project with functionality like login-logout by authentication add to cart items, remove from cart , responsiveness etc.",
      skills: "React, NodeJs, Authentication",
    },    
  ];

  return (
    <section className="home-projects-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Projects</h2>
          <p>Showcasing my best work and technical expertise</p>
        </motion.div>

        <div className="projects-grid">
          {projectlist.map((element, index) => (
            <motion.div 
              key={index}
              className="project-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectCard
                title={element.title}
                imgUrl={element.imgUrl}
                uTubeUrl={element.uTubeUrl}
                demoUrl={element.demoUrl}
                codeUrl={element.codeUrl}
                description={element.description}
                skills={element.skills}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="view-more-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/projects" className="btn btn-outline">
            <FaCode /> View All Projects
            <FaExternalLinkAlt />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
