"use client"

import { useState, useEffect } from "react"
// Removed useSession import since middleware handles auth
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Password change schema
const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type PasswordChangeValues = z.infer<typeof passwordChangeSchema>

export function SecurityForm() {
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)
  const [isTogglingTwoFactor, setIsTogglingTwoFactor] = useState(false)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)

  // Initialize two-factor state
  useEffect(() => {
    setIsTwoFactorEnabled(false) // This should be fetched from API
  }, [])

  // Initialize the password change form
  const passwordForm = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Handle password change submission
  async function onSubmitPassword(values: PasswordChangeValues) {
    try {
      setIsSubmittingPassword(true)

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to change password')
      }

      toast.success('Password changed successfully')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password'
      toast.error('Something went wrong', {
        description: errorMessage,
      })
    } finally {
      setIsSubmittingPassword(false)
    }
  }

  // Handle two-factor authentication toggle
  async function toggleTwoFactor() {
    try {
      setIsTogglingTwoFactor(true)

      // Call API to toggle two-factor authentication
      const response = await fetch("/api/security/toggle-two-factor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled: !isTwoFactorEnabled,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to toggle two-factor authentication")
      }

      setIsTwoFactorEnabled(!isTwoFactorEnabled)

      toast.success(`Two-factor authentication ${!isTwoFactorEnabled ? "enabled" : "disabled"}`, {
        description: `Your account is now ${!isTwoFactorEnabled ? "more secure" : "less secure"}.`,
      })
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to toggle two-factor authentication. Please try again.";

      toast.error("Something went wrong", {
        description: errorMessage,
      })
    } finally {
      setIsTogglingTwoFactor(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={isSubmittingPassword}
              >
                {isSubmittingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by enabling two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {isTwoFactorEnabled ? "Enabled" : "Disabled"}
              </FormLabel>
              <FormDescription>
                {isTwoFactorEnabled
                  ? "Your account is protected by two-factor authentication."
                  : "Enable two-factor authentication for additional security."}
              </FormDescription>
            </div>
            <Switch
              checked={isTwoFactorEnabled}
              onCheckedChange={toggleTwoFactor}
              disabled={isTogglingTwoFactor}
              aria-readonly={isTogglingTwoFactor}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
