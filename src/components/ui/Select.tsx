"use client";

import { forwardRef, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder,
      disabled = false,
      className,
      error,
    },
    ref
  ) => {
    const selectedOption = options.find((option) => option.value === value);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          {({ open }) => (
            <>
              <Listbox.Button
                className={cn(
                  "relative w-full cursor-default rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm",
                  disabled && "opacity-50 cursor-not-allowed",
                  error &&
                    "border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500"
                )}
              >
                <span className="block truncate">
                  {selectedOption
                    ? selectedOption.label
                    : placeholder || "Select an option"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className={({ active, disabled }) =>
                        cn(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active
                            ? "bg-primary-100 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100"
                            : "text-gray-900 dark:text-gray-100",
                          disabled && "opacity-50 cursor-not-allowed"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={cn(
                              "block truncate",
                              selected && "font-semibold"
                            )}
                          >
                            {option.label}
                          </span>

                          {selected && (
                            <span
                              className={cn(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active
                                  ? "text-primary-600 dark:text-primary-400"
                                  : "text-primary-600 dark:text-primary-400"
                              )}
                            >
                              <Check className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>

        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
