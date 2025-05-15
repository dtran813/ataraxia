"use client";

import { Fragment, useRef, ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const initialFocusRef = useRef(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={initialFocusRef}
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* Background overlay */}
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

        {/* Modal panel */}
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

                <div className={cn(title || description ? "mt-4" : "")}>
                  {children}
                </div>

                {/* Close button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={onClose}
                  ref={initialFocusRef}
                >
                  <span className="sr-only">Close</span>
                  <X className="w-5 h-5" />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
