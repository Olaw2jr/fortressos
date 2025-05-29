"use client"

import { AlertTriangle } from "lucide-react"
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis, Cell } from "recharts"
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
  { x: 0.8, y: 0.9, z: 400, name: "Data Breach" },
  { x: 0.9, y: 0.7, z: 300, name: "Ransomware" },
  { x: 0.7, y: 0.8, z: 200, name: "Insider Threat" },
  { x: 0.5, y: 0.4, z: 240, name: "DDoS Attack" },
  { x: 0.3, y: 0.2, z: 180, name: "Physical Breach" },
  { x: 0.4, y: 0.3, z: 120, name: "Social Engineering" },
  { x: 0.2, y: 0.5, z: 270, name: "Supply Chain Attack" },
  { x: 0.8, y: 0.2, z: 210, name: "Zero-day Exploit" },
  { x: 0.1, y: 0.7, z: 150, name: "Configuration Error" },
]

const chartConfig = {
  riskMatrix: {
    label: "Risk Matrix",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const getColor = (x: number, y: number) => {
  const riskLevel = x * y
  if (riskLevel > 0.6) return "#ef4444" // Red for high risk
  if (riskLevel > 0.3) return "#f59e0b" // Amber for medium risk
  return "#22c55e" // Green for low risk
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="rounded-md border bg-background p-3 shadow-md">
        <p className="font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Probability: {(Number(data.x) * 100).toFixed(0)}%
        </p>
        <p className="text-sm text-muted-foreground">
          Impact: {(Number(data.y) * 100).toFixed(0)}%
        </p>
        <p className="text-sm text-muted-foreground">
          Risk Score: {(data.x * data.y * 100).toFixed(0)}%
        </p>
      </div>
    )
  }
  return null
}

export default function RiskHeatmap() {
  const highRiskCount = chartData.filter(item => item.x * item.y > 0.6).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Assessment Matrix</CardTitle>
        <CardDescription>Security risk probability vs impact analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ScatterChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 40,
              left: 40,
            }}
          >
            <XAxis
              type="number"
              dataKey="x"
              name="Probability"
              domain={[0, 1]}
              tickCount={6}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Impact"
              domain={[0, 1]}
              tickCount={6}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip />}
            />
            <Scatter name="Risk Matrix" data={chartData}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.x, entry.y)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {highRiskCount} high-risk threats identified <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Risk matrix showing probability vs impact correlation
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
