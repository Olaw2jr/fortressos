"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ActivityProps = {
  className?: string;
};

export function RecentActivity({ className }: ActivityProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed in your system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.userAvatar} alt={activity.user} />
                <AvatarFallback>{getInitials(activity.user)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get initials from a name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Example data
const activities = [
  {
    user: "Sarah Johnson",
    userAvatar: "/avatars/sarah-johnson.webp",
    action: "Created a new project: FortressOS Mobile",
    timestamp: "2 min ago",
  },
  {
    user: "Michael Chen",
    userAvatar: "/avatars/michael-chen.webp",
    action: "Updated security settings for Project Alpha",
    timestamp: "45 min ago",
  },
  {
    user: "Alex Rodriguez",
    userAvatar: "/avatars/alex-rodriguez.webp",
    action: "Added 3 new team members to Project Beta",
    timestamp: "2 hours ago",
  },
  {
    user: "Emma Wilson",
    userAvatar: "/avatars/emma-wilson.webp",
    action: "Enabled two-factor authentication",
    timestamp: "5 hours ago",
  },
  {
    user: "James Taylor",
    userAvatar: "/avatars/james-taylor.webp",
    action: "Created a new API token for integration",
    timestamp: "1 day ago",
  },
];
