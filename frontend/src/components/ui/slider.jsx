import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-5 w-5 rounded-full border-2 border-cyan-400/60 bg-gray-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 disabled:pointer-events-none disabled:opacity-50 hover:border-cyan-400 cursor-grab active:cursor-grabbing" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
