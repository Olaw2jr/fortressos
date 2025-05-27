"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
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

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  font: z.enum(["inter", "manrope", "system"], {
    invalid_type_error: "Select a font",
    required_error: "Please select a font.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// Default values will be loaded from the user session

export function AppearanceForm() {
  const { data: session, update, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Use static default values initially
  const staticDefaults: Partial<AppearanceFormValues> = {
    theme: "light",
    font: "inter",
  }
  
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
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
        theme: session?.user?.theme as "light" | "dark" || "light",
        font: session?.user?.font as "inter" | "manrope" | "system" || "inter",
      })
    }
    
    setIsLoading(false)
  }, [session, status, form])

  async function onSubmit(data: AppearanceFormValues) {
    try {
      setIsSubmitting(true)
      
      // Call API to update user's appearance settings
      const response = await fetch("/api/appearance/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update appearance settings")
      }
      
      // Only update the session if it exists
      if (session) {
        await update({
          theme: data.theme,
          font: data.font,
        })
      }
      
      toast.success("Appearance settings updated", {
        description: "Your appearance preferences have been saved.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to update appearance settings. Please try again.";
      
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
          <p className="text-muted-foreground">Loading appearance settings...</p>
        </div>
      </div>
    )
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none font-normal"
                    )}
                    {...field}
                  >
                    <option value="inter">Inter</option>
                    <option value="manrope">Manrope</option>
                    <option value="system">System</option>
                  </select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update preferences"}
        </Button>
      </form>
    </Form>
  )
}
