"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuDivider,
} from "@/components/ui/DropdownMenu";
import {
  Menu,
  Timer,
  Mountain,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <DropdownMenu
      trigger={<Menu className="w-5 h-5" />}
      align="right"
      className="w-64"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Mountain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-gray-900 dark:text-white">
            Ataraxia
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <DropdownMenuItem onClick={() => handleNavigation("/focus")}>
        <div className="flex items-center space-x-3">
          <Mountain className="w-5 h-5" />
          <span>Focus Environment</span>
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigation("/timer")}>
        <div className="flex items-center space-x-3">
          <Timer className="w-5 h-5" />
          <span>Timer Only</span>
        </div>
      </DropdownMenuItem>

      {user && (
        <DropdownMenuItem onClick={() => handleNavigation("/analytics")}>
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </div>
        </DropdownMenuItem>
      )}

      <DropdownMenuDivider />

      {/* User Section */}
      {user ? (
        <>
          {/* User Info */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {user.displayName || "Anonymous User"}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
            <div className="flex items-center space-x-3">
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-red-600 dark:text-red-400"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </div>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem onClick={() => handleNavigation("/login")}>
            <div className="flex items-center justify-center">
              <span>Sign In</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigation("/register")}>
            <div className="flex items-center justify-center font-medium">
              <span>Sign Up</span>
            </div>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenu>
  );
}
