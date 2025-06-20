import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import CertificateCard from "./HomeCertificateCard";
import "./HomeCertificates.css";

import risec from "../../Assets/Certificates/rise.png";
import icpcc from "../../Assets/Certificates/icpc.jpg";
import multigradc from "../../Assets/Certificates/multigrad.png";

function Certificates() {
  const certificatelist = [
    {
      title: "Rise Higher Education Inc",
      imgUrl: risec,
      siteUrl: "https://www.risehighereducation.com/",
      tagline: "Full Stack Development intern"
    },
    {
      title: "ACM-ICPC",
      imgUrl: icpcc,
      siteUrl: "https://icpc.global/",
      tagline: "ICPC 2022 Regionalist"
    },
    {
      title: "Fightage Pvt Ltd (Multigrad)",
      imgUrl: multigradc,
      siteUrl: "https://multigrad.in/",
      tagline: "Full Stack Development Intern"
    },
  ];

  return (
    <section className="certificates-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Certificates & Achievements</h2>
          <p>Recognition of my skills and expertise</p>
        </motion.div>

        <div className="certificates-grid">
          {certificatelist.map((element, index) => (
            <motion.div 
              key={index}
              className="certificate-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <CertificateCard
                title={element.title}
                tagline={element.tagline}
                imgUrl={element.imgUrl}
                siteUrl={element.siteUrl}
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
          <Link to="/certificates" className="btn btn-outline">
            <FaCertificate /> View All Certificates
            <FaExternalLinkAlt />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;
