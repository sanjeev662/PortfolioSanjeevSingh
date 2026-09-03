/**
 * Single source of truth for the project list.
 *
 * Consumed by BOTH the full Projects page and the homepage teaser section.
 * Do NOT re-declare project arrays inside a component body — that is exactly the
 * duplication this module exists to remove. Import PROJECTS / FEATURED_PROJECTS
 * / PROJECT_CATEGORIES instead.
 *
 * Content is the union of Projects.jsx (source of truth) and HomeProjects.jsx
 * (which only contributed the `uTubeUrl` demo videos).
 */

import toletImg from "../Components/Assets/Projects/to-let-mern-app.webp";
import routefinderImg from "../Components/Assets/Projects/routefinder-app.webp";
import amazonImg from "../Components/Assets/Projects/amazon-app.webp";
import chatImg from "../Components/Assets/Projects/chat-app.webp";
import blogImg from "../Components/Assets/Projects/blog-app.webp";
import todoImg from "../Components/Assets/Projects/todo-app.webp";
import newsImg from "../Components/Assets/Projects/news-app.webp";
import weatherImg from "../Components/Assets/Projects/weather-app.webp";
import feedbackImg from "../Components/Assets/Projects/feedback-app.webp";
import heritageImg from "../Components/Assets/Projects/heritage-app.webp";
import shoppingImg from "../Components/Assets/Projects/shopping-app.webp";
import thankuImg from "../Components/Assets/Projects/thanku-app.webp";

export const PROJECTS = [
  {
    id: "to-let-room-on-rent",
    title: "To-Let (RoomOnRent)",
    image: toletImg,
    demoUrl: "https://to-let-room-on-rent.vercel.app/",
    codeUrl: "https://github.com/sanjeev662/ToLet-RoomOnRent",
    uTubeUrl: "https://www.youtube.com/embed/0Esg-oJse-c",
    description:
      "A property platform where renters search, save and book listings and owners manage their own. Secured with JWT authentication plus OAuth 2.0 social sign-in, real-time tenant-to-owner chat over Socket.io, and map-based discovery that filters properties by geographic area using Google Maps.",
    skills: ["MERN", "React.js", "Node.js", "WebSocket", "JWT", "OAuth", "Google Maps"],
    category: "Full Stack",
    featured: true,
    year: "2024",
  },
  {
    id: "route-finder",
    title: "Route-Finder Application",
    image: routefinderImg,
    demoUrl: "https://route-finder-app.vercel.app/",
    codeUrl: "https://github.com/sanjeev662/Route-Finder-Application",
    description:
      "Built a Route Directions App that offers personalized walking routes for fitness enthusiasts, helping users explore new areas and avoid routine paths based on their specified location and distance. Utilized Google Maps API with 99% accuracy.",
    skills: ["React.js", "Node.js", "MongoDB", "Google Maps API"],
    category: "Full Stack",
    featured: true,
    year: "2024",
  },
  {
    id: "amazon-clone",
    title: "Amazon Clone App",
    image: amazonImg,
    demoUrl: "https://amazon-clone-app-ytbo.onrender.com/",
    codeUrl: "https://github.com/sanjeev662/Amazon-Clone-App",
    uTubeUrl: "https://www.youtube.com/embed/35JEg51Fkuw",
    description:
      "This is a MERN project with functionality like login-logout by authentication, add to cart items, remove from cart, responsiveness etc. Extensive MERN stack Amazon clone with secure user authentication and efficient cart handling.",
    skills: ["MERN", "React.js", "Node.js", "Authentication"],
    category: "E-commerce",
    featured: true,
    year: "2023",
  },
  {
    id: "realtime-chat-app",
    title: "Real-time Chat App",
    image: chatImg,
    demoUrl: "https://clone-chat-app-5h0j.onrender.com",
    codeUrl: "https://github.com/sanjeev662/Clone-Chat-App",
    uTubeUrl: "https://www.youtube.com/embed/L-XgmT3mwc8",
    description:
      "It is Chat app beta version with basic functionality like Authorization, one to one and group chat using MERN stack and with the help of socket.IO for real-time communication.",
    skills: ["React.js", "Node.js", "Socket.IO", "MERN"],
    category: "Real-time App",
    featured: true,
    year: "2023",
  },
  {
    id: "blog-app",
    title: "Blog Application",
    image: blogImg,
    demoUrl: "https://blogapp-gilt-three.vercel.app/",
    codeUrl: "https://github.com/sanjeev662/blog_app",
    description:
      "Using this blog app users can write blog entries and they also can post pictures. Cloudinary used for file uploading and storing. Complete blogging platform with image upload capabilities.",
    skills: ["Cloudinary", "Multer", "React.js", "Node.js"],
    category: "Full Stack",
    featured: false,
    year: "2023",
  },
  {
    id: "todo-list-manager",
    title: "ToDo List Manager",
    image: todoImg,
    demoUrl: "https://to-do-list-valf.onrender.com/",
    codeUrl: "https://github.com/sanjeev662/ToDoList",
    description:
      "My personal todo page build with Node.js and CSS which takes the content from user and store it using mongoDB database. Supports full CRUD operations with persistent storage.",
    skills: ["EJS", "Node.js", "MongoDB", "CRUD"],
    category: "Web App",
    featured: false,
    year: "2023",
  },
  {
    id: "news-app",
    title: "News Application",
    image: newsImg,
    demoUrl: "https://github.com/sanjeev662/newsapp",
    codeUrl: "https://github.com/sanjeev662/newsapp",
    description:
      "Web app for category wise news by fetching data from newsapi. Real-time news updates with category filtering and responsive design.",
    skills: ["React.js", "News API", "JavaScript"],
    category: "Frontend",
    featured: false,
    year: "2023",
  },
  {
    id: "weather-forecast-app",
    title: "Weather Forecast App",
    image: weatherImg,
    demoUrl: "https://weather-app-sanjeev662.vercel.app/",
    codeUrl: "https://github.com/sanjeev662/weather-app",
    description:
      "Weather Forecasting application, built using ReactJS. This app provides real-time weather information for any location, using the OpenWeather API to fetch weather data.",
    skills: ["React.js", "Weather API", "JavaScript"],
    category: "Frontend",
    featured: false,
    year: "2023",
  },
  {
    id: "student-feedback-system",
    title: "Student Feedback System",
    image: feedbackImg,
    demoUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
    codeUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
    description:
      "Two way SQL based full stack feedback system where admin can login to add, remove and update the records of teachers and student can give feedback to the teacher by filling feedback form.",
    skills: ["React.js", "Node.js", "SQL", "CRUD"],
    category: "Full Stack",
    featured: false,
    year: "2023",
  },
  {
    id: "indian-culture-heritage",
    title: "Indian Culture Heritage",
    image: heritageImg,
    demoUrl: "https://sanjeev662.github.io/IndianCulture/",
    codeUrl: "https://github.com/sanjeev662/IndianCulture",
    description:
      "It's just a way, as a developer to show Exhibition the diversity of Indian culture and heritage. In this basic tools HTML CSS are used to showcase cultural elements.",
    skills: ["HTML", "CSS", "JavaScript", "UI Design"],
    category: "Frontend",
    featured: false,
    year: "2022",
  },
  {
    id: "online-shopping-site",
    title: "Online Shopping Site",
    image: shoppingImg,
    demoUrl: "https://sanjeev662.github.io/onlineshop.github.io/",
    codeUrl: "https://github.com/sanjeev662/onlineshop.github.io",
    description:
      "This is my basic beginner level shopping site in this basic tools like HTML CSS are used. This site is fully responsive for portrait mode too with modern UI design.",
    skills: ["HTML", "CSS", "JavaScript", "UI Design"],
    category: "Frontend",
    featured: false,
    year: "2022",
  },
  {
    id: "thank-you-greeting-card",
    title: "Thank You Greeting Card",
    image: thankuImg,
    demoUrl: "https://sanjeev662.github.io/thankugreetingcard/",
    codeUrl: "https://github.com/sanjeev662/thankugreetingcard",
    description:
      "It's just a way, as a developer to thank you my friends for my birthday wishes, only by putting there roll no. which is between 133 to 198. Interactive greeting card with personalized messages.",
    skills: ["HTML", "CSS", "JavaScript", "UI Design"],
    category: "Frontend",
    featured: false,
    year: "2022",
  },
];

/**
 * Filter chips for the Projects page. Derived from the data so a new project
 * with a new category cannot silently fall out of the filter bar.
 * "All" is always first.
 */
export const PROJECT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((project) => project.category))),
];

/** The homepage teaser row. Order follows PROJECTS. */
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

/** Distinct technology tags across every project — used for the stats row. */
export const PROJECT_SKILL_COUNT = new Set(
  PROJECTS.flatMap((project) => project.skills)
).size;
