"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
} from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Github } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
}

export function LoginForm({
  redirectTo = "/environments",
  onSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const router = useRouter();

  // Handle email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
      // Handle specific Firebase auth errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("user-not-found")) {
          toast.error("No account found with this email");
        } else if (errorMessage.includes("wrong-password")) {
          toast.error("Incorrect password");
        } else if (errorMessage.includes("invalid-email")) {
          toast.error("Please enter a valid email address");
        } else if (errorMessage.includes("too-many-requests")) {
          toast.error("Too many failed attempts. Please try again later");
        } else {
          toast.error("Login failed. Please check your credentials");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    setSocialLoading("google");

    try {
      await signInWithGoogle();
      toast.success("Welcome!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("Google login error:", error);
      if (error instanceof Error && error.message.includes("popup-closed")) {
        toast.error("Sign-in was cancelled");
      } else {
        toast.error("Google sign-in failed");
      }
    } finally {
      setSocialLoading(null);
    }
  };

  // Handle GitHub OAuth login
  const handleGithubLogin = async () => {
    setSocialLoading("github");

    try {
      await signInWithGithub();
      toast.success("Welcome!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("GitHub login error:", error);
      if (error instanceof Error && error.message.includes("popup-closed")) {
        toast.error("Sign-in was cancelled");
      } else {
        toast.error("GitHub sign-in failed");
      }
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your saved preferences and statistics
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={!!socialLoading}
            loading={socialLoading === "google"}
          >
            <Mail className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGithubLogin}
            disabled={!!socialLoading}
            loading={socialLoading === "github"}
          >
            <Github className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading || !!socialLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Links */}
        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Forgot your password?
            </Link>
          </p>
        </div>

        {/* Continue Without Account */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => router.push(redirectTo)}
          >
            Continue without account
          </Button>
        </div>
      </div>
    </Card>
  );
}
