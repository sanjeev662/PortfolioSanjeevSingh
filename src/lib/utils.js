import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Optimized Intersection Observer hook for animations
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [hasIntersected, setHasIntersected] = React.useState(false)
  const ref = React.useRef(null)
  const observerRef = React.useRef(null)

  const defaultOptions = React.useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }), [options])

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
          // Disconnect after first intersection for performance
          observerRef.current?.disconnect()
        }
      }, defaultOptions)
    }

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [defaultOptions, hasIntersected])

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

// Image lazy loading with intersection observer
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const imgRef = React.useRef()

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src, options])

  React.useEffect(() => {
    if (imageSrc) {
      const img = new Image()
      img.onload = () => setIsLoaded(true)
      img.onerror = () => setIsError(true)
      img.src = imageSrc
    }
  }, [imageSrc])

  return { imgRef, imageSrc, isLoaded, isError }
}

// Smooth scroll function
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}
