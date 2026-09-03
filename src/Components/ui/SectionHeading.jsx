import React from "react";
import { cn } from "../../lib/utils";

const ALIGNMENTS = {
  left: { text: "text-left", block: "", row: "justify-start" },
  center: { text: "text-center", block: "mx-auto", row: "justify-center" },
  right: { text: "text-right", block: "ml-auto", row: "justify-end" },
};

/**
 * SectionHeading — the title / accent bar / subtitle block every section repeats.
 *
 *   <SectionHeading title="Featured Projects" subtitle="…" />
 *
 * The accent bar uses theme tokens so it tracks all six themes instead of
 * being locked to blue/purple.
 */
const SectionHeading = React.memo(
  ({ title, subtitle, align = "center", as: Tag = "h2", className, ...props }) => {
    const alignment = ALIGNMENTS[align] || ALIGNMENTS.center;

    return (
      <div
        className={cn("space-y-2 sm:space-y-3", alignment.text, className)}
        {...props}
      >
        <Tag className="gradient-text text-2xl font-bold sm:text-3xl lg:text-4xl">
          {title}
        </Tag>

        <div
          aria-hidden="true"
          className={cn(
            "h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40 sm:w-24",
            alignment.block
          )}
        />

        {subtitle && (
          <p
            className={cn(
              "max-w-2xl text-base text-muted-foreground sm:text-lg",
              alignment.block
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
export { SectionHeading };
