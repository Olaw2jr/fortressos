"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

const notificationsFormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

// Default values will be loaded from the user session

export function NotificationsForm() {
  const { data: session, update, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Use static default values initially
  const staticDefaults: Partial<NotificationsFormValues> = {
    type: "all",
    mobile: false,
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
  }
  
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: staticDefaults,
  })
  
  // Update form values when session data becomes available
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }
    
    if (session?.user) {
      // Only reset the form with session values if we have a user session
      form.reset({
        type: session?.user?.notificationType as "all" | "mentions" | "none" || "all",
        mobile: session?.user?.mobilePushEnabled || false,
        communication_emails: session?.user?.communicationEmails || false,
        marketing_emails: session?.user?.marketingEmails || false,
        social_emails: session?.user?.socialEmails || true,
        security_emails: session?.user?.securityEmails || true,
      })
    }
    
    setIsLoading(false)
  }, [session, status, form])

  async function onSubmit(data: NotificationsFormValues) {
    try {
      setIsSubmitting(true)
      
      // Call API to update user's notification settings
      const response = await fetch("/api/notifications/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update notification settings")
      }
      
      // Only update the session if it exists
      if (session) {
        await update({
          notificationType: data.type,
          mobilePushEnabled: data.mobile,
          communicationEmails: data.communication_emails,
          marketingEmails: data.marketing_emails,
          socialEmails: data.social_emails,
          securityEmails: data.security_emails,
        })
      }
      
      toast.success("Notification settings updated", {
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to update notification settings. Please try again.";
      
      toast.error("Something went wrong", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show a loading state when session is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading notification settings...</p>
        </div>
      </div>
    )
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="communication_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Communication emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Social emails</FormLabel>
                    <FormDescription>
                      Receive emails for friend requests, follows, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account activity and security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update notifications"}
        </Button>
      </form>
    </Form>
  )
}
