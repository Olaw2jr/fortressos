"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  {
    name: "Week 1",
    newThreats: 4,
    remediated: 1,
  },
  {
    name: "Week 2",
    newThreats: 3,
    remediated: 2,
  },
  {
    name: "Week 3",
    newThreats: 5,
    remediated: 3,
  },
  {
    name: "Week 4",
    newThreats: 2,
    remediated: 4,
  },
]

const chartConfig = {
  newThreats: {
    label: "New Threats",
    color: "hsl(var(--chart-1))",
  },
  remediated: {
    label: "Remediated",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function ThreatTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Trends</CardTitle>
        <CardDescription>Weekly security threat activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 15,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="newThreats"
              type="monotone"
              stroke="var(--color-newThreats)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="remediated"
              type="monotone"
              stroke="var(--color-remediated)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Remediation rate improving <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing threat detection and remediation over 4 weeks
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
