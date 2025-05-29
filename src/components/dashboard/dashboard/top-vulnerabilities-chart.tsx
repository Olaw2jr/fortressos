"use client"

import { AlertTriangle } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
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
    name: "SQL Injection",
    score: 8.7,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Auth Bypass",
    score: 9.2,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "XSS",
    score: 7.4,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Remote Code Exec",
    score: 9.8,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Outdated SSL",
    score: 6.5,
    fill: "hsl(var(--chart-2))",
  },
]

const chartConfig = {
  score: {
    label: "CVSS Score",
  },
  sqlInjection: {
    label: "SQL Injection",
    color: "hsl(var(--chart-3))",
  },
  authBypass: {
    label: "Auth Bypass",
    color: "hsl(var(--chart-1))",
  },
  xss: {
    label: "XSS",
    color: "hsl(var(--chart-3))",
  },
  remoteCodeExec: {
    label: "Remote Code Exec",
    color: "hsl(var(--chart-1))",
  },
  outdatedSsl: {
    label: "Outdated SSL",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function TopVulnerabilitiesChart() {
  const criticalCount = chartData.filter(item => item.score >= 9.0).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vulnerabilities</CardTitle>
        <CardDescription>Critical security vulnerabilities by CVSS score</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              type="number"
              domain={[0, 10]}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={120}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="score"
              layout="vertical"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              <LabelList
                dataKey="score"
                position="right"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {criticalCount} critical vulnerabilities (≥9.0) <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Vulnerabilities ranked by Common Vulnerability Scoring System (CVSS)
        </div>
      </CardFooter>
    </Card>
  )
}
