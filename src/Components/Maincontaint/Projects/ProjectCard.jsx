import React, { useCallback, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Play, Star, Tag, X } from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";
import LazyImage from "../../ui/LazyImage";

/**
 * The one project card. Both /projects and the homepage teaser render this, and
 * its props match the shape in src/data/projects.js exactly (the field is
 * `image`, not `imgUrl`) so a call site can just spread a project onto it.
 *
 * The card's only hover effect is the lift from `GlassCard interactive`. Don't
 * add a framer-motion whileHover here or at the call site — stacking two was
 * what made the old cards jitter.
 */
function ProjectCard({
  title,
  image,
  uTubeUrl,
  demoUrl,
  codeUrl,
  description,
  skills = [],
  category,
  featured = false,
  viewMode = "grid",
}) {
  const [showVideo, setShowVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const playVideo = useCallback(() => setShowVideo(true), []);
  const closeVideo = useCallback(() => setShowVideo(false), []);

  const isList = viewMode === "list";
  const fadeDuration = prefersReducedMotion ? 0 : 0.25;

  // Only one project has a fifth tag, but capping keeps every card in a row the
  // same height instead of letting one wrap onto an extra line.
  const visibleSkills = skills.slice(0, 4);
  const extraSkills = skills.slice(4);

  return (
    <GlassCard
      interactive
      className={`group flex h-full overflow-hidden ${
        isList ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* In list view the image sits on the left at 40% and stretches to
          whatever height the text column ends up being. Below sm it goes back
          to sitting on top, same as the grid. */}
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-muted ${
          isList ? "sm:w-2/5 sm:self-stretch" : ""
        }`}
      >
        <div
          className={`relative aspect-video w-full ${
            isList ? "sm:absolute sm:inset-0 sm:aspect-auto sm:h-full" : ""
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {showVideo && uTubeUrl ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeDuration }}
                className="absolute inset-0"
              >
                {/* Mounted only after a click, so nobody pays for a YouTube
                    player on twelve cards just by opening the page. */}
                <iframe
                  src={uTubeUrl}
                  title={`${title} demo video`}
                  className="h-full w-full"
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={closeVideo}
                  aria-label={`Close the ${title} demo video`}
                  className="absolute right-2 top-2 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeDuration }}
                className="absolute inset-0"
              >
                <LazyImage
                  src={image}
                  alt={`${title} screenshot`}
                  aspectRatio="16/9"
                  className="h-full w-full"
                />

                {/* Decorative only. This used to hold duplicate "Watch Demo"
                    and "Live Demo" buttons; because pointer-events:none does
                    not remove anything from the tab order, keyboard and screen
                    reader users hit two invisible, mouse-unreachable copies of
                    every action. The real buttons live in the row below, where
                    touch users can reach them too. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Both badges share one flex row so a long category name pushes itself
            onto a second line instead of colliding with "Featured" on a narrow
            card. Hidden while the video plays so they miss the player chrome. */}
        {!showVideo && (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-warning/40 bg-card/90 px-2.5 py-1 text-xs font-medium text-warning shadow-sm backdrop-blur-sm">
                <Star className="h-3 w-3 shrink-0" aria-hidden="true" />
                Featured
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-sm backdrop-blur-sm">
              <Tag className="h-3 w-3 shrink-0" aria-hidden="true" />
              {category}
            </span>
          </div>
        )}
      </div>

      {/* flex-1 here plus mt-auto on the buttons is what bottom-aligns the
          actions across cards of different description lengths. */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="break-words text-lg font-bold leading-snug transition-colors group-hover:text-primary sm:text-xl">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <ul aria-label={`${title} technologies`} className="mt-4 flex flex-wrap gap-2">
          {visibleSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-md bg-accent/50 px-2 py-1 text-xs font-medium text-accent-foreground"
            >
              {skill}
            </li>
          ))}
          {extraSkills.length > 0 && (
            <li
              title={extraSkills.join(", ")}
              className="rounded-md border border-border/60 px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              +{extraSkills.length} more
            </li>
          )}
        </ul>

        {/* basis-36 lets the two links sit side by side when the card is wide
            enough and drop to full-width rows when it isn't, instead of
            squeezing "Source Code" past the edge of its button. */}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Button variant="outline" size="sm" className="flex-1 basis-36" asChild>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
              Live Demo
            </a>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 basis-36" asChild>
            <a href={codeUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
              Source Code
            </a>
          </Button>
          {/* Touch devices never get the hover overlay, so the video needs a
              real button down here too. Kept mounted in both states so opening
              the player doesn't resize the card. */}
          {uTubeUrl && (
            <Button
              variant="subtle"
              size="sm"
              onClick={showVideo ? closeVideo : playVideo}
              aria-expanded={showVideo}
              className="basis-full"
            >
              {showVideo ? (
                <X className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Play className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {showVideo ? "Close Demo" : "Watch Demo"}
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default React.memo(ProjectCard);
