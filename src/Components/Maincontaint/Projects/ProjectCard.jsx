import React, { useState } from "react";
import { FaPlay, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function ProjectCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image-container">
        <img 
          src={props.imgUrl} 
          alt={props.title} 
          className="project-image"
        />
        <div className={`project-overlay ${isHovered ? 'active' : ''}`}>
          <div className="project-actions">
            <motion.a
              href={props.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-demo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay className="btn-icon" />
              <span>Live Demo</span>
            </motion.a>
            <motion.a
              href={props.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="project-btn project-btn-code"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCode className="btn-icon" />
              <span>View Code</span>
            </motion.a>
          </div>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{props.title}</h3>
        
        <p className="project-description">
          {props.description}
        </p>
        
        <div className="project-skills">
          {props.skills.split(' ').map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
