"use client";

import { Fragment, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function DropdownMenuItem({
  children,
  onClick,
  disabled,
  className,
}: DropdownMenuItemProps) {
  return (
    <MenuItem>
      {({ active }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "w-full text-left px-4 py-2 text-sm",
            active
              ? "bg-primary-100 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100"
              : "text-gray-700 dark:text-gray-300",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
  buttonClassName?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  className,
  buttonClassName,
}: DropdownMenuProps) {
  return (
    <Menu as="div" className={cn("relative inline-block text-left", className)}>
      <MenuButton className={buttonClassName}>{trigger}</MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={cn(
            "absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-dark-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
            align === "left" ? "left-0" : "right-0"
          )}
        >
          <div className="py-1">{children}</div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

// Convenience component for a trigger with a label and dropdown icon
export function DropdownMenuTrigger({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <span>{label}</span>
      <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
    </div>
  );
}

// Add a divider component for use in dropdown menus
export function DropdownMenuDivider() {
  return <div className="h-px my-1 bg-gray-200 dark:bg-gray-800" />;
}
