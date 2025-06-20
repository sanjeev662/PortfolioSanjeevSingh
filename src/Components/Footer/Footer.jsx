import React from "react";
import "./Footer.css";
import {
    AiFillGithub,
    AiFillYoutube,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaFacebookF, FaGoogle, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    
    const socialLinks = [
        {
            name: "YouTube",
            url: "https://www.youtube.com/@sscreation101/featured",
            icon: AiFillYoutube,
            color: "#FF0000"
        },
        {
            name: "GitHub",
            url: "https://github.com/sanjeev662",
            icon: AiFillGithub,
            color: "#333"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/sanjeev662",
            icon: FaLinkedinIn,
            color: "#0077B5"
        },
        {
            name: "Instagram",
            url: "https://instagram.com/sanjeevsingh_05?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D",
            icon: AiFillInstagram,
            color: "#E4405F"
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=100009128253547",
            icon: FaFacebookF,
            color: "#1877F2"
        },
        {
            name: "Email",
            url: "mailto:sanjeevsinghkaushik662@gmail.com/",
            icon: FaGoogle,
            color: "#EA4335"
        }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <motion.div 
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="footer-title">Sanjeev Singh</h3>
                        <p className="footer-description">
                            Full-Stack Developer passionate about creating innovative digital solutions
                        </p>
                    </motion.div>

                    <motion.div 
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="footer-subtitle">Connect With Me</h4>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{ '--social-color': social.color }}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h4 className="footer-subtitle">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div 
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="footer-copyright">
                        <p>
                            © {year} Sanjeev Singh. All rights reserved.
                        </p>
                        <p className="footer-made-with">
                            Made with <FaHeart className="heart-icon" /> by Sanjeev Singh
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;
