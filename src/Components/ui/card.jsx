import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Card is a pure surface primitive: radius, border, background, base shadow.
 * It deliberately owns NO hover transform. Pass `interactive` to opt into the
 * shared `.hover-lift` helper (hover-capable pointers only) or apply a single
 * framer-motion `whileHover` at the call site — never both.
 */
const Card = React.forwardRef(({ className, interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      interactive && "hover-lift",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// `children` is passed explicitly rather than via the spread so the
// jsx-a11y/heading-has-content rule can see the heading is never empty.
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl sm:text-2xl font-semibold leading-tight tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 pt-0 sm:p-6 sm:pt-0", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0 sm:p-6 sm:pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/**
 * GlassCard — frosted surface built on theme tokens so it stays legible on all
 * six themes. `.glass-effect` (index.css) supplies the per-theme tint; the token
 * utilities below are the fallback before a theme class is on <html>.
 */
const GlassCard = React.forwardRef(({ className, interactive = false, ...props }, ref) => (
  <Card
    ref={ref}
    interactive={interactive}
    className={cn(
      "glass-effect bg-card/70 backdrop-blur-md border-border/60 shadow-lg",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const GradientCard = React.forwardRef(({ className, interactive = false, ...props }, ref) => (
  <Card
    ref={ref}
    interactive={interactive}
    className={cn(
      "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg",
      className
    )}
    {...props}
  />
))
GradientCard.displayName = "GradientCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, GlassCard, GradientCard }
