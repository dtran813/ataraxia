"use client";

import { useState, ReactNode } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  variant?: "default" | "pills" | "underline";
  className?: string;
}

export function Tabs({
  items,
  defaultIndex = 0,
  onChange,
  variant = "default",
  className,
}: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  const variantStyles = {
    default: {
      list: "flex space-x-2 border-b border-gray-200 dark:border-gray-800",
      tab: (selected: boolean, disabled: boolean | undefined) =>
        cn(
          "px-3 py-2 text-sm font-medium border-b-2 border-transparent",
          selected
            ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700",
          disabled &&
            "opacity-50 cursor-not-allowed hover:text-gray-500 dark:hover:text-gray-400 hover:border-transparent dark:hover:border-transparent"
        ),
    },
    pills: {
      list: "flex space-x-2",
      tab: (selected: boolean, disabled: boolean | undefined) =>
        cn(
          "px-3 py-2 text-sm font-medium rounded-md",
          selected
            ? "bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800",
          disabled &&
            "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent hover:text-gray-500 dark:hover:text-gray-400"
        ),
    },
    underline: {
      list: "flex space-x-8",
      tab: (selected: boolean, disabled: boolean | undefined) =>
        cn(
          "px-1 py-2 text-sm font-medium border-b-2",
          selected
            ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700",
          disabled &&
            "opacity-50 cursor-not-allowed hover:text-gray-500 dark:hover:text-gray-400 hover:border-transparent dark:hover:border-transparent"
        ),
    },
  };

  return (
    <div className={className}>
      <TabGroup selectedIndex={selectedIndex} onChange={handleChange}>
        <TabList className={variantStyles[variant].list}>
          {items.map((item, index) => (
            <Tab
              key={index}
              disabled={item.disabled}
              className={({ selected }) =>
                variantStyles[variant].tab(selected, item.disabled)
              }
            >
              {item.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-4">
          {items.map((item, index) => (
            <TabPanel key={index}>{item.content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
