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
 *   <SectionHeading title="Featured Projects" subtitle="…" icon={Code} />
 *
 * `icon` accepts either a component reference (`icon={Code}`) or an already
 * rendered element (`icon={<Code />}`). The accent bar uses theme tokens so it
 * tracks all six themes instead of being locked to blue/purple.
 */
const SectionHeading = React.memo(
  ({
    title,
    subtitle,
    icon,
    align = "center",
    as: Tag = "h2",
    className,
    ...props
  }) => {
    const alignment = ALIGNMENTS[align] || ALIGNMENTS.center;

    let renderedIcon = null;
    if (React.isValidElement(icon)) {
      renderedIcon = icon;
    } else if (icon) {
      renderedIcon = React.createElement(icon, {
        className: "h-5 w-5 sm:h-6 sm:w-6",
        "aria-hidden": "true",
      });
    }

    return (
      <div
        className={cn("space-y-3 sm:space-y-4", alignment.text, className)}
        {...props}
      >
        {renderedIcon && (
          <div className={cn("flex", alignment.row)}>
            <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {renderedIcon}
            </span>
          </div>
        )}

        <Tag className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
          {title}
        </Tag>

        <div
          aria-hidden="true"
          className={cn(
            "h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r from-primary to-primary/40",
            alignment.block
          )}
        />

        {subtitle && (
          <p
            className={cn(
              "text-base sm:text-lg text-muted-foreground max-w-2xl",
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
