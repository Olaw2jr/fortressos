import { Metadata } from "next";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { auth } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password | FortressOS",
  description: "Create a new password for your FortressOS account",
};

export default async function NewPasswordPage() {
  // Check if the user is already authenticated
  const session = await auth();

  // Redirect to dashboard if already logged in
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <NewPasswordForm />
    </div>
  );
}