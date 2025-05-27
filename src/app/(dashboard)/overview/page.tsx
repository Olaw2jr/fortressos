import { Metadata } from "next";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartComponent, BarChart } from "@/components/dashboard/chart-component";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Users, ShieldCheck, KeyRound, ActivitySquare } from "lucide-react";
import { auth } from "@/lib/auth/auth-config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - FortressOS",
  description: "FortressOS Administration Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-muted-foreground">
        Welcome back! Here&apos;s an overview of your security system.
      </p>

        {/* Stats grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="2,853"
            icon={<Users className="h-4 w-4" />}
            description="Active accounts"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Security Score"
            value="94%"
            icon={<ShieldCheck className="h-4 w-4" />}
            description="System protection level"
            trend={{ value: 4, positive: true }}
          />
          <StatCard
            title="Authentication Events"
            value="14,392"
            icon={<KeyRound className="h-4 w-4" />}
            description="Past 30 days"
          />
          <StatCard
            title="Failed Attempts"
            value="32"
            icon={<ActivitySquare className="h-4 w-4" />}
            description="Past 7 days"
            trend={{ value: 18, positive: false }}
          />
        </div>

        {/* Charts and activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ChartComponent
            title="Authentication Trends"
            description="Weekly authentication activity"
            className="lg:col-span-4"
          >
            <BarChart />
          </ChartComponent>

          <RecentActivity className="lg:col-span-3" />
        </div>
    </div>
  );
}
