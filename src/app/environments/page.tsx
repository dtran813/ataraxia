"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Menu, X, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useEnvironmentStore } from "@/store/useEnvironmentStore";
import { Environment } from "@/types";
import { SidebarContent } from "@/components/environments/SidebarContent";
import { EnvironmentCard } from "@/components/environments/EnvironmentCard";

export default function EnvironmentsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { environments, setCurrentEnvironment } = useEnvironmentStore();

  // Filter environments by type
  const systemEnvironments = environments.filter(
    (env) => env.createdBy === "system"
  );
  const userEnvironments = environments.filter(
    (env) => env.createdBy !== "system"
  );

  const handleEnvironmentSelect = (environment: Environment) => {
    setCurrentEnvironment(environment.id);
    // Navigate to focus mode with this environment
    router.push("/focus");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:flex lg:flex-col lg:border-r lg:border-gray-200 dark:lg:border-gray-800 p-6">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Environments
              </h1>
            </div>
            <Button
              size="sm"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Focus Environments
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the perfect environment to enhance your productivity and
              wellbeing
            </p>
          </div>

          {/* User Environments Section */}
          <div className="border-b border-gray-300 dark:border-white/20 pb-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Environments
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userEnvironments.length} environments
                </span>
                <Button className="flex items-center gap-2 cursor-pointer">
                  <Plus className="w-4 h-4" />
                  Create New
                </Button>
              </div>
            </div>

            {userEnvironments.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
                {userEnvironments.map((environment) => (
                  <EnvironmentCard
                    key={environment.id}
                    environment={environment}
                    onSelect={handleEnvironmentSelect}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600">
                <CardContent className="p-6">
                  <Leaf className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No custom environments yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Create your first custom environment to get started
                  </p>
                  <Button className="flex items-center gap-2 mx-auto cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Create Environment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* System Environments Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                System Environments
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {systemEnvironments.length} environments
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
              {systemEnvironments.map((environment) => (
                <EnvironmentCard
                  key={environment.id}
                  environment={environment}
                  onSelect={handleEnvironmentSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
