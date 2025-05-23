"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Github, User } from "lucide-react";
import Link from "next/link";

interface RegisterFormProps {
  redirectTo?: string;
  onSuccess?: () => void;
}

export function RegisterForm({
  redirectTo = "/focus",
  onSuccess,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const router = useRouter();

  // Validation helper
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email) {
      toast.error("Please enter your email");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  // Handle form input changes
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Handle email/password registration
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await registerWithEmailAndPassword(
        formData.email,
        formData.password,
        formData.name
      );
      toast.success("Account created successfully!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("email-already-in-use")) {
          toast.error("An account with this email already exists");
        } else if (errorMessage.includes("invalid-email")) {
          toast.error("Please enter a valid email address");
        } else if (errorMessage.includes("weak-password")) {
          toast.error("Password should be at least 6 characters");
        } else {
          toast.error("Registration failed. Please try again");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth registration
  const handleGoogleRegister = async () => {
    setSocialLoading("google");

    try {
      await signInWithGoogle();
      toast.success("Account created successfully!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("Google registration error:", error);
      if (error instanceof Error && error.message.includes("popup-closed")) {
        toast.error("Sign-up was cancelled");
      } else {
        toast.error("Google sign-up failed");
      }
    } finally {
      setSocialLoading(null);
    }
  };

  // Handle GitHub OAuth registration
  const handleGithubRegister = async () => {
    setSocialLoading("github");

    try {
      await signInWithGithub();
      toast.success("Account created successfully!");
      onSuccess?.();
      router.push(redirectTo);
    } catch (error) {
      console.error("GitHub registration error:", error);
      if (error instanceof Error && error.message.includes("popup-closed")) {
        toast.error("Sign-up was cancelled");
      } else {
        toast.error("GitHub sign-up failed");
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Save your preferences and track your progress
          </p>
        </div>

        {/* Social Registration Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleRegister}
            disabled={!!socialLoading}
            loading={socialLoading === "google"}
          >
            <Mail className="w-4 h-4 mr-2" />
            Sign up with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGithubRegister}
            disabled={!!socialLoading}
            loading={socialLoading === "github"}
          >
            <Github className="w-4 h-4 mr-2" />
            Sign up with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Or create with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange("name")}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="pl-10"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                placeholder="Create a password (min. 6 characters)"
                required
                autoComplete="new-password"
                className="pr-10"
                minLength={6}
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

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
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
            Create Account
          </Button>
        </form>

        {/* Terms and Privacy */}
        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
        </p>

        {/* Links */}
        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Sign in
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
