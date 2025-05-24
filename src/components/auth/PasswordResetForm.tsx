"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, {
        // Custom action code settings for better UX
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      });

      setIsEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Password reset error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("user-not-found")) {
          toast.error("No account found with this email address");
        } else if (errorMessage.includes("invalid-email")) {
          toast.error("Please enter a valid email address");
        } else if (errorMessage.includes("too-many-requests")) {
          toast.error("Too many requests. Please try again later");
        } else {
          toast.error("Failed to send reset email. Please try again");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Success state after email is sent
  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Check Your Email
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              {email}
            </p>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </p>
            <p>Don&apos;t see the email? Check your spam folder.</p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsEmailSent(false);
                setEmail("");
              }}
            >
              Send Another Email
            </Button>

            <Link href="/login">
              <Button type="button" variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  // Initial form state
  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <Label htmlFor="reset-email">Email Address</Label>
            <div className="relative">
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Send Reset Link
          </Button>
        </form>

        <div className="text-center">
          <Link href="/login">
            <Button type="button" variant="ghost" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}
