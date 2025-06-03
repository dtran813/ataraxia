import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/theme/ThemeContext";
import { useAuth } from "@/contexts/auth/AuthContext";
import {
  Plus,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Monitor,
  LogIn,
  LogOut,
} from "lucide-react";

export function SidebarContent() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <Mountain className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Ataraxia
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20 px-4 py-3 text-primary-700 dark:text-primary-300 font-medium">
          <Leaf className="h-4 w-4" />
          My Environments
        </div>

        <button className="flex w-full items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
          <Plus className="h-4 w-4" />
          Create Environment
        </button>
      </nav>

      {/* Theme Selection */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
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
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-sm cursor-pointer",
                  isActive
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-transparent"
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

      {/* Sign Out */}
      <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
        {user ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Signed in as {user.displayName || user.email}
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-900/20 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
