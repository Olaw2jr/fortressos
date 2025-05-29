"use client"

import {
  FileText,
  Info,
  Search,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FrameworkComplianceChart from "@/components/dashboard/dashboard/framework-compliance-chart"
import ThreatTrendChart from "@/components/dashboard/dashboard/threat-trend-chart"
import AssetSecurityTable from "@/components/dashboard/dashboard/asset-security-table"
import RiskHeatmap from "@/components/dashboard/dashboard/risk-heatmap"
import TopVulnerabilitiesChart from "@/components/dashboard/dashboard/top-vulnerabilities-chart"

export default function DashboardPage() {

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex w-full items-center gap-2">
          <form className="relative flex flex-1 md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container py-6 md:py-8">
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Security Posture Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your security status across multiple frameworks
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Security Score</CardDescription>
                <CardTitle className="text-3xl">78/100</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Moderate Risk</span>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Moderate
                  </Badge>
                </div>
                <Progress value={78} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Threats</CardDescription>
                <CardTitle className="text-3xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">+3 from last week</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                    Critical: 3
                  </Badge>
                </div>
                <Progress value={35} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Vulnerable Assets</CardDescription>
                <CardTitle className="text-3xl">24/137</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">17.5% of all assets</span>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Medium
                  </Badge>
                </div>
                <Progress value={17.5} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Framework Compliance</CardDescription>
                <CardTitle className="text-3xl">83%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">12 controls pending</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Good
                  </Badge>
                </div>
                <Progress value={83} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="threats">Threats</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              </TabsList>

              <div className="hidden items-center gap-2 md:flex">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Select defaultValue="quantitative">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Analysis Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Analysis Type</SelectLabel>
                      <SelectItem value="quantitative">Quantitative</SelectItem>
                      <SelectItem value="qualitative">Qualitative</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Framework Compliance</CardTitle>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Compliance status across security frameworks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FrameworkComplianceChart />
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                    <span className="text-sm text-muted-foreground">Updated 3 hours ago</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>View Details</span>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Threat Trend</CardTitle>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>New and remediated threats over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ThreatTrendChart />
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                    <span className="text-sm text-muted-foreground">Updated 2 hours ago</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>View Details</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Asset Security Status</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">More options</span>
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Security status of critical assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <AssetSecurityTable />
                </CardContent>
                <CardFooter className="border-t px-6 py-3">
                  <Button variant="outline" className="w-full">
                    View All Assets
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Risk Heatmap</CardTitle>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Impact vs. probability analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RiskHeatmap />
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                    <span className="text-sm text-muted-foreground">Based on qualitative assessment</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>Details</span>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Top Vulnerabilities</CardTitle>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>Most critical vulnerabilities by CVSS score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopVulnerabilitiesChart />
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-3">
                    <span className="text-sm text-muted-foreground">5 critical vulnerabilities</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span>View All</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="threats" className="space-y-4">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Threat Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    This tab would contain detailed threat analysis information
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-4">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Asset Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    This tab would contain detailed asset analysis information
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="frameworks" className="space-y-4">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Framework Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    This tab would contain detailed framework compliance information
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
