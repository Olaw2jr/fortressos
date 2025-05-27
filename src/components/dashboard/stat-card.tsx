"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
};

export function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  className 
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {description}
            {trend && (
              <span 
                className={cn(
                  "ml-1 flex items-center", 
                  trend.positive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
