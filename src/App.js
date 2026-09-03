import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

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

// Reduced motion: plain opacity fade, zero travel.
const reducedPageVariants = {
  initial: { opacity: 0, y: 0 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3, // Reduced from 0.5 for snappier transitions
};

const reducedPageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.12,
};

// Route component wrapper to reduce re-renders
const RouteWrapper = React.memo(({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={shouldReduceMotion ? reducedPageVariants : pageVariants}
      transition={shouldReduceMotion ? reducedPageTransition : pageTransition}
    >
      {children}
    </motion.div>
  );
});

/**
 * Resets the scroll position on every navigation. Without this you land
 * mid-page when moving from the bottom of one route to another.
 */
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "auto" defers to the CSS scroll-behavior, and the global
    // prefers-reduced-motion block in index.css forces that to auto (instant).
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
};

const NotFound = () => (
  <section className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
    <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
      Page not found
    </h1>
    <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
      The page you are looking for does not exist or has moved.
    </p>
    <Link
      to="/"
      className="focus-ring mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Back to home
    </Link>
  </section>
);

/**
 * Routes must live in a child of the Router so useLocation() is available.
 * AnimatePresence only fires exit transitions when its direct child's key
 * changes, hence the keyed Suspense boundary around the keyed Routes.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense key={location.pathname} fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteWrapper><Home /></RouteWrapper>} />
          <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
          <Route path="/certificates" element={<RouteWrapper><Certificates /></RouteWrapper>} />
          <Route path="/contacts" element={<RouteWrapper><Contacts /></RouteWrapper>} />
          <Route path="/domain" element={<RouteWrapper><Domain /></RouteWrapper>} />
          <Route path="/projects" element={<RouteWrapper><Projects /></RouteWrapper>} />
          <Route path="*" element={<RouteWrapper><NotFound /></RouteWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

/**
 * Catches render failures — including a lazy() chunk that fails to download
 * after a redeploy — so the user gets a retry card instead of a blank page.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, resetKey: props.resetKey };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Clear the error when the route changes. The navbar sits outside this
  // boundary and stays clickable, so without a reset one failed chunk latched
  // the error card forever: every later navigation updated the URL and the
  // active nav link but still rendered "Something went wrong".
  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey) {
      return { hasError: false, resetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Route failed to render:", error, errorInfo);
    }
  }

  handleRetry() {
    // A rejected lazy() import is cached, so re-rendering alone cannot recover
    // it — the chunk has to be re-requested with a fresh document load.
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="container-custom flex min-h-[60vh] items-center justify-center py-16">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-sm sm:p-8">
            <h1 className="text-xl font-bold text-card-foreground sm:text-2xl">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              This page could not be loaded. Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="focus-ring mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Reload page
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

// Lives inside the Router so it can hand the current path to the boundary,
// which is what lets a stuck error clear when you navigate somewhere else.
const RoutedErrorBoundary = () => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary resetKey={pathname}>
      <AnimatedRoutes />
    </ErrorBoundary>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <div className="min-h-screen bg-background text-foreground">
          <BrowserRouter>
            <ScrollToTopOnNavigate />
            <Navbar />
            {/* Skip-link target (the link itself lives in the Navbar). */}
            <main id="main-content" tabIndex={-1} className="relative focus:outline-none">
              <RoutedErrorBoundary />
            </main>
            <Footer />
            <ScrollToTop />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
