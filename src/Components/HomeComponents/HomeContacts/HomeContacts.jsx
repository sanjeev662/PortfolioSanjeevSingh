import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Form from "./Form";
import "./HomeContacts.css";

function Contacts() {
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "sanjeevsinghkaushik662@gmail.com",
      link: "mailto:sanjeevsinghkaushik662@gmail.com"
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+91 6392XXXXXX",
      link: "tel:+916392XXXXXX"
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Ballia, Uttar Pradesh, India",
      link: null
    }
  ];

  return (
    <section className="home-contacts-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <p>Let's discuss your next project or opportunity</p>
        </motion.div>

        <div className="contacts-content">
          <motion.div 
            className="contact-info-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Contact Information</h3>
            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h4>{info.label}</h4>
                    {info.link ? (
                      <a href={info.link} className="contact-link">
                        {info.value}
                      </a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Form />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
