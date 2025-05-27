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
  History,
  FileWarning,
  Shield,
  LayoutDashboard,
  ClipboardList,
  Target,
  AlertTriangle,
  Database,
  BadgeCheck,
  CreditCard,
  CircuitBoard,
  LockKeyhole,
  Bell,
  PaintBucket,
  UserCog,
  Hospital,
  Landmark,
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
      title: "Overview",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
        },
        {
          title: "History",
          url: "#",
          icon: History,
        },
        {
          title: "Reports",
          url: "#",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Analysis",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Assessments",
          url: "#",
          icon: Target,
        },
        {
          title: "Threats",
          url: "#",
          icon: AlertTriangle,
        },
        {
          title: "Vulnerabilities",
          url: "#",
          icon: FileWarning,
        },
        {
          title: "Assets",
          url: "#",
          icon: Database,
        },
      ],
    },
    {
      title: "Frameworks",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "NIST SP 800-53",
          url: "#",
          icon: Shield,
        },
        {
          title: "ISO 27001",
          url: "#",
          icon: BadgeCheck,
        },
        {
          title: "CIS Controls",
          url: "#",
          icon: CircuitBoard,
        },
        {
          title: "PCI DSS",
          url: "#",
          icon: Landmark,
        },
        {
          title: "HIPAA",
          url: "#",
          icon: Hospital,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Account",
          url: "/account",
          icon: UserCog,
        },
        {
          title: "Appearance",
          url: "/appearance",
          icon: PaintBucket,
        },
        {
          title: "Notifications",
          url: "/notifications",
          icon: Bell,
        },
        {
          title: "Security",
          url: "/security",
          icon: LockKeyhole,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: CreditCard,
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
