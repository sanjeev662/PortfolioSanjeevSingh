import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoadingSpinner from './Components/ui/LoadingSpinner';
import ScrollToTop from './Components/ui/ScrollToTop';

// Lazy load components for better performance
const Home = lazy(() => import("./Components/Maincontaint/Home/Home"));
const About = lazy(() => import("./Components/Maincontaint/About/About"));
const Certificates = lazy(() => import("./Components/Maincontaint/Certificates/Certificates"));
const Contacts = lazy(() => import("./Components/Maincontaint/Contacts/Contacts"));
const Domain = lazy(() => import("./Components/Maincontaint/Domain/Domain"));
const Projects = lazy(() => import("./Components/Maincontaint/Projects/Projects"));

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <div className="min-h-screen bg-background text-foreground">
          <HashRouter>
            <Navbar />
            <main className="relative">
              <AnimatePresence mode="wait">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Home />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/about" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <About />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/certificates" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Certificates />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/contacts" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Contacts />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/domain" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Domain />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/projects" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Projects />
                        </motion.div>
                      }
                    />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </main>
            <Footer />
            <ScrollToTop />
          </HashRouter>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
