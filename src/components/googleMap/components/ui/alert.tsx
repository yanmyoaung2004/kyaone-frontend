import * as React from "react";

import { cn } from "@/lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, variant = "default", ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-md border p-4",
        variant === "destructive"
          ? "border-destructive bg-destructive text-destructive-foreground"
          : "border-border bg-background text-foreground",
        className
      )}
      role="alert"
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
    ref={ref}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
    ref={ref}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
