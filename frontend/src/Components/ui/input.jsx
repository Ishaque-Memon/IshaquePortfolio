import * as React from "react"

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-neutral-200 dark:border-neutral-700 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }