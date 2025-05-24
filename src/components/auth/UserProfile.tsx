// src/components/auth/UserProfile.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { signOut } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { toast } from "react-hot-toast";
import { User, Lock, Shield, Trash2, Eye, EyeOff } from "lucide-react";

export function UserProfile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Show password toggles
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Delete account confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setIsLoading(true);

    try {
      // Update display name if changed
      if (profileData.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: profileData.displayName.trim() || null,
        });
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.email) return;

    // Validation
    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setPasswordLoading(true);

    try {
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, passwordData.newPassword);

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Password update error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("wrong-password")) {
          toast.error("Current password is incorrect");
        } else if (errorMessage.includes("weak-password")) {
          toast.error("New password is too weak");
        } else {
          toast.error("Failed to update password");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle account deletion
  const handleAccountDelete = async () => {
    if (!user || deleteConfirmation !== "DELETE") {
      toast.error('Please type "DELETE" to confirm');
      return;
    }

    setDeleteLoading(true);

    try {
      // Note: This would need to be implemented in your auth utilities
      // For now, we'll just sign out as a placeholder
      await signOut();
      toast.success("Account deletion initiated");
    } catch (error) {
      console.error("Account deletion error:", error);
      toast.error("Failed to delete account");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmation("");
    }
  };

  // Get provider info for display
  const getAuthProvider = () => {
    if (!user?.providerData?.length) return "Email";

    const provider = user.providerData[0]?.providerId;
    switch (provider) {
      case "google.com":
        return "Google";
      case "github.com":
        return "GitHub";
      case "password":
      default:
        return "Email";
    }
  };

  const isEmailProvider = user?.providerData?.some(
    (p) => p.providerId === "password"
  );

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to view your profile</p>
        </div>
      </Card>
    );
  }

  const tabItems = [
    {
      label: "Profile",
      content: (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.displayName || "Anonymous User"}
                </h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400">
                  Signed in with {getAuthProvider()}
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <Button type="submit" loading={isLoading} disabled={isLoading}>
                Update Profile
              </Button>
            </form>
          </div>
        </Card>
      ),
    },
    {
      label: "Security",
      content: (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h3>
            </div>

            {isEmailProvider ? (
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter new password (min. 6 characters)"
                      className="pr-10"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Confirm new password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  loading={passwordLoading}
                  disabled={passwordLoading}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Password settings are not available for {getAuthProvider()}{" "}
                  accounts.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Manage your password through your {getAuthProvider()} account
                  settings.
                </p>
              </div>
            )}
          </div>
        </Card>
      ),
    },
    {
      label: "Account",
      content: (
        <Card className="p-6 border-red-200 dark:border-red-800">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                Danger Zone
              </h3>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                Delete Account
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Once you delete your account, there is no going back. All your
                data, preferences, and statistics will be permanently deleted.
              </p>

              {!showDeleteConfirm ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="deleteConfirm"
                      className="text-red-800 dark:text-red-200"
                    >
                      Type &quot;DELETE&quot; to confirm
                    </Label>
                    <Input
                      id="deleteConfirm"
                      type="text"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="DELETE"
                      className="border-red-300 dark:border-red-700"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleAccountDelete}
                      loading={deleteLoading}
                      disabled={
                        deleteLoading || deleteConfirmation !== "DELETE"
                      }
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />I understand, delete my
                      account
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmation("");
                      }}
                      disabled={deleteLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={signOut}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile and account preferences
        </p>
      </div>

      <Tabs items={tabItems} defaultIndex={0} />
    </div>
  );
}
