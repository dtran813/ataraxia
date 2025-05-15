"use client";

import { Fragment, ReactNode } from "react";
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { X } from "lucide-react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  showCloseButton?: boolean;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  primaryAction,
  secondaryAction,
  className,
  showCloseButton = true,
  initialFocus,
}: DialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  "w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-dark-100 p-6 text-left align-middle shadow-xl transition-all",
                  className
                )}
              >
                {title && (
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </DialogTitle>
                )}

                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                )}

                {children && (
                  <div className={cn("mt-4", !title && !description && "mt-0")}>
                    {children}
                  </div>
                )}

                {(primaryAction || secondaryAction || footer) && (
                  <div
                    className={cn(
                      "mt-6",
                      footer
                        ? "flex flex-col space-y-4"
                        : "flex flex-row-reverse space-x-2 space-x-reverse"
                    )}
                  >
                    {!footer && (
                      <>
                        {primaryAction && (
                          <Button
                            onClick={primaryAction.onClick}
                            variant={primaryAction.variant || "default"}
                          >
                            {primaryAction.label}
                          </Button>
                        )}
                        {secondaryAction && (
                          <Button
                            onClick={secondaryAction.onClick}
                            variant="outline"
                          >
                            {secondaryAction.label}
                          </Button>
                        )}
                      </>
                    )}
                    {footer}
                  </div>
                )}

                {showCloseButton && (
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="w-5 h-5" />
                  </button>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

// Export Modal as an alias for Dialog for backward compatibility
export const Modal = Dialog;
