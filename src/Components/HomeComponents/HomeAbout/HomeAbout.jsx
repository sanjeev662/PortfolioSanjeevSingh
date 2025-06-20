import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDownload, FaUser, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import "./HomeAbout.css";

function About() {
  const personalInfo = [
    { label: "Degree Pursuing", value: "B-Tech I.T" },
    { label: "Graduation Year", value: "2024" },
    { label: "Age", value: "21" },
    { label: "City", value: "Ballia (U.P)" },
    { label: "E-mail", value: "sanjeevsinghkaushik662@gmail.com" },
    { label: "Job / Intern", value: "Available" }
  ];

  const skills = [
    { name: "Front End (React, Bootstrap, Javascript, ...)", percentage: 85 },
    { name: "Back End (NodeJs, Express, SQL, MongoDB, ...)", percentage: 82 },
    { name: "Data Structure and Algorithm (Java)", percentage: 82 },
    { name: "Competitive Programming (Java)", percentage: 83 }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>
              I'm Sanjeev Singh and <span className="highlight">Potential Learner (^_^)</span>
            </h3>
            <p>
              Hi! My name is Sanjeev Singh. I'm a very dedicated and
              hardworking person who always thrives working on end-to-end
              products. With my experience and knowledge, I learn many skills
              and make many successful projects. I enjoyed every step of
              creation, learning, development, and collaboration.
            </p>
          </motion.div>

          <motion.div 
            className="about-details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="personal-info-section">
              <h4><FaUser className="section-icon" /> Personal Information</h4>
              <div className="info-grid">
                {personalInfo.map((info, index) => (
                  <div key={index} className="info-item">
                    <span className="info-label">{info.label}:</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                ))}
              </div>
              <div className="action-buttons">
                <motion.a
                  href="https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view"
                  target="_blank"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload /> Download CV
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contacts" className="btn btn-outline">
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="skills-section">
              <h4>Technical Skills</h4>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="skill-header">
                      <h5>{skill.name}</h5>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="timeline-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="timeline-grid">
              <div className="education-timeline">
                <h4><FaGraduationCap className="section-icon" /> Education</h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">2020 - Present</div>
                      <h5>Bachelor of Technology in Information Technology</h5>
                      <p>
                        Currently, I am a Final-year undergraduate at{" "}
                        <a href="http://csjmu.ac.in/school-of-engineering-and-technology" target="_blank" rel="noopener noreferrer">
                          UIET CSJM University Kanpur
                        </a>
                        , here I am studying Information Technology to pursuing
                        my technical degree in the subject of Engineering.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">2012 - 2019</div>
                      <h5>Primary and Secondary Education</h5>
                      <p>
                        I have completed all my higher and secondary from{" "}
                        <a href="https://nagajimaldepur.in/" target="_blank" rel="noopener noreferrer">
                          Naga Ji Saraswati Vidya Mandir Senior Secondary School, Maldepur - Ballia
                        </a>{" "}
                        through CBSE Board with my subjects of P.C.M & Sanskrit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-timeline">
                <h4><FaBriefcase className="section-icon" /> Experience</h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">Jul 2023 - Sep 2023</div>
                      <h5>Fightage Pvt Ltd (Multigrad)</h5>
                      <p>
                        <a href="https://drive.google.com/file/d/1pnetigvEpF4VFIMCwEWomPMKii3Y8rxS/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                          Full stack development intern
                        </a>
                        <br />
                        • Contributing to the domain of full stack web development as a proactive intern.<br />
                        • Taking charge of Node.js and React.js projects, showcasing skills in both frontend and backend technologies.<br />
                        • Collaborating within a team to build and enhance web applications using Figma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
