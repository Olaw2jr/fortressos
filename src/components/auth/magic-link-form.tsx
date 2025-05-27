"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { verifyMagicLink, loginWithMagicToken } from "@/lib/auth/auth-actions";

import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function MagicLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  // Verify token automatically if present
  const verifyToken = useCallback(async () => {
    if (!token) return;

    setSuccess("");
    setError("");
    setIsPending(true);

    try {
      const result = await verifyMagicLink(token);

      if (result?.error) {
        setError(result.error);
        setIsPending(false);
        return;
      }

      if (result?.success) {
        setSuccess(result.success);
        
        // If we have a magic auth token, proceed with the second step of authentication
        if (result.magicAuthToken) {
          try {
            // After a slight delay to show success message
            setTimeout(async () => {
              // Use our new loginWithMagicToken function to complete the authentication
              const magicLoginResult = await loginWithMagicToken(result.magicAuthToken);
              
              if (magicLoginResult.error) {
                console.error('Magic link auth error:', magicLoginResult.error);
                setError(`Authentication error: ${magicLoginResult.error}. Please try logging in manually.`);
                setIsPending(false);
                return;
              }
              
              if (magicLoginResult.success && magicLoginResult.user) {
                // Successfully authenticated with magic token, now sign in using NextAuth
                const signInResult = await signIn('credentials', {
                  email: magicLoginResult.user.email,
                  // Special flag to indicate this is a pre-authenticated magic link login
                  magicToken: 'true',
                  redirect: false,
                  callbackUrl: '/overview'
                });
                
                if (signInResult && 'error' in signInResult) {
                  console.error('NextAuth sign-in error:', signInResult);
                  setError(`Authentication error: ${signInResult.error || 'Failed to sign in automatically'}. Please try logging in manually.`);
                  setIsPending(false);
                } else {
                  // If no error, manually redirect to overview
                  console.log('Magic link sign-in successful, redirecting...');
                  window.location.href = '/overview';
                }
              }
            }, 1500);
          } catch (err) {
            console.error("Magic link authentication error:", err);
            setError("Failed to sign in automatically. Please try logging in manually.");
            setIsPending(false);
          }
        } else {
          // If we don't have the magicAuthToken, just show success and a button to login
          setIsPending(false);
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("An unexpected error occurred");
      setIsPending(false);
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  // Render appropriate message based on state
  const renderContent = () => {
    // Loading state
    if (isPending) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground text-center">
            Verifying your magic link...
          </p>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="flex flex-col items-center gap-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground text-center">
            The magic link is invalid or has expired. Please request a new one.
          </p>
          <Button
            onClick={() => router.push("/login")}
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
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground text-center">
            You are being redirected to your dashboard...
          </p>
        </div>
      );
    }

    // Default state (no token)
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Magic Link Sign In</h3>
        <p className="text-sm text-muted-foreground text-center">
          Your magic link appears to be missing. Please request a new one from the login page.
        </p>
        <Button
          onClick={() => router.push("/login")}
          className="w-full"
        >
          Back to login
        </Button>
      </div>
    );
  };

  return (
    <CardWrapper
      headerTitle="Magic Link Sign In"
      headerDescription="Sign in securely with your magic link"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      {renderContent()}
    </CardWrapper>
  );
}
