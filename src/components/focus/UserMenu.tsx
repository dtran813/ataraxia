"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/contexts/theme/ThemeContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  User,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-white/10 transition-all duration-200 shadow-lg",
            isOpen
              ? "bg-primary-100 dark:bg-white/10 text-primary-600 dark:text-white"
              : "text-gray-700 dark:text-white hover:bg-white/90 dark:hover:bg-black/50"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Panel */}
      {isOpen && (
        <div className="absolute top-24 right-8 w-72">
          <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-white/10 shadow-2xl">
            {/* User Section */}
            {user ? (
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium text-sm">
                      {user.displayName || "Anonymous User"}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Account Settings</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-white/20">
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm">Sign In</span>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-700/20"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Sign Up</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Theme Section */}
            <div>
              <h4 className="text-gray-900 dark:text-white text-sm font-medium mb-3">
                Theme
              </h4>

              <div className="space-y-1">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = theme === option.value;

                  return (
                    <button
                      key={option.value}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setTheme(option.value as any)}
                      className={cn(
                        "w-full flex items-center space-x-3 p-2 rounded-lg transition-colors text-sm",
                        isActive
                          ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{option.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/20">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
