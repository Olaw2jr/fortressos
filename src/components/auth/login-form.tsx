"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { login, sendMagicLink, resendVerificationEmail } from "@/lib/auth/auth-actions";
import { LoginSchema } from "@/lib/auth/auth-schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  // Define the form
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setUnverifiedEmail(null);
    setIsPending(true);

    try {
      const result = await login(values);

      if (result?.error === "email-not-verified") {
        // Handle unverified email case
        setUnverifiedEmail(result.email || values.email);
        setIsPending(false);
        return;
      }

      if (result?.error) {
        setError(result.error);
        form.reset();
      }

      if (result?.success) {
        setSuccess(result.success);
        router.push("/dashboard");
      }

      if (result?.twoFactor) {
        setShowTwoFactor(true);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  // Handle verification email resend
  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;

    setIsResendingVerification(true);
    setError("");
    setSuccess("");

    try {
      const result = await resendVerificationEmail(unverifiedEmail);

      if (result?.error) {
        setError(result.error);
      }

      if (result?.success) {
        setSuccess(result.success);
      }
    } catch (err) {
      console.error("Error resending verification:", err);
      setError("Failed to resend verification email");
    } finally {
      setIsResendingVerification(false);
    }
  };

  // Handle magic link request
  const onMagicLinkRequest = async () => {
    const email = form.getValues("email");

    if (!email || !z.string().email().safeParse(email).success) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const result = await sendMagicLink(email);

      if (result?.error) {
        setError(result.error);
      }

      if (result?.success) {
        setSuccess(result.success);
        setIsMagicLinkSent(true);
        setMagicLinkEmail(email);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerTitle="Sign In"
      headerDescription="Welcome back to FortressOS"
      backButtonLabel="Don&apos;t have an account?"
      backButtonHref="/register"
    >
      {isMagicLinkSent ? (
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a magic link to <span className="font-medium">{magicLinkEmail}</span>.
            Click the link in the email to sign in to your account.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsMagicLinkSent(false);
              setMagicLinkEmail("");
              form.reset();
            }}
          >
            Back to sign in
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && error !== "email-not-verified" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 mb-4">
                <AlertCircle className="w-4 h-4 text-green-500" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {unverifiedEmail && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Please verify your email
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>
                        We&apos;ve sent a verification link to <span className="font-medium">{unverifiedEmail}</span>.
                        Please check your inbox and click the link to verify your email address.
                      </p>
                      <p className="mt-2">
                        Didn&apos;t receive the email? Check your spam folder or{" "}
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={isResendingVerification}
                          className="font-medium text-yellow-700 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200 underline"
                        >
                          {isResendingVerification ? "Sending..." : "click here to resend"}
                        </button>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="email@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="••••••••"
                            type="password"
                          />
                        </FormControl>
                        <div className="flex justify-end">
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0"
                            asChild
                          >
                            <a href="/reset-password">
                              Forgot password?
                            </a>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two-Factor Authentication Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                          autoComplete="one-time-code"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {showTwoFactor ? "Verify" : "Sign In"}
            </Button>
          </form>
        </Form>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with magic link
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={onMagicLinkRequest}
        disabled={isPending || isMagicLinkSent}
      >
        {isPending && !isMagicLinkSent && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        Magic Link
      </Button>
    </CardWrapper>
  );
}
