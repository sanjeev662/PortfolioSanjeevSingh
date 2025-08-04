import React from "react";
import "./Projects.css";
import ProjectCard from "./ProjectCard";

import { Container, Row, Col } from "react-bootstrap";

import toletp from "../../Assets/Projects/to-let-mern-app.png";
import amazonp from "../../Assets/Projects/amazon-app.png";
import chatp from "../../Assets/Projects/chat-app.png";
import routefinderp from "../../Assets/Projects/routefinder-app.png";

import blogp from "../../Assets/Projects/blog-app.png";
import todop from "../../Assets/Projects/todo-app.png";
import newsp from "../../Assets/Projects/news-app.png";
import weatherp from "../../Assets/Projects/weather-app.png";

import feedbackp from "../../Assets/Projects/feedback-app.png";
import heritagep from "../../Assets/Projects/heritage-app.png";
import shoppingp from "../../Assets/Projects/shopping-app.png";
import thankup from "../../Assets/Projects/thanku-app.png";


function Projects(props) {
  const projectlist = [
    {
      title: "To-Let (RoomOnRent)",
      imgUrl: toletp,
      demoUrl: "https://to-let-room-on-rent.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/ToLet-RoomOnRent",
      description:
        "App eliminates door-to-door room search problem. Users can search, book and save properties, and owners can post. Integrated real-time chat for seamless user-owner communication. Implemented Google Maps for precise room location.",
      skills: "MERN ReactJS NodeJS Chat GoogleMap Socket.io",
    },
    {
      title: "Route-Finder-Application",
      imgUrl: routefinderp, // Using weather app image as placeholder
      demoUrl: "https://route-finder-app.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/Route-Finder-Application",
      description:
        "Built a Route Directions App that offers personalized walking routes for fitness enthusiasts, helping users explore new areas and avoid routine paths based on their specified location and distance. Utilized Google Maps API with 99% accuracy.",
      skills: "ReactJs NodeJs MongoDB GoogleMap API",
    },
    {
      title: "Amazon-Clone-App",
      imgUrl: amazonp,
      demoUrl: "https://amazon-clone-app-ytbo.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/Amazon-Clone-App",
      description:
        "This is a MERN project with functionality like login-logout by authentication, add to cart items, remove from cart, responsiveness etc. Extensive MERN stack Amazon clone with secure user authentication and efficient cart handling.",
      skills: "MERN React NodeJs Authentication",
    },
    {
      title: "Chat-App",
      imgUrl: chatp,
      demoUrl: "https://clone-chat-app-5h0j.onrender.com",
      codeUrl: "https://github.com/sanjeev662/Clone-Chat-App",
      description:
        "It is Chat app beta version with basic functionality like Authorization, one to one and group chat using MERN stack and with the help of socket.IO for real-time communication.",
      skills: "React NodeJs socket.IO MERN",
    },
    {
      title: "Blog-App",
      imgUrl: blogp,
      demoUrl: "https://blogapp-gilt-three.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/blog_app",
      description:
        "Using this blog app users can write blog entries and they also can post pictures. Cloudinary used for file uploading and storing. Complete blogging platform with image upload capabilities.",
      skills: "Cloudinary Multer React NodeJs",
    },
    {
      title: "ToDo-List",
      imgUrl: todop,
      demoUrl: "https://to-do-list-valf.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/ToDoList",
      description:
        "My personal todo page build with Node.js and CSS which takes the content from user and store it using mongoDB database. Supports full CRUD operations with persistent storage.",
      skills: "EJS NodeJs MongoDB CRUD",
    },
    {
      title: "News-App",
      imgUrl: newsp,
      demoUrl: "https://github.com/sanjeev662/newsapp",
      codeUrl: "https://github.com/sanjeev662/newsapp",
      description:
        "Web app for category wise news by fetching data from newsapi. Real-time news updates with category filtering and responsive design.",
      skills: "React News-API JavaScript",
    },
    {
      title: "Weather-App",
      imgUrl: weatherp,
      demoUrl: "https://weather-app-sanjeev662.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/weather-app",
      description:
        "Weather Forecasting application, built using ReactJS. This app provides real-time weather information for any location, using the OpenWeather API to fetch weather data.",
      skills: "React Weather-API JavaScript",
    },
    { 
      title: "Feedback-System",
      imgUrl: feedbackp,
      demoUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
      codeUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
      description:
        "Two way SQL based full stack feedback system where admin can login to add, remove and update the records of teachers and student can give feedback to the teacher by filling feedback form.",
      skills: "React NodeJs SQL CRUD",
    },   
    {
      title: "Indian-Culture",
      imgUrl: heritagep,
      demoUrl: "https://sanjeev662.github.io/IndianCulture/",
      codeUrl: "https://github.com/sanjeev662/IndianCulture",
      description:
        "It's just a way, as a developer to show Exhibition the diversity of Indian culture and heritage. In this basic tools HTML CSS are used to showcase cultural elements.",
      skills: "HTML CSS JavaScript UI",
    },
    {
      title: "Shopping-App",
      imgUrl: shoppingp,
      demoUrl: "https://sanjeev662.github.io/onlineshop.github.io/",
      codeUrl: "https://github.com/sanjeev662/onlineshop.github.io",
      description:
        "This is my basic beginner level shopping site in this basic tools like HTML CSS are used. This site is fully responsive for portrait mode too with modern UI design.",
      skills: "HTML CSS JavaScript UI",
    }, 
    {
      title: "Thanku-Card",
      imgUrl: thankup,
      demoUrl: "https://sanjeev662.github.io/thankugreetingcard/",
      codeUrl: "https://github.com/sanjeev662/thankugreetingcard",
      description:
        "It's just a way, as a developer to thank you my friends for my birthday wishes, only by putting there roll no. which is between 133 to 198. Interactive greeting card with personalized messages.",
      skills: "HTML CSS JavaScript UI",
    }, 
  ];

  return (
    <div>
      <Container fluid className="project-section ">
        <Container>
          <Row>
            <Col
              md={12}
              className="project-description d-flex justify-content-start"
              style={{height:"70px"}}
            >
              <div className="row">
                <div className="section-title padd-15">
                  <h2>Projects</h2>
                </div>
              </div>
            </Col>

            <Col md={12} className="mt-3">
              <Row className="g-4">
                {projectlist.map((element) => {
                  return (
                    <Col md={3}>
                      <ProjectCard
                        title={element.title}
                        imgUrl={element.imgUrl}
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
      </Container>
    </div>
  );
}

export default Projects;
