import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  // `relative` anchors the loading spinner. The coarse-pointer guard lifts every
  // button to a 44px hit area on touch devices without bulking up the desktop UI.
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [@media(pointer:coarse)]:min-h-[44px] [@media(pointer:coarse)]:min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        subtle:
          "border-0 bg-muted text-foreground hover:bg-muted/70",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // The prominent call-to-action. Solid, not a gradient: a `to-primary/75`
        // stop let the page background bleed through the right-hand end and
        // dropped the label to ~3.2:1 in every theme. Depth comes from the
        // shadow instead, which costs no contrast.
        gradient:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all duration-200",
        glow: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-primary/50 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-md px-2.5 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const prefersReducedMotion = useReducedMotion()
    const isDisabled = disabled || loading
    // Slot requires exactly one child, so the spinner is only injected for real
    // <button> elements. asChild links still advertise the busy/disabled state.
    const showSpinner = loading && !asChild

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={loading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        disabled={asChild ? undefined : isDisabled}
        {...props}
      >
        {showSpinner ? (
          <>
            <Loader2
              aria-hidden="true"
              className={cn(
                "absolute inset-0 m-auto h-4 w-4",
                prefersReducedMotion ? "animate-pulse" : "animate-spin"
              )}
            />
            {/* Children stay in flow so the button keeps its exact width. */}
            <span className="invisible inline-flex items-center">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
