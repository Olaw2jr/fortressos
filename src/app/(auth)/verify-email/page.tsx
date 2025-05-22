import { Metadata } from "next";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { auth } from "@/auth/auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Email | FortressOS",
  description: "Verify your email address for your FortressOS account",
};

export default async function VerifyEmailPage() {
  // Check if the user is already authenticated
  const session = await auth();

  // If user is already authenticated, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <VerifyEmailForm />
    </div>
  );
}