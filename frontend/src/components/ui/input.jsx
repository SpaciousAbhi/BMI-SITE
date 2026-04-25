import * as React from "react"

import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-base text-white shadow-inner backdrop-blur-md transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/30 focus-visible:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }
