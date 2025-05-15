"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      variant = "default",
      duration = 5000,
      onClose,
      className,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const variantClasses = {
      default: "bg-white dark:bg-dark-100 border-gray-200 dark:border-gray-800",
      success:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      warning:
        "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    };

    const iconVariants = {
      default: null,
      success: (
        <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
      ), // Success
      error: (
        <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
      ), // Error
      warning: (
        <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
      ), // Warning
      info: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
    };

    useEffect(() => {
      if (duration === Infinity) return;

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose?.();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "max-w-sm w-full shadow-lg rounded-lg border overflow-hidden transition-all duration-300 transform",
          variantClasses[variant],
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          className
        )}
      >
        <div className="p-4">
          <div className="flex items-start">
            {iconVariants[variant] && (
              <div className="shrink-0 mr-3">{iconVariants[variant]}</div>
            )}
            <div className="flex-1">
              {title && (
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
              {description && (
                <div
                  className={cn(
                    "text-sm text-gray-600 dark:text-gray-300",
                    title && "mt-1"
                  )}
                >
                  {description}
                </div>
              )}
            </div>
            <button
              type="button"
              className="ml-3 shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";
