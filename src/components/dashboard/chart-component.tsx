"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type ChartComponentProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
};

export function ChartComponent({
  title,
  description,
  children,
  className,
  action,
}: ChartComponentProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// This component represents the bar chart seen in the design
// In a real implementation, you would use a chart library like recharts or chart.js
export function BarChart() {
  return (
    <div className="w-full h-[200px] mt-4">
      <div className="flex h-full items-end gap-2">
        {chartData.map((item, index) => (
          <div key={index} className="relative flex h-full flex-1 flex-col justify-end">
            <div
              className="bg-primary rounded-md w-full"
              style={{ height: `${item.value}%` }}
            ></div>
            <span className="text-muted-foreground mt-2 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example data for the chart
const chartData = [
  {
    label: "Jan",
    value: 65,
  },
  {
    label: "Feb",
    value: 40,
  },
  {
    label: "Mar",
    value: 85,
  },
  {
    label: "Apr",
    value: 60,
  },
  {
    label: "May",
    value: 35,
  },
  {
    label: "Jun",
    value: 72,
  },
  {
    label: "Jul",
    value: 50,
  },
];
