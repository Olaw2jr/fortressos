"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { login } from "@/auth/auth-actions";

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

// Schema for the verification code
const TwoFactorVerifySchema = z.object({
  code: z.string().min(6, "Code must be 6 digits").max(6),
});

export function TwoFactorVerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  
  const [error, setError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  // Redirect if email or password is missing
  React.useEffect(() => {
    if (!email || !password) {
      router.push("/auth/login");
    }
  }, [email, password, router]);

  // Define the form
  const form = useForm<z.infer<typeof TwoFactorVerifySchema>>({
    resolver: zodResolver(TwoFactorVerifySchema),
    defaultValues: {
      code: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof TwoFactorVerifySchema>) => {
    setError("");
    setIsPending(true);

    try {
      const result = await login({
        email,
        password,
        code: values.code
      });

      if (result?.error) {
        setError(result.error);
        form.reset();
      }

      if (result?.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerTitle="Two-Factor Authentication"
      headerDescription="Enter your authentication code"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="123456"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Verify
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}