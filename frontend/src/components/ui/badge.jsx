import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-white/10 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-xl transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-2 focus:ring-offset-gray-950",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:bg-cyan-500/20",
        secondary:
          "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10",
        destructive:
          "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:bg-red-500/20",
        outline: "text-slate-300 hover:bg-white/5",
        success: 
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
