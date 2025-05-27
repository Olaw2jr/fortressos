"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="bg-background z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex w-full items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 bg-muted/25 text-muted-foreground h-8 w-full md:w-64 lg:w-96"
          />
          <kbd className="bg-muted pointer-events-none absolute right-2 top-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-auto">
          <NotificationItem
            title="Security alert"
            description="New login detected from unknown device"
            time="2 minutes ago"
          />
          <NotificationItem
            title="System update"
            description="FortressOS has been updated to version 2.1.0"
            time="1 hour ago"
          />
          <NotificationItem
            title="User activity"
            description="3 new users registered in the last 24 hours"
            time="1 day ago"
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-center font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex items-start gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Bell className="h-4 w-4 text-primary" />
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
