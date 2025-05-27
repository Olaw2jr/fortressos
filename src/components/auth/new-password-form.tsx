"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPassword } from "@/lib/auth/auth-actions";
import { ResetPasswordSchema } from "@/lib/auth/auth-schemas";

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
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, setIsPending] = useState(false);

  // Redirect if no token is present
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // Define the form
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setSuccess("");
    setIsPending(true);

    if (!token) {
      setIsPending(false);
      return;
    }

    try {
      const result = await resetPassword(token, values);

      if (result?.error) {
        setIsPending(false);
        form.reset();
      }

      if (result?.success) {
        setSuccess(result.success);
        form.reset();

        // Redirect to login page after successful password reset
        setTimeout(() => {
          router.push("/login?reset=true");
        }, 2000);
      }
    } catch {
      // Catch without parameter to avoid unused variable warning
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerTitle="Reset Password"
      headerDescription="Enter your new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
