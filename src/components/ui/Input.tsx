"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-primary-300 dark:border-primary-700 bg-light-100 dark:bg-dark-200 px-3 py-2 text-sm text-gray-900 dark:text-light-100",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
