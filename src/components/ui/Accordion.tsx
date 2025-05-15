"use client";

import { ReactNode } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string | ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  return (
    <Disclosure
      defaultOpen={defaultOpen}
      as="div"
      className={cn("border-b border-gray-200 dark:border-gray-800", className)}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full justify-between items-center py-4 text-left text-sm font-medium">
            <span className="text-gray-900 dark:text-gray-100">{title}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-gray-500",
                open && "transform rotate-180"
              )}
            />
          </DisclosureButton>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DisclosurePanel className="pb-4 pt-2 text-sm text-gray-600 dark:text-gray-400">
              {children}
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div
      className={cn(
        "divide-y divide-gray-200 dark:divide-gray-800 rounded-md border border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}
