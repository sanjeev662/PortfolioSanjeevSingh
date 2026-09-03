import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Menu, Moon, Snowflake, Sun, Sunrise, X, Zap } from "lucide-react";

import {
  THEMES,
  THEME_ORDER,
  THEME_SCHEME,
  useTheme,
} from "../../contexts/ThemeContext";
import { NAV_ITEMS } from "../../data";
import { Button } from "../ui/button";
import logo from "../Assets/Images/logo.webp";

// The shared data/icons registry has no Sun/Sunrise/Snowflake, so the theme
// icons are resolved here instead.
const THEME_ICONS = { Sun, Moon, Zap, Sunrise, Snowflake };

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const { theme, setTheme, cycleTheme } = useTheme();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const progressRef = useRef(null);
  const themeRootRef = useRef(null);
  const themeTriggerRef = useRef(null);
  const themeMenuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const ThemeIcon = THEME_ICONS[THEMES[theme]?.icon] || Moon;
  const isDarkScheme = THEME_SCHEME[theme] === "dark";

  // The progress bar is written straight to the DOM as a transform. Putting the
  // percentage in state re-rendered the whole navbar on every scroll event.
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const scrollTop = window.scrollY || 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
      // Only flips twice per page, so React bails out of the rest.
      setScrolled(scrollTop > 50);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Navigating anywhere dismisses both menus.
  useEffect(() => {
    setIsOpen(false);
    setThemeMenuOpen(false);
  }, [location.pathname]);

  /* ---------------- theme picker ---------------- */

  const closeThemeMenu = useCallback(() => {
    setThemeMenuOpen(false);
    if (themeTriggerRef.current) themeTriggerRef.current.focus();
  }, []);

  // Opening lands you on the theme you're already using.
  useEffect(() => {
    if (!themeMenuOpen || !themeMenuRef.current) return;
    const checked = themeMenuRef.current.querySelector('[aria-checked="true"]');
    const target = checked || themeMenuRef.current.querySelector("button");
    if (target) target.focus();
  }, [themeMenuOpen]);

  useEffect(() => {
    if (!themeMenuOpen) return undefined;

    const onPointerDown = (event) => {
      if (themeRootRef.current && !themeRootRef.current.contains(event.target)) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [themeMenuOpen]);

  const handleThemeMenuKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeThemeMenu();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const items = Array.from(themeMenuRef.current.querySelectorAll("button"));
    const current = items.indexOf(document.activeElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = (current + step + items.length) % items.length;
    items[next].focus();
  };

  // Tabbing past the last item should close the menu. Only act when focus moved
  // to a real element: Safari and Firefox on macOS don't focus a button on
  // mousedown, so relatedTarget is null there, and treating that as "focus
  // left" closed the menu before the click landed — silently dropping the theme
  // the user picked. A genuine click outside is already covered by the document
  // mousedown listener below.
  const handleThemeBlur = (event) => {
    const movedTo = event.relatedTarget;
    if (!movedTo) return;
    if (themeRootRef.current && !themeRootRef.current.contains(movedTo)) {
      setThemeMenuOpen(false);
    }
  };

  /* ---------------- mobile menu ---------------- */

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lock the page behind the open menu. Also close if the viewport grows past
  // md, where the toggle is hidden and you'd be stuck scroll-locked.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isOpen]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const first = mobileMenuRef.current
        ? mobileMenuRef.current.querySelector("a")
        : null;
      if (first) first.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  // Escape closes and hands focus back; Tab wraps around inside the menu so it
  // behaves like the modal it visually is.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        if (menuToggleRef.current) menuToggleRef.current.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const links = mobileMenuRef.current
        ? Array.from(mobileMenuRef.current.querySelectorAll("a"))
        : [];
      const stops = [menuToggleRef.current, ...links].filter(Boolean);
      if (stops.length === 0) return;

      const first = stops[0];
      const last = stops[stops.length - 1];
      const inside = stops.indexOf(document.activeElement) !== -1;

      if (event.shiftKey && (document.activeElement === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* First focusable thing on the page. Target is <main> in App.js. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <motion.nav
        initial={prefersReducedMotion ? { opacity: 0 } : { y: -100 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "glass-effect shadow-lg backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Scroll progress */}
        <div
          ref={progressRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo */}
            <Link
              to="/"
              className="focus-ring group flex shrink-0 items-center gap-2 rounded-lg sm:gap-3"
            >
              <motion.img
                src={logo}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                // framer-motion makes anything with whileTap focusable. Nested
                // inside the Link that would make the logo two tab stops, so
                // the animation stays and the tab stop goes to the Link.
                tabIndex={-1}
                className={`h-10 w-10 rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50 ${
                  isDarkScheme ? "bg-white/10 p-1 brightness-0 invert filter" : ""
                }`}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              />
              {/* Hidden below sm, but kept in the a11y tree so the link is never
                  just an unlabelled image. */}
              <span className="gradient-text sr-only text-lg font-bold sm:not-sr-only sm:block">
                Sanjeev Singh
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center space-x-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className="focus-ring rounded-lg"
                  >
                    <motion.div
                      // Same reason as the logo: whileTap would otherwise add a
                      // second tab stop inside every nav Link, so tabbing the
                      // navbar hit "Home, Home, About, About, ...".
                      tabIndex={-1}
                      className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    >
                      {item.label}
                      {isActive &&
                        (prefersReducedMotion ? (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                        ) : (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        ))}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center space-x-2">
              {/* Theme picker */}
              <div className="relative" ref={themeRootRef} onBlur={handleThemeBlur}>
                <Button
                  ref={themeTriggerRef}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-haspopup="menu"
                  aria-expanded={themeMenuOpen}
                  aria-controls={themeMenuOpen ? "theme-menu" : undefined}
                  aria-label={`Colour theme: ${THEMES[theme]?.name || theme}. Choose a theme`}
                  onClick={() =>
                    themeMenuOpen ? closeThemeMenu() : setThemeMenuOpen(true)
                  }
                >
                  <ThemeIcon className="h-5 w-5" aria-hidden="true" />
                </Button>

                <AnimatePresence>
                  {themeMenuOpen && (
                    <motion.div
                      id="theme-menu"
                      ref={themeMenuRef}
                      role="menu"
                      aria-label="Colour theme"
                      onKeyDown={handleThemeMenuKeyDown}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: -8, scale: 0.96 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0, scale: 1 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: -8, scale: 0.96 }
                      }
                      transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                      className="glass-effect absolute right-0 top-full mt-2 w-52 origin-top-right rounded-xl border-border/60 p-1 shadow-xl"
                    >
                      {THEME_ORDER.map((name) => {
                        const isChecked = name === theme;
                        return (
                          <button
                            key={name}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isChecked}
                            onClick={() => {
                              setTheme(name);
                              closeThemeMenu();
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [@media(pointer:coarse)]:min-h-[44px] ${
                              isChecked
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-inset ring-foreground/20"
                              style={{ backgroundColor: THEMES[name].swatch }}
                            />
                            <span className="flex-1 break-words">{THEMES[name].name}</span>
                            {/* Reserved so the rows don't shift when the check moves. */}
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                              {isChecked && <Check className="h-4 w-4" aria-hidden="true" />}
                            </span>
                          </button>
                        );
                      })}

                      <div role="separator" className="my-1 h-px bg-border/70" />

                      {/* The old one-button cycle, kept for anyone who liked it. */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          cycleTheme();
                          closeThemeMenu();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [@media(pointer:coarse)]:min-h-[44px]"
                      >
                        <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span className="flex-1 break-words">Next theme</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile toggle */}
              <Button
                ref={menuToggleRef}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen((open) => !open)}
                className="rounded-full md:hidden"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              ref={mobileMenuRef}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }
              }
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="glass-effect max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 md:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={
                        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.25,
                        delay: prefersReducedMotion ? 0 : index * 0.05,
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`focus-ring flex min-h-[44px] items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer so content doesn't hide behind the fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default React.memo(Navbar);
