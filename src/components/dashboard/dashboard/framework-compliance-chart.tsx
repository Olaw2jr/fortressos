"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
    name: "NIST",
    compliance: 82,
  },
  {
    name: "ISO 27001",
    compliance: 75,
  },
  {
    name: "CIS",
    compliance: 91,
  },
  {
    name: "PCI DSS",
    compliance: 89,
  },
  {
    name: "HIPAA",
    compliance: 78,
  },
]

const chartConfig = {
  compliance: {
    label: "Compliance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function FrameworkComplianceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Framework Compliance</CardTitle>
        <CardDescription>Security framework compliance scores</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="compliance"
              fill="var(--color-compliance)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average compliance: 83% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing compliance scores across security frameworks
        </div>
      </CardFooter>
    </Card>
  )
}
