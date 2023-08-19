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
                Hi! My name is Sanjeev Singh. I'm a very dedicated and
                hardworking person who always thrives working on end-to-end
                products. With my experience and knowledge, I learn many skills
                and make many successful projects. I enjoyed every step of
                creation, learning, development, and collaboration.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="personal-info padd-15">
              <div className="row">
                <div className="info-item padd-15">
                  <p>
                    Degree Persuing: <span> B-Tech I.T </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    Graduation Year: <span> 2024 </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    Age: <span> 21 </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    City: <span> Ballia (U.P) </span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    E-mail: <span>sanjeevsinghkaushik662@gmail.com</span>
                  </p>
                </div>
                <div className="info-item padd-15">
                  <p>
                    FreeLance / Intern: <span> Available </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="buttons">
                  <a
                    href="https://drive.google.com/file/d/1z1P7g1AcfjWl8TCElfa7aMlEmZvJnkX0/view?usp=sharing"
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
                  <h5>Front End(Bootstrap, React, and Javascript)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "70%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Back End(NodeJs, Express, SQL, MongoDB, ...)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "80%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Data Structure and Algorithm</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="skill-items padd-15">
                  <h5>Competitive Programming</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
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
                        <i className="fa fa-calendar" aria-hidden="true" /> 2020
                        - Present
                      </h6>
                      <h4 className="timeline-title">
                        Bachelor of Technology in Information Technology
                      </h4>
                      <p className="timeline-text">
                        Currently, I am a Pre Final undergraduate at{" "}
                        <a
                          href="http://csjmu.ac.in/school-of-engineering-and-technology"
                          target="_blank"
                        >
                          <span>UIET CSJM University Kanpur</span>
                        </a>{" "}
                        , here I am studying Information Technology to pursuing
                        my technical degree in the subject of Engineering.{" "}
                      </p>
                    </div>
                    {/* Item 2 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> 2012
                        - 2019
                      </h6>
                      <h4 className="timeline-title">
                        Primary and Secondary Education
                      </h4>
                      <p className="timeline-text">
                        I have completed all my higher and secondary from{" "}
                        <a href="https://nagajimaldepur.in/" target="_blank">
                          <span>
                            Naga Ji Saraswati Vidya Mandir Senior Secondary
                            School, Maldepur - Ballia
                          </span>
                        </a>{" "}
                        through CBSE Board with my subjects of P.C.M &amp;
                        Sanskrit.{" "}
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
                        <i className="fa fa-calendar" aria-hidden="true" /> Apr
                        2023 - Jun 2023
                      </h6>
                      <h4 className="timeline-title">
                        Rise Higher Education Inc
                      </h4>
                      <p className="timeline-text">
                        <a
                          href="https://drive.google.com/file/d/11-jxusAkYH0Laxa4OXAXfuSmHCXtVNJU/view"
                          target="_blank"
                        >
                          <span> Full stack devlopment intern </span>
                        </a>{" "}
                        <br />
                        • Collaborating with cross-functional teams to design ,
                        develop , and deploy applications from end-to-end using
                        node js and react js <br />• Responsibilities:
                        Implementing databases , developing RESTful APIs ,
                        deploying applications on cloud platform .{" "}
                      </p>
                    </div>
                    {/* Item 2 */}
                    <div className="timeline-item">
                      <div className="circle-dot" />
                      <h6 className="timeline-date">
                        <i className="fa fa-calendar" aria-hidden="true" /> Jun
                        2022 - Aug 2022
                      </h6>
                      <h4 className="timeline-title">The Sparks Foundation</h4>
                      <p className="timeline-text">
                        <a
                          href="https://truecertificates.com/verified/E979FNMVBQ"
                          target="_blank"
                        >
                          <span>Web Devlopment Intern</span>
                        </a>{" "}
                        <br />
                        • In this internship I got opprtunity to perform
                        different projects , test my skills , and learn new
                        concepts
                        <br />• I have completed this internship using frontend
                        skills like html5 , css3 , javascript , react.js and
                        backend node.js , mongodb .
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
