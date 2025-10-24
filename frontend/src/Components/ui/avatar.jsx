import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming cn is available for utility class merging

const avatarSizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-xl",
  "2xl": "h-32 w-32 text-2xl",
  "3xl": "h-40 w-40 text-3xl",
  "4xl": "h-48 w-48 text-4xl",
};

const Avatar = React.forwardRef(
  ({ className, size = "md", glow = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        avatarSizes[size],
        glow &&
          "ring-2 ring-offset-2 ring-primary-500 dark:ring-accent-500 ring-offset-background transition-all duration-300 hover:ring-4 hover:ring-offset-4",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(
  ({ className, src, alt, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
      setImgError(false); // Reset error when src changes
    }, [src]);

    if (imgError || !src) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        onError={() => setImgError(true)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
