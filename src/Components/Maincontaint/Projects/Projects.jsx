import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  FolderOpen, 
  Filter, 
  Search,
  Grid3X3,
  List,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Code
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";
import { useIntersectionObserver } from "../../../lib/utils";
import ProjectCard from "./ProjectCard";

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

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { ref, hasIntersected } = useIntersectionObserver();

  const projectlist = [
    {
      title: "To-Let (RoomOnRent)",
      imgUrl: toletp,
      demoUrl: "https://to-let-room-on-rent.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/ToLet-RoomOnRent",
      description: "App eliminates door-to-door room search problem. Users can search, book and save properties, and owners can post. Integrated real-time chat for seamless user-owner communication. Implemented Google Maps for precise room location.",
      skills: ["MERN", "React.js", "Node.js", "Socket.io", "Google Maps"],
      category: "Full Stack",
      featured: true,
      year: "2024"
    },
    {
      title: "Route-Finder Application",
      imgUrl: routefinderp,
      demoUrl: "https://route-finder-app.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/Route-Finder-Application",
      description: "Built a Route Directions App that offers personalized walking routes for fitness enthusiasts, helping users explore new areas and avoid routine paths based on their specified location and distance. Utilized Google Maps API with 99% accuracy.",
      skills: ["React.js", "Node.js", "MongoDB", "Google Maps API"],
      category: "Full Stack",
      featured: true,
      year: "2024"
    },
    {
      title: "Amazon Clone App",
      imgUrl: amazonp,
      demoUrl: "https://amazon-clone-app-ytbo.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/Amazon-Clone-App",
      description: "This is a MERN project with functionality like login-logout by authentication, add to cart items, remove from cart, responsiveness etc. Extensive MERN stack Amazon clone with secure user authentication and efficient cart handling.",
      skills: ["MERN", "React.js", "Node.js", "Authentication"],
      category: "E-commerce",
      featured: true,
      year: "2023"
    },
    {
      title: "Real-time Chat App",
      imgUrl: chatp,
      demoUrl: "https://clone-chat-app-5h0j.onrender.com",
      codeUrl: "https://github.com/sanjeev662/Clone-Chat-App",
      description: "It is Chat app beta version with basic functionality like Authorization, one to one and group chat using MERN stack and with the help of socket.IO for real-time communication.",
      skills: ["React.js", "Node.js", "Socket.IO", "MERN"],
      category: "Real-time App",
      featured: true,
      year: "2023"
    },
    {
      title: "Blog Application",
      imgUrl: blogp,
      demoUrl: "https://blogapp-gilt-three.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/blog_app",
      description: "Using this blog app users can write blog entries and they also can post pictures. Cloudinary used for file uploading and storing. Complete blogging platform with image upload capabilities.",
      skills: ["Cloudinary", "Multer", "React.js", "Node.js"],
      category: "Full Stack",
      featured: false,
      year: "2023"
    },
    {
      title: "ToDo List Manager",
      imgUrl: todop,
      demoUrl: "https://to-do-list-valf.onrender.com/",
      codeUrl: "https://github.com/sanjeev662/ToDoList",
      description: "My personal todo page build with Node.js and CSS which takes the content from user and store it using mongoDB database. Supports full CRUD operations with persistent storage.",
      skills: ["EJS", "Node.js", "MongoDB", "CRUD"],
      category: "Web App",
      featured: false,
      year: "2023"
    },
    {
      title: "News Application",
      imgUrl: newsp,
      demoUrl: "https://github.com/sanjeev662/newsapp",
      codeUrl: "https://github.com/sanjeev662/newsapp",
      description: "Web app for category wise news by fetching data from newsapi. Real-time news updates with category filtering and responsive design.",
      skills: ["React.js", "News API", "JavaScript"],
      category: "Frontend",
      featured: false,
      year: "2023"
    },
    {
      title: "Weather Forecast App",
      imgUrl: weatherp,
      demoUrl: "https://weather-app-sanjeev662.vercel.app/",
      codeUrl: "https://github.com/sanjeev662/weather-app",
      description: "Weather Forecasting application, built using ReactJS. This app provides real-time weather information for any location, using the OpenWeather API to fetch weather data.",
      skills: ["React.js", "Weather API", "JavaScript"],
      category: "Frontend",
      featured: false,
      year: "2023"
    },
    { 
      title: "Student Feedback System",
      imgUrl: feedbackp,
      demoUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
      codeUrl: "https://github.com/sanjeev662/StudentFeedbackManagementSystem",
      description: "Two way SQL based full stack feedback system where admin can login to add, remove and update the records of teachers and student can give feedback to the teacher by filling feedback form.",
      skills: ["React.js", "Node.js", "SQL", "CRUD"],
      category: "Full Stack",
      featured: false,
      year: "2023"
    },   
    {
      title: "Indian Culture Heritage",
      imgUrl: heritagep,
      demoUrl: "https://sanjeev662.github.io/IndianCulture/",
      codeUrl: "https://github.com/sanjeev662/IndianCulture",
      description: "It's just a way, as a developer to show Exhibition the diversity of Indian culture and heritage. In this basic tools HTML CSS are used to showcase cultural elements.",
      skills: ["HTML", "CSS", "JavaScript", "UI Design"],
      category: "Frontend",
      featured: false,
      year: "2022"
    },
    {
      title: "Online Shopping Site",
      imgUrl: shoppingp,
      demoUrl: "https://sanjeev662.github.io/onlineshop.github.io/",
      codeUrl: "https://github.com/sanjeev662/onlineshop.github.io",
      description: "This is my basic beginner level shopping site in this basic tools like HTML CSS are used. This site is fully responsive for portrait mode too with modern UI design.",
      skills: ["HTML", "CSS", "JavaScript", "UI Design"],
      category: "Frontend",
      featured: false,
      year: "2022"
    }, 
    {
      title: "Thank You Greeting Card",
      imgUrl: thankup,
      demoUrl: "https://sanjeev662.github.io/thankugreetingcard/",
      codeUrl: "https://github.com/sanjeev662/thankugreetingcard",
      description: "It's just a way, as a developer to thank you my friends for my birthday wishes, only by putting there roll no. which is between 133 to 198. Interactive greeting card with personalized messages.",
      skills: ["HTML", "CSS", "JavaScript", "UI Design"],
      category: "Frontend",
      featured: false,
      year: "2022"
    }, 
  ];

  const categories = ["All", "Full Stack", "Frontend", "E-commerce", "Real-time App", "Web App"];

  const filteredProjects = projectlist.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Projects - Sanjeev Kumar Singh | Full Stack Developer Portfolio</title>
        <meta name="description" content="Explore Sanjeev Kumar Singh's portfolio of full-stack web applications, including MERN stack projects, real-time applications, and modern web solutions." />
        <meta name="keywords" content="Sanjeev Singh Projects, Full Stack Projects, MERN Stack, React Projects, Node.js Applications, Web Development Portfolio" />
      </Helmet>

      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <h2 className="text-2xl md:text-3xl font-bold gradient-text">My Projects</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A showcase of my technical skills and creativity through various web applications and software solutions
              </p>
            </motion.div>

            {/* Filters and Search */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                    />
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="transition-all duration-200"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {projectlist.length} projects
                </div>
              </GlassCard>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard 
                    {...project}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or category filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {projectlist.length}
                    </div>
                    <div className="text-muted-foreground">Total Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {projectlist.filter(p => p.featured).length}
                    </div>
                    <div className="text-muted-foreground">Featured Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {categories.length - 1}
                    </div>
                    <div className="text-muted-foreground">Categories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {new Set(projectlist.flatMap(p => p.skills)).size}
                    </div>
                    <div className="text-muted-foreground">Technologies Used</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Projects;
