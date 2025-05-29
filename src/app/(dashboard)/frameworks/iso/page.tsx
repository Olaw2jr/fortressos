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
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const iso27001Domains = [
  {
    id: "A.5",
    name: "Information Security Policies",
    description: "Management direction and support for information security",
    compliance: 95,
    controls: 2,
    implemented: 2,
    inProgress: 0,
    notStarted: 0,
    color: "bg-green-500",
  },
  {
    id: "A.6",
    name: "Organization of Information Security",
    description: "Internal organization and mobile devices & teleworking",
    compliance: 88,
    controls: 8,
    implemented: 7,
    inProgress: 1,
    notStarted: 0,
    color: "bg-blue-500",
  },
  {
    id: "A.7",
    name: "Human Resource Security",
    description: "Security aspects of HR processes",
    compliance: 82,
    controls: 6,
    implemented: 5,
    inProgress: 1,
    notStarted: 0,
    color: "bg-purple-500",
  },
  {
    id: "A.8",
    name: "Asset Management",
    description: "Responsibility for assets and information classification",
    compliance: 75,
    controls: 10,
    implemented: 7,
    inProgress: 2,
    notStarted: 1,
    color: "bg-amber-500",
  },
  {
    id: "A.9",
    name: "Access Control",
    description: "Business requirements and user access management",
    compliance: 71,
    controls: 14,
    implemented: 10,
    inProgress: 3,
    notStarted: 1,
    color: "bg-orange-500",
  },
  {
    id: "A.10",
    name: "Cryptography",
    description: "Cryptographic controls",
    compliance: 90,
    controls: 2,
    implemented: 2,
    inProgress: 0,
    notStarted: 0,
    color: "bg-cyan-500",
  },
  {
    id: "A.11",
    name: "Physical and Environmental Security",
    description: "Secure areas and equipment protection",
    compliance: 85,
    controls: 15,
    implemented: 12,
    inProgress: 2,
    notStarted: 1,
    color: "bg-indigo-500",
  },
  {
    id: "A.12",
    name: "Operations Security",
    description: "Operational procedures and responsibilities",
    compliance: 68,
    controls: 14,
    implemented: 9,
    inProgress: 4,
    notStarted: 1,
    color: "bg-red-500",
  },
  {
    id: "A.13",
    name: "Communications Security",
    description: "Network security management and information transfer",
    compliance: 79,
    controls: 7,
    implemented: 5,
    inProgress: 2,
    notStarted: 0,
    color: "bg-pink-500",
  },
  {
    id: "A.14",
    name: "System Acquisition, Development and Maintenance",
    description: "Security in development and support processes",
    compliance: 73,
    controls: 13,
    implemented: 9,
    inProgress: 3,
    notStarted: 1,
    color: "bg-teal-500",
  },
]

const iso27001Controls = [
  {
    id: "A.5.1.1",
    domain: "A.5",
    title: "Policies for information security",
    description:
      "A set of policies for information security shall be defined, approved by management, published and communicated to employees and relevant external parties.",
    status: "Implemented",
    priority: "High",
    owner: "CISO",
    lastReview: "2024-01-15",
    evidence: "Information Security Policy v2.1, Board approval minutes, Training records",
    gaps: [],
    implementation: 100,
    dueDate: "2024-06-01",
    effort: "Low",
    maturityLevel: "Optimized",
  },
  {
    id: "A.6.1.1",
    domain: "A.6",
    title: "Information security roles and responsibilities",
    description: "All information security responsibilities shall be defined and allocated.",
    status: "Implemented",
    priority: "High",
    owner: "HR Team",
    lastReview: "2024-01-10",
    evidence: "Role definitions, RACI matrix, Job descriptions",
    gaps: [],
    implementation: 95,
    dueDate: "2024-04-01",
    effort: "Low",
    maturityLevel: "Managed",
  },
  {
    id: "A.8.1.1",
    domain: "A.8",
    title: "Inventory of assets",
    description:
      "Assets associated with information and information processing facilities shall be identified and an inventory of these assets shall be drawn up and maintained.",
    status: "In Progress",
    priority: "High",
    owner: "IT Team",
    lastReview: "2024-01-08",
    evidence: "Asset register (partial), CMDB implementation",
    gaps: ["Cloud assets not fully cataloged", "Software licenses tracking incomplete"],
    implementation: 70,
    dueDate: "2024-03-15",
    effort: "Medium",
    maturityLevel: "Defined",
  },
  {
    id: "A.9.1.1",
    domain: "A.9",
    title: "Access control policy",
    description:
      "An access control policy shall be established, documented and reviewed based on business and information security requirements.",
    status: "Implemented",
    priority: "Critical",
    owner: "Security Team",
    lastReview: "2024-01-12",
    evidence: "Access Control Policy v1.3, Annual review completed",
    gaps: [],
    implementation: 90,
    dueDate: "2024-07-01",
    effort: "Low",
    maturityLevel: "Managed",
  },
  {
    id: "A.9.2.1",
    domain: "A.9",
    title: "User registration and de-registration",
    description:
      "A formal user registration and de-registration process shall be implemented to enable assignment of access rights.",
    status: "In Progress",
    priority: "High",
    owner: "Identity Team",
    lastReview: "2024-01-05",
    evidence: "IAM system, Automated provisioning (partial)",
    gaps: ["Manual processes for contractors", "Delayed de-provisioning"],
    implementation: 75,
    dueDate: "2024-02-28",
    effort: "High",
    maturityLevel: "Defined",
  },
  {
    id: "A.12.1.1",
    domain: "A.12",
    title: "Documented operating procedures",
    description: "Operating procedures shall be documented and made available to all users who need them.",
    status: "Not Started",
    priority: "Medium",
    owner: "Operations Team",
    lastReview: "2023-12-15",
    evidence: "Some procedures documented, not centralized",
    gaps: ["Procedures not standardized", "No central repository", "Version control missing"],
    implementation: 30,
    dueDate: "2024-04-30",
    effort: "High",
    maturityLevel: "Initial",
  },
  {
    id: "A.14.2.1",
    domain: "A.14",
    title: "Secure development policy",
    description:
      "Rules for the development of software and systems shall be established and applied to developments within the organization.",
    status: "In Progress",
    priority: "High",
    owner: "Development Team",
    lastReview: "2024-01-03",
    evidence: "SDLC policy draft, Security testing procedures",
    gaps: ["Code review process incomplete", "Security training for developers"],
    implementation: 60,
    dueDate: "2024-03-31",
    effort: "Medium",
    maturityLevel: "Defined",
  },
]

const assessmentHistory = [
  {
    id: "ISO-2024-Q1",
    date: "2024-01-15",
    type: "Internal Audit",
    score: 81.2,
    previousScore: 78.5,
    assessor: "Internal Audit Team",
    duration: "2 weeks",
    findings: 15,
    nonConformities: 3,
    certificationStatus: "Maintained",
  },
  {
    id: "ISO-2023-CERT",
    date: "2023-09-15",
    type: "Certification Audit",
    score: 78.5,
    previousScore: 75.8,
    assessor: "BSI Group",
    duration: "1 week",
    findings: 8,
    nonConformities: 1,
    certificationStatus: "Certified",
  },
  {
    id: "ISO-2023-Q2",
    date: "2023-06-15",
    type: "Management Review",
    score: 75.8,
    previousScore: 73.2,
    assessor: "Management Team",
    duration: "3 days",
    findings: 12,
    nonConformities: 2,
    certificationStatus: "In Progress",
  },
]

export default function ISO27001Page() {
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredControls = iso27001Controls.filter((control) => {
    const matchesDomain = selectedDomain === "all" || control.domain === selectedDomain
    const matchesStatus = selectedStatus === "all" || control.status.toLowerCase().replace(" ", "") === selectedStatus
    const matchesPriority = selectedPriority === "all" || control.priority.toLowerCase() === selectedPriority
    return matchesDomain && matchesStatus && matchesPriority
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

  const getMaturityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "optimized":
        return "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      case "managed":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
      case "defined":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "initial":
        return "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
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
              placeholder="Search ISO 27001 controls..."
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
            <h1 className="mb-1 text-2xl font-bold tracking-tight">ISO 27001 Information Security Management</h1>
            <p className="text-muted-foreground">
              Manage and track compliance with ISO 27001 information security management system requirements
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Overall Compliance</CardDescription>
                <CardTitle className="text-2xl">81.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+2.7% from last audit</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Controls</CardDescription>
                <CardTitle className="text-2xl">114</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>88 implemented</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Certification Status</CardDescription>
                <CardTitle className="text-2xl">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Valid until Sep 2026</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Audit</CardDescription>
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
                <TabsTrigger value="domains">Domains</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="audits">Audits</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {iso27001Domains.map((domain) => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {domain.id}
                      </SelectItem>
                    ))}
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
                    <CardTitle>Domain Compliance</CardTitle>
                    <CardDescription>Compliance status across ISO 27001 Annex A domains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {iso27001Domains.slice(0, 5).map((domain) => (
                        <div key={domain.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${domain.color}`} />
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{domain.id}</span>
                              <span className="text-xs text-muted-foreground">{domain.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={domain.compliance} className="h-2 w-20" />
                            <span className="text-sm font-medium w-12">{domain.compliance}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Status</CardTitle>
                    <CardDescription>Control implementation progress by domain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {iso27001Domains.slice(0, 5).map((domain) => (
                        <div key={domain.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{domain.id}</span>
                            <span className="text-sm text-muted-foreground">
                              {domain.implemented}/{domain.controls}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div
                              className="h-2 bg-green-500 rounded-l"
                              style={{ width: `${(domain.implemented / domain.controls) * 100}%` }}
                            />
                            <div
                              className="h-2 bg-amber-500"
                              style={{ width: `${(domain.inProgress / domain.controls) * 100}%` }}
                            />
                            <div
                              className="h-2 bg-red-500 rounded-r"
                              style={{ width: `${(domain.notStarted / domain.controls) * 100}%` }}
                            />
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
                  <CardDescription>Latest changes to ISO 27001 control implementations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Control</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="hidden md:table-cell">Maturity</TableHead>
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
                              <div className="text-sm text-muted-foreground">{control.title}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{control.domain}</Badge>
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
                            <Badge variant="outline" className={getMaturityColor(control.maturityLevel)}>
                              {control.maturityLevel}
                            </Badge>
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

            <TabsContent value="domains" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {iso27001Domains.map((domain) => (
                  <Card key={domain.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded ${domain.color}`} />
                          <CardTitle className="text-lg">{domain.id}</CardTitle>
                        </div>
                        <Badge variant="outline">{domain.compliance}%</Badge>
                      </div>
                      <CardDescription className="text-sm">{domain.name}</CardDescription>
                      <CardDescription className="text-xs text-muted-foreground">
                        {domain.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Controls</span>
                          <span className="font-medium">{domain.controls}</span>
                        </div>
                        <Progress value={domain.compliance} className="h-2" />
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium text-green-600">{domain.implemented}</div>
                            <div className="text-muted-foreground">Implemented</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-amber-600">{domain.inProgress}</div>
                            <div className="text-muted-foreground">In Progress</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-red-600">{domain.notStarted}</div>
                            <div className="text-muted-foreground">Not Started</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ISO 27001 Control Implementation</CardTitle>
                  <CardDescription>Detailed view of all ISO 27001 Annex A controls</CardDescription>
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
                              <div className="text-sm font-medium">{control.title}</div>
                              <div className="text-sm text-muted-foreground">{control.description}</div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{control.domain}</Badge>
                                <Badge variant="outline" className={getPriorityColor(control.priority)}>
                                  {control.priority}
                                </Badge>
                                <Badge variant="outline" className={getMaturityColor(control.maturityLevel)}>
                                  {control.maturityLevel}
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

            <TabsContent value="audits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audit History</CardTitle>
                  <CardDescription>Historical ISO 27001 audits and certification status</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Audit</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Findings</TableHead>
                        <TableHead>Certification</TableHead>
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
                                {assessment.nonConformities} non-conformities
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                assessment.certificationStatus === "Certified"
                                  ? "bg-green-50 text-green-700"
                                  : assessment.certificationStatus === "Maintained"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-amber-50 text-amber-700"
                              }
                            >
                              {assessment.certificationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View audit</span>
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
