// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Animation settings
  REDUCED_MOTION_DURATION: 0.2,
  DEFAULT_MOTION_DURATION: 0.3,
  SCROLL_THROTTLE_MS: 16, // ~60fps
  
  // Intersection Observer settings
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px',
  
  // Image loading settings
  IMAGE_LAZY_LOAD_THRESHOLD: 0.1,
  IMAGE_LAZY_LOAD_ROOT_MARGIN: '100px',
  
  // Debounce/Throttle settings
  SEARCH_DEBOUNCE_MS: 300,
  RESIZE_THROTTLE_MS: 100,
  
  // Bundle optimization
  CHUNK_SIZE_WARNING: 250000, // 250KB
  
  // Memory management
  MAX_CACHED_COMPONENTS: 10,
  CLEANUP_INTERVAL_MS: 30000, // 30 seconds
};

// Performance monitoring utilities
export const performanceMonitor = {
  measureRender: (componentName, renderFn) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = renderFn();
      const end = performance.now();
      if (end - start > 16) { // More than 1 frame at 60fps
        console.warn(`Slow render detected in ${componentName}: ${(end - start).toFixed(2)}ms`);
      }
      return result;
    }
    return renderFn();
  },
  
  measureAsync: async (operationName, asyncFn) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = await asyncFn();
      const end = performance.now();
      console.log(`${operationName} completed in ${(end - start).toFixed(2)}ms`);
      return result;
    }
    return await asyncFn();
  }
};

export default PERFORMANCE_CONFIG;
