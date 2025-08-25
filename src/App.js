import React, { Suspense, lazy, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
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

// Optimized page transition variants - reduced duration for performance
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3, // Reduced from 0.5 for snappier transitions
};

// Route component wrapper to reduce re-renders
const RouteWrapper = React.memo(({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
));

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
                    <Route path="/" element={<RouteWrapper><Home /></RouteWrapper>} />
                    <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
                    <Route path="/certificates" element={<RouteWrapper><Certificates /></RouteWrapper>} />
                    <Route path="/contacts" element={<RouteWrapper><Contacts /></RouteWrapper>} />
                    <Route path="/domain" element={<RouteWrapper><Domain /></RouteWrapper>} />
                    <Route path="/projects" element={<RouteWrapper><Projects /></RouteWrapper>} />
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
