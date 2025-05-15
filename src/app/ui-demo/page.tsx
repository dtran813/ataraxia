// src/app/ui-demo/page.tsx
"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Dialog } from "@/components/ui/Dialog";
import { Toast } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/Skeleton";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Tabs } from "@/components/ui/Tabs";
import { FormError } from "@/components/ui/FormError";
import { FadeIn, SlideIn, AnimatedList } from "@/components/ui/Animation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuDivider,
} from "@/components/ui/DropdownMenu";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Combobox } from "@/components/ui/Combobox";
import {
  Plus,
  Heart,
  User,
  Settings,
  LogOut,
  MoreVertical,
} from "lucide-react";

export default function UIDemo() {
  // State for interactive components
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "default" | "success" | "error" | "warning" | "info"
  >("default");
  const [selectValue, setSelectValue] = useState("option1");
  const [switchValue, setSwitchValue] = useState(false);
  const [comboboxValue, setComboboxValue] = useState("");

  // Toast handlers
  const handleShowToast = (
    variant: "default" | "success" | "error" | "warning" | "info"
  ) => {
    setToastVariant(variant);
    setShowToast(true);
  };

  // Sample data for Select
  const selectOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true },
    { value: "option4", label: "Option 4" },
  ];

  // Sample data for Combobox
  const comboboxOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt.js" },
  ];

  // Sample data for Tabs
  const tabItems = [
    {
      label: "Tab 1",
      content: (
        <div className="p-4 bg-gray-100 dark:bg-dark-200 rounded-md">
          Content for Tab 1
        </div>
      ),
    },
    {
      label: "Tab 2",
      content: (
        <div className="p-4 bg-gray-100 dark:bg-dark-200 rounded-md">
          Content for Tab 2
        </div>
      ),
    },
    {
      label: "Disabled",
      content: <div>This tab is disabled</div>,
      disabled: true,
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">UI Components Demo</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <Button>Default Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex gap-4 mb-6">
            <Button size="icon">
              <Plus className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline">
              <Heart className="w-5 h-5" />
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This is the main content of the card. It can contain any type
                  of content.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Simple Card</h3>
                <p>A card without header and footer components.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* New section for Dropdown Menu */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dropdown Menu</h2>
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Dropdown</h3>
              <DropdownMenu
                trigger={
                  <Button variant="outline">
                    <DropdownMenuTrigger label="Options" />
                  </Button>
                }
              >
                <DropdownMenuItem onClick={() => alert("Option 1 clicked")}>
                  Option 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Option 2 clicked")}>
                  Option 2
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Disabled Option</DropdownMenuItem>
              </DropdownMenu>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">With Divider</h3>
              <DropdownMenu
                trigger={
                  <Button>
                    <DropdownMenuTrigger label="Account" />
                  </Button>
                }
              >
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuDivider />
                <DropdownMenuItem onClick={() => alert("Log out clicked")}>
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenu>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Icon Trigger</h3>
              <DropdownMenu
                trigger={
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                }
                align="left"
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuDivider />
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  Delete
                </DropdownMenuItem>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* New section for Accordion */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Accordion</h2>
          <div className="max-w-2xl">
            <Accordion>
              <AccordionItem title="What is Ataraxia?" defaultOpen>
                <p>
                  Ataraxia is a web application designed to enhance productivity
                  and wellbeing through customizable focus environments and
                  smart breaks. The app combines visual and audio elements to
                  create immersive work environments.
                </p>
              </AccordionItem>
              <AccordionItem title="How does the Pomodoro timer work?">
                <p>
                  The Pomodoro technique uses timed intervals of focused work
                  followed by short breaks. Typically, you work for 25 minutes,
                  then take a 5-minute break. After four work sessions, you take
                  a longer break of 15-30 minutes.
                </p>
                <p className="mt-2">
                  Our timer is fully customizable, allowing you to adjust these
                  intervals to your preference.
                </p>
              </AccordionItem>
              <AccordionItem title="What kinds of focus environments are available?">
                <p>
                  We offer a variety of visual backgrounds including nature
                  scenes, minimalist workspaces, abstract patterns, and more.
                  Each environment can be paired with ambient sounds like
                  rainfall, cafe noise, or lo-fi music.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* New section for Combobox */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Combobox (Searchable Select)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="framework">Select a Framework</Label>
              <Combobox
                options={comboboxOptions}
                value={comboboxValue}
                onChange={setComboboxValue}
                placeholder="Search for a framework..."
                className="mt-1"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected value: {comboboxValue ? comboboxValue : "None"}
              </p>
            </div>

            <div>
              <Label>Disabled Combobox</Label>
              <Combobox
                options={comboboxOptions}
                value={comboboxValue}
                onChange={setComboboxValue}
                placeholder="This combobox is disabled"
                disabled
                className="mt-1"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Form Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="demo-input">Input</Label>
                <Input
                  id="demo-input"
                  placeholder="Enter some text"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="demo-input-error">Input with Error</Label>
                <Input
                  id="demo-input-error"
                  placeholder="Enter some text"
                  className="mt-1 border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500"
                />
                <FormError message="This field is required" />
              </div>

              <div>
                <Label htmlFor="demo-select">Select</Label>
                <Select
                  value={selectValue}
                  onChange={setSelectValue}
                  options={selectOptions}
                  placeholder="Select an option"
                  className="mt-1"
                />
              </div>

              <div>
                <Switch
                  checked={switchValue}
                  onChange={setSwitchValue}
                  label="Toggle switch"
                  description="This is a description for the switch"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Disabled Input</Label>
                <Input placeholder="Disabled input" disabled className="mt-1" />
              </div>

              <div>
                <Label>Disabled Select</Label>
                <Select
                  value={selectValue}
                  onChange={setSelectValue}
                  options={selectOptions}
                  disabled
                  className="mt-1"
                />
              </div>

              <div>
                <Switch
                  checked={switchValue}
                  onChange={setSwitchValue}
                  label="Disabled switch"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Default Tabs</h3>
              <Tabs items={tabItems} variant="default" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Pills Tabs</h3>
              <Tabs items={tabItems} variant="pills" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Underline Tabs</h3>
              <Tabs items={tabItems} variant="underline" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Feedback Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dialog</h3>
              <div className="flex gap-4">
                <Button onClick={() => setIsDialogOpen(true)}>
                  Open Dialog
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Toast Notifications</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleShowToast("default")}
                  variant="subtle"
                >
                  Default
                </Button>
                <Button
                  onClick={() => handleShowToast("success")}
                  variant="subtle"
                  className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                >
                  Success
                </Button>
                <Button
                  onClick={() => handleShowToast("error")}
                  variant="subtle"
                  className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                >
                  Error
                </Button>
                <Button
                  onClick={() => handleShowToast("warning")}
                  variant="subtle"
                  className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                >
                  Warning
                </Button>
                <Button
                  onClick={() => handleShowToast("info")}
                  variant="subtle"
                  className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                >
                  Info
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Loading Spinners</h3>
              <div className="flex items-center gap-8">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skeleton Loaders</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-32 w-full mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fade In</CardTitle>
              </CardHeader>
              <CardContent>
                <FadeIn>
                  <div className="p-4 bg-gray-100 dark:bg-dark-200 rounded-md">
                    This content fades in smoothly.
                  </div>
                </FadeIn>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slide In</CardTitle>
              </CardHeader>
              <CardContent>
                <SlideIn direction="up">
                  <div className="p-4 bg-gray-100 dark:bg-dark-200 rounded-md">
                    This content slides up.
                  </div>
                </SlideIn>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animated List</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedList staggerDelay={0.1} itemClassName="mb-2">
                  {[
                    <div
                      key="1"
                      className="p-2 bg-gray-100 dark:bg-dark-200 rounded-md"
                    >
                      Item 1
                    </div>,
                    <div
                      key="2"
                      className="p-2 bg-gray-100 dark:bg-dark-200 rounded-md"
                    >
                      Item 2
                    </div>,
                    <div
                      key="3"
                      className="p-2 bg-gray-100 dark:bg-dark-200 rounded-md"
                    >
                      Item 3
                    </div>,
                  ]}
                </AnimatedList>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Confirmation"
        description="Are you sure you want to perform this action?"
        primaryAction={{
          label: "Confirm",
          onClick: () => setIsDialogOpen(false),
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setIsDialogOpen(false),
        }}
      />

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4">
          <Toast
            title={`${
              toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)
            } Toast`}
            description={`This is an example of a ${toastVariant} toast notification.`}
            variant={toastVariant}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </MainLayout>
  );
}
