import * as React from "react"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700 dark:text-neutral-200 ${className || ''}`}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }