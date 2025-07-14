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

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return (
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600" />
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-200 dark:border-primary-800 bg-light-100/80 dark:bg-dark-100/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-light-100">
              Ataraxia
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/environments"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              <Mountain className="w-4 h-4" />
              <span>Environments</span>
            </Link>

            <Link
              href="/focus"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              <Mountain className="w-4 h-4" />
              <span>Focus</span>
            </Link>

            {user && (
              <Link
                href="/analytics"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
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
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
              title={`Current theme: ${theme}. Click to cycle themes.`}
            >
              {getThemeIcon()}
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
                    <>
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="hidden sm:inline text-sm">
                        {user.displayName || "Account"}
                      </span>
                    </>
                  }
                  align="right"
                >
                  <div className="px-4 py-2 text-sm border-b border-primary-200 dark:border-primary-700">
                    <div className="font-medium text-gray-900 dark:text-light-100">
                      {user.displayName || "Anonymous User"}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {user.email}
                    </div>
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
