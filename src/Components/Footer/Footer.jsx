import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import {
    AiFillGithub,
    AiFillYoutube,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn,FaFacebookF,FaGoogle } from "react-icons/fa";

function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <Container fluid className="footer">
            <Row>
                <Col md="4" className="footer-copywright">
                    <h3>Designed and Developed by Sanjeev Singh</h3>
                </Col>
                <Col md="4" className="footer-copywright">
                    <h3>Copyright © {year} SS</h3>
                </Col>
                <Col md="4" className="footer-body">
                    <ul className="footer-icons">
                        <li className="social-icons">
                            <a
                                href="https://www.youtube.com/@sscreation101/featured"
                                style={{ textColor: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillYoutube />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://github.com/sanjeev662"
                                style={{ color: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillGithub />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://www.linkedin.com/in/sanjeev662"
                                style={{ color: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedinIn />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://instagram.com/sanjeevsingh_05?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                                style={{ color: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillInstagram />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://www.facebook.com/profile.php?id=100009128253547"
                                style={{ color: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="mailto:sanjeevsinghkaushik662@gmail.com/"
                                 style={{ color: "black" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGoogle />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
