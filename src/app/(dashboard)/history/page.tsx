"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Download,
  Eye,
  Filter,
  History,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const assessmentHistory = [
  {
    id: "ASS-2024-001",
    date: "2024-01-15",
    time: "14:30",
    type: "Full Assessment",
    framework: "NIST",
    score: 78,
    previousScore: 75,
    status: "Completed",
    duration: "2h 15m",
    assessor: "John Smith",
    assets: 137,
    threats: 12,
    vulnerabilities: 24,
  },
  {
    id: "ASS-2024-002",
    date: "2024-01-10",
    time: "09:15",
    type: "Threat Assessment",
    framework: "ISO 27001",
    score: 82,
    previousScore: 80,
    status: "Completed",
    duration: "1h 45m",
    assessor: "Sarah Johnson",
    assets: 89,
    threats: 8,
    vulnerabilities: 15,
  },
  {
    id: "ASS-2024-003",
    date: "2024-01-08",
    time: "16:20",
    type: "Asset Review",
    framework: "CIS Controls",
    score: 91,
    previousScore: 88,
    status: "Completed",
    duration: "3h 10m",
    assessor: "Mike Chen",
    assets: 156,
    threats: 5,
    vulnerabilities: 8,
  },
  {
    id: "ASS-2024-004",
    date: "2024-01-05",
    time: "11:00",
    type: "Compliance Check",
    framework: "PCI DSS",
    score: 89,
    previousScore: 85,
    status: "Completed",
    duration: "1h 30m",
    assessor: "Lisa Wang",
    assets: 67,
    threats: 3,
    vulnerabilities: 12,
  },
  {
    id: "ASS-2024-005",
    date: "2024-01-03",
    time: "13:45",
    type: "Full Assessment",
    framework: "HIPAA",
    score: 76,
    previousScore: 78,
    status: "Completed",
    duration: "2h 45m",
    assessor: "David Brown",
    assets: 98,
    threats: 15,
    vulnerabilities: 28,
  },
  {
    id: "ASS-2024-006",
    date: "2023-12-28",
    time: "10:30",
    type: "Quarterly Review",
    framework: "NIST",
    score: 75,
    previousScore: 72,
    status: "Completed",
    duration: "4h 20m",
    assessor: "John Smith",
    assets: 134,
    threats: 18,
    vulnerabilities: 32,
  },
]

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedFramework, setSelectedFramework] = useState("all")

  const filteredHistory = assessmentHistory.filter((assessment) => {
    const matchesType = selectedFilter === "all" || assessment.type.toLowerCase().includes(selectedFilter.toLowerCase())
    const matchesFramework = selectedFramework === "all" || assessment.framework === selectedFramework
    return matchesType && matchesFramework
  })

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex w-full items-center gap-2">
          <form className="relative flex flex-1 md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search assessments..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container py-6 md:py-8">
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Assessment History</h1>
            <p className="text-muted-foreground">
              Track and review your security assessment history across all frameworks
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Assessments</CardDescription>
                <CardTitle className="text-2xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+3 this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Score</CardDescription>
                <CardTitle className="text-2xl">82.5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+2.3 improvement</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Assessment</CardDescription>
                <CardTitle className="text-2xl">Jan 15</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>5 days ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Frameworks Covered</CardDescription>
                <CardTitle className="text-2xl">5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>All active</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All Assessments</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full">Full Assessment</SelectItem>
                    <SelectItem value="threat">Threat Assessment</SelectItem>
                    <SelectItem value="asset">Asset Review</SelectItem>
                    <SelectItem value="compliance">Compliance Check</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    <SelectItem value="NIST">NIST</SelectItem>
                    <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                    <SelectItem value="CIS Controls">CIS Controls</SelectItem>
                    <SelectItem value="PCI DSS">PCI DSS</SelectItem>
                    <SelectItem value="HIPAA">HIPAA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                  <CardDescription>Complete history of security assessments with detailed metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Framework</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="hidden md:table-cell">Duration</TableHead>
                        <TableHead className="hidden lg:table-cell">Assessor</TableHead>
                        <TableHead className="hidden lg:table-cell">Assets</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{assessment.id}</div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {assessment.type}
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                  {assessment.status}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{assessment.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{assessment.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{assessment.framework}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{assessment.score}</span>
                              {assessment.score > assessment.previousScore ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                ({assessment.score > assessment.previousScore ? "+" : ""}
                                {assessment.score - assessment.previousScore})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm">{assessment.duration}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm">{assessment.assessor}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="space-y-1 text-xs">
                              <div>{assessment.assets} assets</div>
                              <div className="text-muted-foreground">
                                {assessment.threats} threats, {assessment.vulnerabilities} vulns
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download report</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Assessments from the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Recent assessments view would be filtered here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Assessments</CardTitle>
                  <CardDescription>All successfully completed security assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <ShieldCheck className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Completed assessments view would be filtered here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
