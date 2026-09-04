import React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Skeleton — a shimmering placeholder box.
 *
 *   <Skeleton className="h-4 w-32" />
 *
 * The container pulses (built-in Tailwind) and a gradient overlay sweeps across
 * it via the `shimmer` animation. Both collapse to a flat muted box when the
 * user prefers reduced motion. Purely decorative, so it is aria-hidden.
 */
const Skeleton = React.memo(({ className, ...props }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/60",
        !prefersReducedMotion && "animate-pulse",
        className
      )}
      {...props}
    >
      {!prefersReducedMotion && (
        <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      )}
    </div>
  );
});

Skeleton.displayName = "Skeleton";

export default Skeleton;
export { Skeleton };
