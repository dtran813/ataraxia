"use client";

import { Environment } from "@/components/environments/Environment";
import { FocusTimer } from "@/components/focus-timer/FocusTimer";
import { MainLayout } from "@/components/layout/MainLayout";

export default function FocusPage() {
  return (
    <MainLayout>
      <Environment>
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white dark:bg-dark-200 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Focus Session
            </h1>
            <FocusTimer />
          </div>
        </div>
      </Environment>
    </MainLayout>
  );
}
