import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/auth/auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register | FortressOS",
  description: "Create a new FortressOS account",
};

export default async function RegisterPage() {
  // Check if the user is already authenticated
  const session = await auth();

  // Redirect to dashboard if already logged in
  if (session?.user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}