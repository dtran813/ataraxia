"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const buttonVariants = cva(
  // Base styles applied to all button variants
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline:
          "border border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-950 text-primary-700 dark:text-primary-300",
        subtle:
          "bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 text-primary-900 dark:text-primary-100",
        ghost:
          "hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-900 dark:hover:text-primary-100",
        link: "underline-offset-4 hover:underline text-primary-600 dark:text-primary-400",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center">
            <LoadingSpinner
              size={size === "sm" ? "sm" : size === "lg" ? "md" : "sm"}
              className="mr-2 text-current"
            />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
