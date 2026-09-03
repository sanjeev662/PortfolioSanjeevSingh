import React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * LoadingSpinner — the Suspense fallback for lazily loaded routes.
 * Occupies a stable half-viewport block so swapping it for the real page does
 * not jump the layout, and degrades to a static pulsing dot for users who ask
 * for reduced motion.
 */
const LoadingSpinner = React.memo(({ label = "Loading", className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 bg-background px-4",
        className
      )}
    >
      {prefersReducedMotion ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full bg-primary animate-pulse"
        />
      ) : (
        <span
          aria-hidden="true"
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-primary/25 border-t-primary animate-spin"
        />
      )}

      <p
        aria-hidden="true"
        className="text-base sm:text-lg font-medium text-muted-foreground"
      >
        {label}
      </p>

      <span className="sr-only">{label}</span>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
