import React from "react";
import { Link } from "react-router-dom";
import "./HomeProjects.css";
import ProjectCard from "./HomeProjectCard";

import { Container, Row, Col } from "react-bootstrap";

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
    <div>
        <Container fluid className="project-section-h">
        <Container>
          <Row>
            
            <Col
              md={12}
              className="project-description d-flex justify-content-start"
            >
              <div className="row">
                <div className="section-title mb-2">
                  <h2>Projects</h2>
                </div>
              </div>
            </Col>

            <Col md={12} className="mt-3">
              <Row className="g-4">
                {projectlist.map((element) => {
                  return (
                    <Col md={4}>
                      <ProjectCard
                        title={element.title}
                        imgUrl={element.imgUrl}
                        uTubeUrl={element.uTubeUrl}
                        demoUrl={element.demoUrl}
                        codeUrl={element.codeUrl}
                        description={element.description}
                        skills={element.skills}
                      />

                      {/* here first title is for passing value as props and second
                            title for extracting value from given array data */}
                    </Col>
                  );
                })}
              </Row>
            </Col>


          </Row>
          </Container>
        <Row className="row" style={{ justifyContent:"center" , padding:"50px" }} >               
                  <Link to="/projects" className="btn" style={{ maxWidth:"87%" }}>View More Projects..</Link>
        </Row>
        </Container>
    </div>
  );
}

export default Projects;
