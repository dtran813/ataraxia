"use client";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/contexts/theme/ThemeContext";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuDivider,
} from "@/components/ui/DropdownMenu";
import {
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  Timer,
  Mountain,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Ataraxia
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/focus"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Mountain className="w-4 h-4" />
              <span>Focus</span>
            </Link>

            <Link
              href="/timer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Timer className="w-4 h-4" />
              <span>Timer</span>
            </Link>

            {user && (
              <Link
                href="/analytics"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 p-0"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Mobile Navigation - Visible on mobile only */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* User Menu - Hidden on mobile */}
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="hidden sm:inline text-sm">
                        {user.displayName || "Account"}
                      </span>
                    </Button>
                  }
                  align="right"
                >
                  <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.displayName || "Anonymous User"}
                    </div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>

                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/analytics")}>
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuDivider />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 dark:text-red-400"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
