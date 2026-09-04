import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const supportsMatchMedia = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"

/**
 * Generic, SSR-safe media query hook.
 * Returns false on the server / before hydration, then syncs on mount.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(() => {
    if (!supportsMatchMedia()) return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    if (!supportsMatchMedia()) return undefined

    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    // Re-sync in case the query changed between render and effect.
    setMatches(mediaQueryList.matches)

    // Safari < 14 only has the deprecated add/removeListener API.
    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", handleChange)
      return () => mediaQueryList.removeEventListener("change", handleChange)
    }

    mediaQueryList.addListener(handleChange)
    return () => mediaQueryList.removeListener(handleChange)
  }, [query])

  return matches
}

/**
 * True when the user asked the OS to reduce motion.
 * framer-motion exports its own hook for motion components — use this one for
 * plain CSS / logic decisions (skipping typewriter effects, autoplay, etc).
 */
export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY)

/**
 * Intersection Observer hook for scroll-triggered reveals.
 *
 * Takes primitives (not an options object) on purpose: an object literal
 * default would be a new reference on every render, which used to re-run the
 * effect and rebuild the observer on every single render.
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = "120px",
  once = true,
} = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [hasIntersected, setHasIntersected] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    // No IntersectionObserver (very old browsers, jsdom): reveal immediately so
    // content is never stranded in its hidden state.
    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true)
      setHasIntersected(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          // Idempotent, so `hasIntersected` never needs to be a dependency.
          setHasIntersected(true)
          if (once) observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isIntersecting, hasIntersected }
}

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Image lazy loading with intersection observer.
 * Same primitive-args treatment as useIntersectionObserver.
 */
export const useLazyImage = (src, { threshold = 0.1, rootMargin = "120px" } = {}) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const imgRef = React.useRef(null)

  React.useEffect(() => {
    setImageSrc(null)
    setIsLoaded(false)
    setIsError(false)

    const element = imgRef.current
    if (!element || !src) return undefined

    if (typeof IntersectionObserver === "undefined") {
      setImageSrc(src)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [src, threshold, rootMargin])

  React.useEffect(() => {
    if (!imageSrc) return undefined

    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setIsLoaded(true)
    }
    img.onerror = () => {
      if (!cancelled) setIsError(true)
    }
    img.src = imageSrc

    return () => {
      cancelled = true
    }
  }, [imageSrc])

  return { imgRef, imageSrc, isLoaded, isError }
}

// Smooth scroll function
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    const prefersReduced = supportsMatchMedia() && window.matchMedia(REDUCED_MOTION_QUERY).matches
    window.scrollTo({
      top: elementPosition,
      behavior: prefersReduced ? 'auto' : 'smooth'
    })
  }
}

/* ------------------------------------------------------------------ *
 * Shared framer-motion variants
 * Import these instead of redefining reveal/stagger objects per page.
 * ------------------------------------------------------------------ */

/** Reveal variants factory — collapses distance/duration under reduced motion. */
export const makeReveal = (prefersReduced = false) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0.01 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

/** Stagger container factory — no stagger delay under reduced motion. */
export const makeStagger = (prefersReduced = false) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.08,
      delayChildren: prefersReduced ? 0 : 0.05,
    },
  },
})

/** Ready-made defaults for the full-motion case. */
export const revealVariants = makeReveal(false)
export const staggerContainer = makeStagger(false)
