"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { setupTwoFactor, enableTwoFactor } from "@/lib/auth/auth-actions";
import { auth } from "@/lib/auth/auth-config";

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
import { Loader2, Copy, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Schema for the verification code
const TwoFactorSchema = z.object({
  code: z.string().min(6, "Code must be 6 digits").max(6),
});

export function TwoFactorSetupForm() {
  const router = useRouter();
  const [successMessage, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [isPending2, startTransition] = useTransition();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [copied, setCopied] = useState(false);

  // Define the form
  const form = useForm<z.infer<typeof TwoFactorSchema>>({
    resolver: zodResolver(TwoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  // Initialize 2FA setup
  const initSetup = async () => {
    setSuccess("");
    setIsPending(true);

    try {
      const session = await auth();
      
      if (!session?.user?.id) {
        router.push("/login");
        return;
      }

      const result = await setupTwoFactor(session.user.id);

      if (result?.error) {
        setIsPending(false);
        return;
      }

      if (result?.success && result.qrCodeUrl) {
        // Await the qrCodeUrl promise before setting it to state
        const qrCodeData = await result.qrCodeUrl;
        setQrCode(qrCodeData);
        setSuccess(result.success);
      }
    } catch {
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  // Handle form submission to verify and enable 2FA
  const onSubmit = async (values: z.infer<typeof TwoFactorSchema>) => {
    setSuccess("");
    setIsPending(true);

    try {
      const session = await auth();
      
      if (!session?.user?.id) {
        router.push("/login");
        return;
      }

      const result = await enableTwoFactor(session.user.id, values.code);

      if (result?.error) {
        setIsPending(false);
        return;
      }

      if (result?.success && result.backupCodes) {
        setBackupCodes(result.backupCodes);
        setSuccess(result.success);
        form.reset();
      }
    } catch {
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  // Copy backup codes to clipboard
  const copyBackupCodes = () => {
    if (backupCodes) {
      navigator.clipboard.writeText(backupCodes.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <CardWrapper
      headerTitle="Two-Factor Authentication"
      headerDescription="Enhance your account security"
      backButtonLabel="Back to settings"
      backButtonHref="/settings"
    >
      {!qrCode && !backupCodes && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>
              Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
            </p>
          </div>
          <Button
            onClick={initSetup}
            className="w-full"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Set up two-factor authentication
          </Button>
        </div>
      )}

      {qrCode && !backupCodes && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="mx-auto w-64 h-64 relative">
              <Image 
                src={qrCode} 
                alt="QR Code for 2FA" 
                width={256} 
                height={256}
                className="border p-2 rounded-md"
              />
            </div>
            <div className="text-sm text-center text-muted-foreground">
              <p>
                Scan the QR code with an authenticator app like Google Authenticator or Authy. Then enter the 6-digit code below.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {successMessage && (
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <Check className="w-4 h-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Verify and Enable
              </Button>
            </form>
          </Form>
        </div>
      )}

      {backupCodes && (
        <div className="space-y-6">
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
            <Check className="w-4 h-4" />
            <AlertDescription>Two-factor authentication enabled successfully!</AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Backup Codes</h3>
            <div className="text-sm text-muted-foreground">
              <p>
                Save these backup codes in a secure place. You can use them to sign in if you lose access to your authenticator app.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-md">
              {backupCodes.map((code, index) => (
                <div key={index} className="font-mono text-sm">
                  {code}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={copyBackupCodes}
                className="flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy codes
                  </>
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={() => {
              startTransition(() => {
                router.push("/settings");
              });
            }}
            className="w-full"
            disabled={isPending2}
          >
            {isPending2 && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Continue to settings
          </Button>
        </div>
      )}
    </CardWrapper>
  );
}