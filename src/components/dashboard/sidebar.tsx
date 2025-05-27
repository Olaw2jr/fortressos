"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { SidebarMain } from "@/components/dashboard/sidebar-main"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import { SidebarUser } from "@/components/dashboard/sidebar-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/account",
        },
        {
          title: "Appearance",
          url: "/appearance",
        },
        {
          title: "Notifications",
          url: "/notifications",
        },
        {
          title: "Security",
          url: "/security",
        },
        {
          title: "Billing",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = useState({
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/default.jpg",
  });

  // Only run session logic on the client
  useEffect(() => {
    // Get session data safely on the client side only
    const getSession = async () => {
      try {
        // Dynamically import to avoid SSR issues
        const { getSession } = await import('next-auth/react');
        const session = await getSession();
        
        if (session?.user) {
          setUserData({
            name: session.user.name || "User",
            email: session.user.email || "no-email@example.com",
            avatar: session.user.image || "/avatars/default.jpg",
          });
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      }
    };

    getSession();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
