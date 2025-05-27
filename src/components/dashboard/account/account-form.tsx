"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const timezones = [
  { label: "Pacific Standard Time (PST)", value: "America/Los_Angeles" },
  { label: "Eastern Standard Time (EST)", value: "America/New_York" },
  { label: "Coordinated Universal Time (UTC)", value: "UTC" },
  { label: "Central European Time (CET)", value: "Europe/Paris" },
  { label: "Eastern European Time (EET)", value: "Europe/Helsinki" },
  { label: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
  { label: "Australian Eastern Time (AET)", value: "Australia/Sydney" },
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  language: z.string({
    required_error: "Please select a language.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  bio: z.string().max(160).optional(),
  avatar: z.string().url().optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>



export function AccountForm() {
  const { data: session, update, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Use static default values for initial server-side rendering
  const staticDefaults: Partial<AccountFormValues> = {
    name: "",
    email: "",
    language: "en",
    timezone: "UTC",
    bio: "",
    avatar: "",
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: staticDefaults,
  })
  
  // Update form values when session data becomes available on the client
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }
    
    if (session?.user) {
      // Reset the form with session values once available
      form.reset({
        name: session.user.name || "",
        email: session.user.email || "",
        language: "en",
        timezone: "UTC",
        bio: "",
        avatar: session.user.image || "",
      })
    }
    
    setIsLoading(false)
  }, [session, status, form])

  async function onSubmit(data: AccountFormValues) {
    try {
      setIsSubmitting(true)

      // Call API to update user profile
      const response = await fetch("/api/account/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update account")
      }

      // Only update the session if it exists
      if (session) {
        await update({
          name: data.name,
          email: data.email,
          image: data.avatar,
        })
      }

      toast.success("Your account has been updated", {
        description: "Your profile changes have been saved successfully.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to update your account. Please try again.";
      
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
          <p className="text-muted-foreground">Loading account settings...</p>
        </div>
      </div>
    )
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormDescription>
                  Your email address is used for account notifications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/your-avatar.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL to your profile picture.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us about yourself" {...field} />
                </FormControl>
                <FormDescription>
                  Brief description for your profile (max 160 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used for your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Timezone</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? timezones.find(
                              (timezone) => timezone.value === field.value
                            )?.label
                          : "Select timezone"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search timezone..." />
                      <CommandList>
                        <CommandEmpty>No timezone found.</CommandEmpty>
                        <CommandGroup>
                          {timezones.map((timezone) => (
                            <CommandItem
                              value={timezone.label}
                              key={timezone.value}
                              onSelect={() => {
                                form.setValue("timezone", timezone.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  timezone.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {timezone.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your timezone will be used for date and time display.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update account"}
        </Button>
      </form>
    </Form>
  )
}
