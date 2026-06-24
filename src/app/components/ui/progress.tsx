import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  size?: "sm" | "md" | "lg"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
