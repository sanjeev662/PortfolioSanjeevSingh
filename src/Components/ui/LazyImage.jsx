import React from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../../lib/utils";
import Skeleton from "./Skeleton";

/**
 * LazyImage
 *
 * - Reserves its box via `aspectRatio` before the image lands, so it costs no CLS.
 * - Shows an absolutely positioned shimmer skeleton that fades out on load.
 * - Falls back to an accessible panel (icon + the alt text) when the src fails.
 * - `eager` skips the IntersectionObserver entirely and loads at high priority,
 *   which is what above-the-fold imagery (the hero) needs.
 *
 * The observer lives here rather than in `useLazyImage` so that `eager` can opt
 * out of it completely and so that load/error state comes from the real <img>
 * element (a prerequisite for `fetchPriority` and `decoding` to mean anything).
 */
const LazyImage = React.memo(
  ({
    src,
    alt = "",
    className = "",
    aspectRatio = "16/9",
    eager = false,
    rootMargin = "200px",
    sizes,
    srcSet,
    placeholder = null,
    loadingClassName = "",
    imgClassName = "",
    style,
    onLoad,
    onError,
    ...props
  }) => {
    const containerRef = React.useRef(null);
    const [inView, setInView] = React.useState(eager);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    // Reset when the source actually changes, so a swapped image re-shows its
    // skeleton. Skipped on the first render on purpose: the ref callback below
    // runs during commit and may already have marked a cached image as loaded.
    // Resetting here would stomp that, and since the image is already complete
    // no second `load` event ever arrives — leaving it invisible behind the
    // skeleton forever. That bit the eager hero portrait hardest.
    const previousSrc = React.useRef(src);
    React.useEffect(() => {
      if (previousSrc.current === src) return;
      previousSrc.current = src;
      setIsLoaded(false);
      setIsError(false);
    }, [src]);

    React.useEffect(() => {
      if (eager) return undefined;

      const node = containerRef.current;
      if (!node) return undefined;

      if (typeof IntersectionObserver === "undefined") {
        setInView(true);
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.01, rootMargin }
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, [eager, rootMargin]);

    // Images restored from cache can be `complete` before React attaches onLoad.
    const setImgNode = React.useCallback((node) => {
      if (node && node.complete && node.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }, []);

    const handleLoad = React.useCallback(
      (event) => {
        setIsLoaded(true);
        if (onLoad) onLoad(event);
      },
      [onLoad]
    );

    const handleError = React.useCallback(
      (event) => {
        setIsError(true);
        if (onError) onError(event);
      },
      [onError]
    );

    const shouldLoad = eager || inView;

    // Lowercase on purpose. React 18 doesn't recognise the camelCase
    // `fetchPriority` prop and logs a warning, whereas the lowercase DOM
    // attribute passes straight through to the element.
    const priorityAttr = eager ? { fetchpriority: "high" } : null;

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={{ aspectRatio, ...style }}
        {...props}
      >
        {shouldLoad && !isError && (
          <img
            ref={setImgNode}
            src={src}
            alt={alt}
            sizes={sizes}
            srcSet={srcSet}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            {...priorityAttr}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              imgClassName
            )}
          />
        )}

        {!isLoaded && !isError &&
          (placeholder || (
            <Skeleton
              className={cn(
                "absolute inset-0 h-full w-full rounded-none",
                loadingClassName
              )}
            />
          ))}

        {isError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/60 px-3 py-2 text-center text-muted-foreground">
            <ImageOff className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden="true" />
            {alt ? (
              <span className="line-clamp-3 break-words text-xs sm:text-sm">{alt}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
