import { Metadata } from "next";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

export const metadata: Metadata = {
  title: "Reset Password | Ataraxia",
  description: "Reset your Ataraxia account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <PasswordResetForm />
    </div>
  );
}
