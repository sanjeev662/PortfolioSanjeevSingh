import React from "react";
import { Link } from "react-router-dom";
import "./HomeAbout.css";

function About() {
  return (
    <section className="about section container" style={{ padding: "25px" }}>
      <div className="row">
        <div className="section-title padd-15">
          <h2>About me</h2>
        </div>
      </div>
      <div className="row">
        <div className="about-con padd-15">
          <div className="row">
            <div className="about-text padd-15">
              <h3>
                I'm Sanjeev Singh and <span> Potential Learner (^_^)</span>
              </h3>
              <p>
                Hi! My name is Sanjeev Singh. I'm a passionate Full Stack Developer with expertise in JavaScript, Java, React.js, Node.js, and Spring Boot. I have a strong foundation in Data Structures and Algorithms, and I'm continuously learning and enthusiastic about Open Source development. I enjoy working on end-to-end products and collaborating with teams to build innovative solutions.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="personal-info padd-15">
              <div className="row">
                <div className="info-item padd-15">
                  <p>
                    Degree: <span> B-Tech Information Technology </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    Graduation Year: <span> 2024 </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    Age: <span> 23 </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    City: <span> New Delhi, India </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    E-mail: <span>sanjeevsinghkaushik662@gmail.com</span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    Current Role: <span> Software Development Engineer (SDE) </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="buttons">
                  <a
                    href="https://drive.google.com/file/d/1owTJHwvsvIn8PpVRFsKLpSqQIarMIKe9/view"
                    target="_blank"
                    className="btn"
                  >
                    Download CV
                  </a>
                  <Link
                    to="/contacts"
                    className="btn hire-me"
                    data-section-index={1}
                  >
                    Hire Me
                  </Link>
                </div>
              </div>
            </div>
            <div className="skills padd-15">
              <div className="row">
                <div className="skill-items padd-15">
                  <h5>Frontend (React.js, Next.js, TypeScript, MUI)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "90%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Backend (Node.js, Spring Boot, MySQL, MongoDB)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "88%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Data Structures & Algorithms (Java)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Competitive Programming (Java)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "82%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="education padd-15">
              <h3 className="title">Education</h3>
              <div className="row">
                <div className="timeline-box">
                  <div className="timeline shadow-dark">
                    {/* Item 1 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> November 2020 – June 2024
                      </h6>
                      <h4 className="timeline-title">
                        Bachelor of Technology in Information Technology
                      </h4>
                      <p className="timeline-text">
                        Graduated from{" "}
                        <a
                          href="http://csjmu.ac.in/school-of-engineering-and-technology"
                          target="_blank"
                        >
                          <span>Chhatrapati Shahu Ji Maharaj University, Kanpur</span>
                        </a>{" "}
                        with strong foundation in Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.
                      </p>
                    </div>
                    {/* Item 2 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> 2012 - 2019
                      </h6>
                      <h4 className="timeline-title">
                        Primary and Secondary Education
                      </h4>
                      <p className="timeline-text">
                        Completed higher and secondary education from{" "}
                        <a href="https://nagajimaldepur.in/" target="_blank">
                          <span>
                            Naga Ji Saraswati Vidya Mandir Senior Secondary
                            School, Maldepur - Ballia
                          </span>
                        </a>{" "}
                        through CBSE Board with subjects P.C.M &amp; Sanskrit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="experience padd-15">
              <h3 className="title">Experience</h3>
              <div className="row">
                <div className="timeline-box">
                  <div className="timeline shadow-dark">
                    {/* Item 1 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> July 2024 – Present
                      </h6>
                      <h4 className="timeline-title">
                        Namekart Private Limited - Software Development Engineer (SDE)
                      </h4>
                      <p className="timeline-text">
                        <span>Noida, India</span><br />
                        • Integrated AI-powered assistant using NLP, enabling natural language queries and real-time reports, reducing manual analysis time by 50%<br />
                        • Developed Mailing system for bulk email management and marketing campaigns, achieving 60% increase in customer engagement<br />
                        • Created location tracking system with 99% accuracy, monitoring 100+ daily user movements across 10+ cities<br />
                        • Built data scraping system using puppeteer and cheerio with frontend visualization for operational analysis<br />
                        • Redesigned main dashboard using microfrontend architecture for seamless integration of applications<br />
                        • Tech: Java, Spring Boot, JPA, Microfrontend Architecture, React, Node.js, SQL
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> November 2023 – June 2024
                      </h6>
                      <h4 className="timeline-title">
                        Rydeu Logistics India Pvt. Ltd. - Backend Developer Intern
                      </h4>
                      <p className="timeline-text">
                        <span>Bengaluru, India (Remote)</span><br />
                        • Optimized 20+ critical APIs, reducing average response time from 2s to 1.2s, improving performance by 40%<br />
                        • Engineered KeyCloak authentication system, enhancing security for 100+ users, reducing unauthorized access by 95%<br />
                        • Designed international bank account system, managing 1000+ accounts across 10+ countries with 100% accuracy<br />
                        • Developed automated vendor offer feature, reducing manual effort by 70% and increasing participation by 35%<br />
                        • Integrated Freshwork CRM for customer interaction and email marketing, resulting in 30% increase in lead conversions<br />
                        • Tech: Node.js, PostgreSQL, Sequelize, GitLab, Next.js, Redux, TypeScript, Material UI, Zoho CRM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row morebtn"
        style={{ justifyContent: "center", padding: "50px" }}
      >
        <Link to="/about" className="btn" style={{ maxWidth: "98%" }}>
          View More..
        </Link>
      </div>
    </section>
  );
}

export default About;
