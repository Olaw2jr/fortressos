import { Metadata } from "next";
import { TwoFactorVerifyForm } from "@/components/auth/two-factor-verify-form";
import { auth } from "@/auth/auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Two-Factor Authentication | FortressOS",
  description: "Verify your identity with two-factor authentication",
};

export default async function TwoFactorPage() {
  // Check if the user is already authenticated
  const session = await auth();

  // Redirect to dashboard if already logged in
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <TwoFactorVerifyForm />
    </div>
  );
}