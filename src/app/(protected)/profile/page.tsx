import { Metadata } from "next";
import { UserProfile } from "@/components/auth/UserProfile";

export const metadata: Metadata = {
  title: "Profile | Ataraxia",
  description: "Manage your Ataraxia account settings and preferences.",
};

export default function ProfilePage() {
  return (
    <div className="py-8">
      <UserProfile />
    </div>
  );
}
