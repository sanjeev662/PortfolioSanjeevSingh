import React from "react";
import "./HomeDomain.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";
import icpcc from "../../Assets/Certificates/icpc.jpg";

function Domain() {
  const domains = [
    {
      icon: <FaLaptopCode />,
      title: "Full Stack Development",
      description: "End-to-end web application development",
      details: [
        { label: "Front End Development", tech: "HTML, CSS, Javascript, Bootstrap, React" },
        { label: "Backend Development", tech: "NodeJS, ExpressJS, SQL, MongoDB, APIs" }
      ],
      link: "https://github.com/sanjeev662",
      linkText: "View Projects"
    },
    {
      icon: <FaDatabase />,
      title: "Data Structure and Algorithms",
      description: "Problem solving and algorithmic thinking",
      details: [
        { label: "College-DSA Repo", link: "https://github.com/sanjeev662/DS-JAVA", linkText: "My Codes" },
        { label: "College-OOPS Repo", link: "https://github.com/sanjeev662/OOPS-JAVA", linkText: "My Codes" },
        { label: "Geeks-For-Geeks DSA", link: "https://auth.geeksforgeeks.org/user/sanjeev662", linkText: "My Profile" }
      ]
    },
    {
      icon: <FaCode />,
      title: "Competitive Programming",
      description: "Algorithm competitions and coding challenges",
      details: [
        { label: "CodeChef", link: "https://www.codechef.com/users/sanjeev662", linkText: "sanjeev662" },
        { label: "CodeForces", link: "https://codeforces.com/profile/sanjeev662", linkText: "sanjeev662" },
        { label: "HackerRank", link: "https://www.hackerrank.com/sanjeev662", linkText: "sanjeev662" },
        { label: "ICPC Regionalist'2022", link: icpcc, linkText: "Certificate", isImage: true }
      ]
    }
  ];

  return (
    <section className="domains-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Technical Domains</h2>
          <p>Areas of expertise and specialization</p>
        </motion.div>

        <div className="domains-grid">
          {domains.map((domain, index) => (
            <motion.div 
              key={index}
              className="domain-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="domain-icon">
                {domain.icon}
              </div>
              <h3>{domain.title}</h3>
              <p className="domain-description">{domain.description}</p>
              
              <div className="domain-details">
                {domain.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="detail-item">
                    <strong>{detail.label}:</strong>
                    {detail.link ? (
                      <a 
                        href={detail.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="domain-link"
                      >
                        {detail.linkText}
                        {detail.isImage ? (
                          <img src={detail.link} alt="Certificate" className="certificate-thumbnail" />
                        ) : (
                          <FaExternalLinkAlt />
                        )}
                      </a>
                    ) : (
                      <span>{detail.tech}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {domain.link && (
                <a 
                  href={domain.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="domain-action-link"
                >
                  {domain.linkText} <FaExternalLinkAlt />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="view-more-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/domain" className="btn btn-outline">
            <FaCode /> View All Domains
            <FaExternalLinkAlt />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Domain;