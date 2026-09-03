import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, ExternalLink, Eye, X, ZoomIn } from "lucide-react";
import { GlassCard } from "../../ui/card";
import { Button } from "../../ui/button";
import LazyImage from "../../ui/LazyImage";

/**
 * The one certificate card. Both /certificates and the homepage teaser render
 * this, so the two can't drift apart again.
 *
 * Props match src/data/certificates.js exactly: { title, image, tagline,
 * siteUrl, year? }. `year` is only on the ICPC entry and `issuer` isn't on any
 * of them yet, so both are rendered only when actually present.
 */
function CertificateCard({ image, title, tagline, siteUrl, issuer, year }) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = React.useState(false);

  // Whichever control opened the preview gets focus back when it closes.
  const triggerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const originalLinkRef = React.useRef(null);

  const openLightbox = (event) => {
    triggerRef.current = event.currentTarget;
    setIsOpen(true);
  };

  const closeLightbox = React.useCallback(() => {
    setIsOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) trigger.focus();
  }, []);

  React.useEffect(() => {
    if (!isOpen) return undefined;

    // Freeze the page behind the preview. Replacing the scrollbar with equal
    // padding stops the layout from jumping sideways when it disappears.
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    if (closeButtonRef.current) closeButtonRef.current.focus();

    // Listening on the document (capture phase) rather than the panel, because
    // clicking the backdrop drops focus onto <body> and keystrokes would stop
    // reaching the panel.
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key !== "Tab") return;

      // Only two things in the preview can hold focus, so keeping focus inside
      // is just wrapping between them.
      const first = closeButtonRef.current;
      const last = originalLinkRef.current;
      const panel = panelRef.current;
      if (!first || !last || !panel) return;

      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [isOpen, closeLightbox]);

  const fade = prefersReducedMotion ? 0 : 0.2;
  const meta = [issuer, year].filter(Boolean).join(" · ");

  return (
    <>
      <GlassCard className="group flex h-full flex-col overflow-hidden">
        {/* Ring is inset because the card clips overflow and an offset ring
            would be sliced off along the top and sides. */}
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`View the ${title} certificate full screen`}
          className="focus-ring focus-visible:ring-inset focus-visible:ring-offset-0 relative block w-full border-b border-border/30"
        >
          {/* Two transition properties, not just `transition-transform`:
              tailwind-merge would otherwise drop LazyImage's own opacity fade. */}
          <LazyImage
            src={image}
            alt={`${title} certificate`}
            aspectRatio="3/2"
            className="w-full"
            imgClassName="transition-[opacity,transform] duration-500 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm"
          >
            <ZoomIn className="h-4 w-4" />
          </span>
        </button>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 rounded-lg bg-primary/15 p-1.5">
              <Award className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 break-words text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary sm:text-base">
                {title}
              </h3>
              {tagline ? (
                <p className="mt-1 line-clamp-2 break-words text-xs text-muted-foreground">
                  {tagline}
                </p>
              ) : null}
              {meta ? (
                <p className="mt-1 break-words text-xs text-muted-foreground/80">
                  {meta}
                </p>
              ) : null}
            </div>
          </div>

          {/* mt-auto pins the actions to the bottom so cards in a row line up.
              Labels wrap instead of overflowing: a card is only ~120px per
              button at the tightest point of the 2- and 3-column grids. */}
          <div className="mt-auto flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-auto min-h-[2.25rem] flex-1 whitespace-normal px-2.5 py-1.5 text-xs leading-tight"
              onClick={openLightbox}
            >
              <Eye className="mr-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              View Certificate
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-auto min-h-[2.25rem] flex-1 whitespace-normal px-2.5 py-1.5 text-xs leading-tight"
              asChild
            >
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Visit Site
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Full-screen preview. Portalled to <body> so the card's overflow-hidden
          and stacking context can't clip it. */}
      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="certificate-preview"
              className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fade, ease: "easeOut" }}
              // mousedown, not click: a drag that starts on the image and ends
              // out here shouldn't close the preview.
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeLightbox();
              }}
            >
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="flex max-h-full w-full max-w-4xl flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-semibold text-white sm:text-base">
                      {title}
                    </p>
                    {tagline ? (
                      <p className="break-words text-xs text-white/80 sm:text-sm">
                        {tagline}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    ref={closeButtonRef}
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="shrink-0"
                    aria-label="Close certificate preview"
                    onClick={closeLightbox}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>

                <div className="min-h-0 flex-1 overflow-auto rounded-lg bg-black/30 p-2">
                  <img
                    src={image}
                    alt={`${title} certificate`}
                    className="mx-auto h-auto max-h-[70vh] w-auto max-w-full object-contain"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    ref={originalLinkRef}
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    asChild
                  >
                    <a href={image} target="_blank" rel="noopener noreferrer">
                      <ExternalLink
                        className="mr-1.5 h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Open original
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default React.memo(CertificateCard);
