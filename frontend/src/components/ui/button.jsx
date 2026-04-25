import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-white border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-500/30 hover:-translate-y-0.5",
        destructive:
          "bg-red-500/10 text-red-300 border border-red-500/20 shadow-sm hover:bg-red-500/20 hover:text-red-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        outline:
          "border border-white/15 bg-white/5 text-slate-200 shadow-sm hover:bg-white/10 hover:text-white hover:border-white/25",
        secondary:
          "bg-white/10 text-slate-200 border border-white/10 shadow-sm hover:bg-white/15 hover:text-white",
        ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
