import * as React from "react";

import { cn } from "./utils";

const buttonVariants = (props: {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}) => {
  const { variant = "default", size = "default", className } = props;
  
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 outline-none";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md gap-1.5 px-3",
    lg: "h-10 rounded-md px-6",
    icon: "size-9 rounded-md",
  };
  
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
