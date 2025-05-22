"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoginSchema } from "@/auth/auth-actions";
import { login, sendMagicLink } from "@/auth/auth-actions";

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
    setIsPending(true);

    try {
      const result = await login(values);

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
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
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
                            <a href="/auth/reset-password">
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

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

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