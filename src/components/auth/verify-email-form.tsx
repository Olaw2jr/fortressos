"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";

import { verifyEmail } from "@/auth/auth-actions";

import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { AlertCircle, Loader2, CheckCircle, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Verify token automatically if present
  const verifyToken = useCallback(async () => {
    if (!token) return;
    
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const result = await verifyEmail(token);

      if (result?.error) {
        setError(result.error);
      }

      if (result?.success) {
        setSuccess(result.success);
        // Redirect to login page after successful verification
        setTimeout(() => {
          router.push("/auth/login?verified=true");
        }, 2000);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
      setIsLoaded(true);
    }
  }, [token, router]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  // Render appropriate message based on whether token is present
  const renderContent = () => {
    // Loading state
    if (isPending) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-center text-sm text-muted-foreground">
            Verifying your email address...
          </p>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="flex flex-col items-center gap-4">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground text-center">
            Please try again or contact support if you continue to have problems.
          </p>
          <Button 
            onClick={() => router.push("/auth/login")}
            className="w-full"
          >
            Back to login
          </Button>
        </div>
      );
    }

    // Success state (token was verified)
    if (success) {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold">Email Verified</h3>
          <p className="text-sm text-muted-foreground text-center">
            Your email has been verified successfully. You can now sign in to your account.
          </p>
          <Button 
            onClick={() => router.push("/auth/login")}
            className="w-full"
          >
            Continue to login
          </Button>
        </div>
      );
    }

    // Initial state (no token, just email - showing instructions)
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Check your email</h3>
        <p className="text-sm text-muted-foreground text-center">
          {email ? (
            <>We've sent a verification link to <span className="font-medium">{email}</span>.</>
          ) : (
            <>We've sent a verification link to your email address.</>
          )}
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Click the link in the email to verify your account.
        </p>
        <Button 
          variant="outline"
          onClick={() => router.push("/auth/login")}
          className="w-full"
        >
          Back to login
        </Button>
      </div>
    );
  };

  return (
    <CardWrapper
      headerTitle="Verify Email"
      headerDescription="Confirm your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-center justify-center w-full space-y-6">
        {renderContent()}
      </div>
    </CardWrapper>
  );
}
