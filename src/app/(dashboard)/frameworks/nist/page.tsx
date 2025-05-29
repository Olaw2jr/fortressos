"use client"

import { useState } from "react"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Info,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const nistFunctions = [
  {
    id: "identify",
    name: "Identify",
    description: "Develop organizational understanding to manage cybersecurity risk",
    compliance: 85,
    controls: 23,
    implemented: 19,
    inProgress: 3,
    notStarted: 1,
    color: "bg-blue-500",
    icon: Target,
  },
  {
    id: "protect",
    name: "Protect",
    description: "Develop and implement appropriate safeguards",
    compliance: 78,
    controls: 31,
    implemented: 24,
    inProgress: 5,
    notStarted: 2,
    color: "bg-green-500",
    icon: Shield,
  },
  {
    id: "detect",
    name: "Detect",
    description: "Develop and implement activities to identify cybersecurity events",
    compliance: 92,
    controls: 18,
    implemented: 16,
    inProgress: 2,
    notStarted: 0,
    color: "bg-amber-500",
    icon: Eye,
  },
  {
    id: "respond",
    name: "Respond",
    description: "Develop and implement activities to take action regarding detected events",
    compliance: 71,
    controls: 16,
    implemented: 11,
    inProgress: 4,
    notStarted: 1,
    color: "bg-orange-500",
    icon: Zap,
  },
  {
    id: "recover",
    name: "Recover",
    description: "Develop and implement activities to maintain resilience plans",
    compliance: 68,
    controls: 14,
    implemented: 9,
    inProgress: 3,
    notStarted: 2,
    color: "bg-purple-500",
    icon: ShieldCheck,
  },
]

const nistControls = [
  {
    id: "ID.AM-1",
    function: "Identify",
    category: "Asset Management",
    subcategory: "Physical devices and systems within the organization are inventoried",
    status: "Implemented",
    priority: "High",
    owner: "IT Team",
    lastReview: "2024-01-15",
    evidence: "Asset inventory database, quarterly audits",
    gaps: [],
    implementation: 100,
    dueDate: "2024-03-01",
    effort: "Low",
  },
  {
    id: "ID.AM-2",
    function: "Identify",
    category: "Asset Management",
    subcategory: "Software platforms and applications within the organization are inventoried",
    status: "In Progress",
    priority: "High",
    owner: "Security Team",
    lastReview: "2024-01-10",
    evidence: "Partial software inventory",
    gaps: ["Cloud applications not fully cataloged", "Shadow IT discovery needed"],
    implementation: 65,
    dueDate: "2024-02-15",
    effort: "Medium",
  },
  {
    id: "PR.AC-1",
    function: "Protect",
    category: "Access Control",
    subcategory: "Identities and credentials are issued, managed, verified, revoked, and audited",
    status: "Implemented",
    priority: "Critical",
    owner: "Identity Team",
    lastReview: "2024-01-12",
    evidence: "IAM system, access reviews, audit logs",
    gaps: [],
    implementation: 95,
    dueDate: "2024-04-01",
    effort: "Low",
  },
  {
    id: "PR.AC-3",
    function: "Protect",
    category: "Access Control",
    subcategory: "Remote access is managed",
    status: "In Progress",
    priority: "High",
    owner: "Network Team",
    lastReview: "2024-01-08",
    evidence: "VPN policies, MFA implementation",
    gaps: ["Privileged access management", "Zero trust architecture"],
    implementation: 70,
    dueDate: "2024-03-15",
    effort: "High",
  },
  {
    id: "DE.AE-1",
    function: "Detect",
    category: "Anomalies and Events",
    subcategory: "A baseline of network operations and expected data flows is established",
    status: "Implemented",
    priority: "Medium",
    owner: "SOC Team",
    lastReview: "2024-01-14",
    evidence: "Network monitoring, baseline documentation",
    gaps: [],
    implementation: 90,
    dueDate: "2024-05-01",
    effort: "Low",
  },
  {
    id: "RS.RP-1",
    function: "Respond",
    category: "Response Planning",
    subcategory: "Response plan is executed during or after an incident",
    status: "Not Started",
    priority: "High",
    owner: "Incident Response Team",
    lastReview: "2023-12-15",
    evidence: "Draft incident response plan",
    gaps: ["Plan not tested", "Roles not clearly defined", "Communication procedures incomplete"],
    implementation: 25,
    dueDate: "2024-02-28",
    effort: "High",
  },
  {
    id: "RC.RP-1",
    function: "Recover",
    category: "Recovery Planning",
    subcategory: "Recovery plan is executed during or after a cybersecurity incident",
    status: "In Progress",
    priority: "Medium",
    owner: "Business Continuity Team",
    lastReview: "2024-01-05",
    evidence: "Business continuity plan, backup procedures",
    gaps: ["Recovery time objectives not defined", "Testing schedule needed"],
    implementation: 60,
    dueDate: "2024-04-15",
    effort: "Medium",
  },
]

const assessmentHistory = [
  {
    id: "NIST-2024-Q1",
    date: "2024-01-15",
    type: "Quarterly Assessment",
    score: 78.5,
    previousScore: 75.2,
    assessor: "John Smith",
    duration: "3h 30m",
    findings: 12,
    recommendations: 8,
  },
  {
    id: "NIST-2023-Q4",
    date: "2023-10-15",
    type: "Annual Review",
    score: 75.2,
    previousScore: 72.8,
    assessor: "Sarah Johnson",
    duration: "5h 15m",
    findings: 18,
    recommendations: 15,
  },
  {
    id: "NIST-2023-Q3",
    date: "2023-07-15",
    type: "Quarterly Assessment",
    score: 72.8,
    previousScore: 69.5,
    assessor: "Mike Chen",
    duration: "3h 45m",
    findings: 15,
    recommendations: 12,
  },
]

export default function NISTPage() {
  const [selectedFunction, setSelectedFunction] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredControls = nistControls.filter((control) => {
    const matchesFunction = selectedFunction === "all" || control.function.toLowerCase() === selectedFunction
    const matchesStatus = selectedStatus === "all" || control.status.toLowerCase().replace(" ", "") === selectedStatus
    const matchesPriority = selectedPriority === "all" || control.priority.toLowerCase() === selectedPriority
    return matchesFunction && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "implemented":
        return "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      case "in progress":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "not started":
        return "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
      case "high":
        return "bg-orange-50 text-orange-700 hover:bg-orange-50 hover:text-orange-700"
      case "medium":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "low":
        return "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "implemented":
        return <CheckCircle2 className="h-3 w-3" />
      case "in progress":
        return <Clock className="h-3 w-3" />
      case "not started":
        return <Target className="h-3 w-3" />
      default:
        return <Info className="h-3 w-3" />
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex w-full items-center gap-2">
          <form className="relative flex flex-1 md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search NIST controls..."
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
            <h1 className="mb-1 text-2xl font-bold tracking-tight">NIST Cybersecurity Framework</h1>
            <p className="text-muted-foreground">
              Manage and track compliance with the NIST Cybersecurity Framework across all five core functions
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Compliance</CardDescription>
                <CardTitle className="text-2xl">78.5%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+3.3% from last quarter</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Controls</CardDescription>
                <CardTitle className="text-2xl">102</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>79 implemented</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-2xl">17</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>Active implementation</span>
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
                  <Calendar className="h-4 w-4" />
                  <span>5 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="functions">Functions</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Function" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Functions</SelectItem>
                    <SelectItem value="identify">Identify</SelectItem>
                    <SelectItem value="protect">Protect</SelectItem>
                    <SelectItem value="detect">Detect</SelectItem>
                    <SelectItem value="respond">Respond</SelectItem>
                    <SelectItem value="recover">Recover</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="implemented">Implemented</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="notstarted">Not Started</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Framework Functions</CardTitle>
                    <CardDescription>Compliance status across NIST core functions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nistFunctions.map((func) => {
                        const IconComponent = func.icon
                        return (
                          <div key={func.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`h-3 w-3 rounded-full ${func.color}`} />
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm font-medium">{func.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Progress value={func.compliance} className="h-2 w-20" />
                              <span className="text-sm font-medium w-12">{func.compliance}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Progress</CardTitle>
                    <CardDescription>Control implementation status by function</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nistFunctions.map((func) => (
                        <div key={func.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{func.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {func.implemented}/{func.controls}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div
                              className="h-2 bg-green-500 rounded-l"
                              style={{ width: `${(func.implemented / func.controls) * 100}%` }}
                            />
                            <div
                              className="h-2 bg-amber-500"
                              style={{ width: `${(func.inProgress / func.controls) * 100}%` }}
                            />
                            <div
                              className="h-2 bg-red-500 rounded-r"
                              style={{ width: `${(func.notStarted / func.controls) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 bg-green-500 rounded" />
                              <span>Implemented: {func.implemented}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 bg-amber-500 rounded" />
                              <span>In Progress: {func.inProgress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 bg-red-500 rounded" />
                              <span>Not Started: {func.notStarted}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Control Updates</CardTitle>
                  <CardDescription>Latest changes to NIST control implementations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Control</TableHead>
                        <TableHead>Function</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="hidden md:table-cell">Implementation</TableHead>
                        <TableHead className="hidden lg:table-cell">Owner</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Review</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredControls.slice(0, 5).map((control) => (
                        <TableRow key={control.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{control.id}</div>
                              <div className="text-sm text-muted-foreground">{control.category}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{control.function}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(control.status)}>
                              {getStatusIcon(control.status)}
                              <span className="ml-1">{control.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityColor(control.priority)}>
                              {control.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Progress value={control.implementation} className="h-2 w-16" />
                              <span className="text-sm">{control.implementation}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm">{control.owner}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{control.lastReview}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <BookOpen className="h-4 w-4" />
                                <span className="sr-only">View documentation</span>
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

            <TabsContent value="functions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nistFunctions.map((func) => {
                  const IconComponent = func.icon
                  return (
                    <Card key={func.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5" />
                            <CardTitle className="text-lg">{func.name}</CardTitle>
                          </div>
                          <Badge variant="outline">{func.compliance}%</Badge>
                        </div>
                        <CardDescription className="text-sm">{func.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Total Controls</span>
                            <span className="font-medium">{func.controls}</span>
                          </div>
                          <Progress value={func.compliance} className="h-2" />
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-medium text-green-600">{func.implemented}</div>
                              <div className="text-muted-foreground">Implemented</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-amber-600">{func.inProgress}</div>
                              <div className="text-muted-foreground">In Progress</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-red-600">{func.notStarted}</div>
                              <div className="text-muted-foreground">Not Started</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>NIST Control Implementation</CardTitle>
                  <CardDescription>Detailed view of all NIST cybersecurity framework controls</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Control Details</TableHead>
                        <TableHead>Implementation Status</TableHead>
                        <TableHead>Evidence & Gaps</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredControls.map((control) => (
                        <TableRow key={control.id}>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="font-medium">{control.id}</div>
                              <div className="text-sm font-medium">{control.category}</div>
                              <div className="text-sm text-muted-foreground">{control.subcategory}</div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{control.function}</Badge>
                                <Badge variant="outline" className={getPriorityColor(control.priority)}>
                                  {control.priority}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge variant="outline" className={getStatusColor(control.status)}>
                                {getStatusIcon(control.status)}
                                <span className="ml-1">{control.status}</span>
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Progress value={control.implementation} className="h-2 w-16" />
                                <span className="text-sm">{control.implementation}%</span>
                              </div>
                              <div className="text-xs text-muted-foreground">Due: {control.dueDate}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="font-medium">Evidence:</div>
                              <div className="text-muted-foreground">{control.evidence}</div>
                              {control.gaps.length > 0 && (
                                <>
                                  <div className="font-medium text-red-600">Gaps:</div>
                                  <ul className="text-red-600 text-xs">
                                    {control.gaps.map((gap, index) => (
                                      <li key={index}>• {gap}</li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{control.owner}</span>
                              </div>
                              <div>Effort: {control.effort}</div>
                              <div className="text-muted-foreground">Review: {control.lastReview}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <BookOpen className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4" />
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

            <TabsContent value="assessments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                  <CardDescription>Historical NIST framework assessments and compliance scores</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Findings</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessmentHistory.map((assessment) => (
                        <TableRow key={assessment.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{assessment.id}</div>
                              <div className="text-sm text-muted-foreground">by {assessment.assessor}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{assessment.date}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{assessment.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{assessment.score}%</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {assessment.score > assessment.previousScore ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className="text-sm">
                                {assessment.score > assessment.previousScore ? "+" : ""}
                                {(assessment.score - assessment.previousScore).toFixed(1)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{assessment.duration}</span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div>{assessment.findings} findings</div>
                              <div className="text-muted-foreground">
                                {assessment.recommendations} recommendations
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View assessment</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download report</span>
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}
