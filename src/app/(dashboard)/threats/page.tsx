"use client"

import { useState } from "react"
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  FileWarning,
  FolderLock,
  History,
  Menu,
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ThreatTrendChart from "@/components/dashboard/dashboard/threat-trend-chart"

const threatData = [
  {
    id: "THR-2024-001",
    name: "SQL Injection Vulnerability",
    type: "Application",
    severity: "Critical",
    status: "Active",
    detectedDate: "2024-01-15",
    lastUpdated: "2024-01-16",
    affectedAssets: ["Web Application", "Database Server"],
    cvssScore: 9.8,
    description: "Critical SQL injection vulnerability in user authentication module",
    source: "Automated Scan",
    assignedTo: "Security Team",
    estimatedImpact: "High",
    likelihood: "High",
    framework: "NIST",
  },
  {
    id: "THR-2024-002",
    name: "Phishing Campaign Detected",
    type: "Social Engineering",
    severity: "High",
    status: "Investigating",
    detectedDate: "2024-01-14",
    lastUpdated: "2024-01-15",
    affectedAssets: ["Email System", "User Accounts"],
    cvssScore: 7.5,
    description: "Targeted phishing campaign against executive team members",
    source: "Email Security",
    assignedTo: "SOC Team",
    estimatedImpact: "Medium",
    likelihood: "High",
    framework: "ISO 27001",
  },
  {
    id: "THR-2024-003",
    name: "Outdated SSL Certificate",
    type: "Infrastructure",
    severity: "Medium",
    status: "Remediated",
    detectedDate: "2024-01-12",
    lastUpdated: "2024-01-14",
    affectedAssets: ["Web Server"],
    cvssScore: 5.3,
    description: "SSL certificate expired on production web server",
    source: "Certificate Monitor",
    assignedTo: "Infrastructure Team",
    estimatedImpact: "Low",
    likelihood: "Medium",
    framework: "CIS Controls",
  },
  {
    id: "THR-2024-004",
    name: "Unauthorized Access Attempt",
    type: "Access Control",
    severity: "High",
    status: "Mitigated",
    detectedDate: "2024-01-10",
    lastUpdated: "2024-01-12",
    affectedAssets: ["Admin Panel", "User Database"],
    cvssScore: 8.1,
    description: "Multiple failed login attempts from suspicious IP addresses",
    source: "SIEM",
    assignedTo: "Security Team",
    estimatedImpact: "High",
    likelihood: "Medium",
    framework: "PCI DSS",
  },
  {
    id: "THR-2024-005",
    name: "Malware Detection",
    type: "Malware",
    severity: "Critical",
    status: "Active",
    detectedDate: "2024-01-08",
    lastUpdated: "2024-01-10",
    affectedAssets: ["Workstation-045", "File Server"],
    cvssScore: 9.2,
    description: "Advanced persistent threat detected on employee workstation",
    source: "Endpoint Protection",
    assignedTo: "Incident Response",
    estimatedImpact: "High",
    likelihood: "High",
    framework: "HIPAA",
  },
  {
    id: "THR-2024-006",
    name: "Data Exfiltration Risk",
    type: "Data Security",
    severity: "High",
    status: "Investigating",
    detectedDate: "2024-01-05",
    lastUpdated: "2024-01-08",
    affectedAssets: ["Customer Database", "API Gateway"],
    cvssScore: 7.8,
    description: "Unusual data access patterns detected in customer database",
    source: "DLP System",
    assignedTo: "Data Protection Team",
    estimatedImpact: "High",
    likelihood: "Medium",
    framework: "NIST",
  },
]

const threatCategories = [
  { name: "Application", count: 8, trend: "up" },
  { name: "Infrastructure", count: 5, trend: "down" },
  { name: "Social Engineering", count: 3, trend: "up" },
  { name: "Access Control", count: 4, trend: "stable" },
  { name: "Malware", count: 6, trend: "up" },
  { name: "Data Security", count: 2, trend: "down" },
]

export default function ThreatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredThreats = threatData.filter((threat) => {
    const matchesSeverity = selectedSeverity === "all" || threat.severity.toLowerCase() === selectedSeverity
    const matchesStatus = selectedStatus === "all" || threat.status.toLowerCase() === selectedStatus
    const matchesType = selectedType === "all" || threat.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSeverity && matchesStatus && matchesType
  })

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
      case "investigating":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "mitigated":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
      case "remediated":
        return "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <AlertTriangle className="h-3 w-3" />
      case "investigating":
        return <Search className="h-3 w-3" />
      case "mitigated":
        return <Shield className="h-3 w-3" />
      case "remediated":
        return <CheckCircle2 className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
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
              placeholder="Search threats..."
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
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Threat Management</h1>
            <p className="text-muted-foreground">
              Monitor, analyze, and respond to security threats across your environment
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Threats</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <span>+3 from last week</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Critical Threats</CardDescription>
                <CardTitle className="text-2xl">3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Immediate attention</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Response Time</CardDescription>
                <CardTitle className="text-2xl">2.4h</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span>-0.5h improvement</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Remediated This Month</CardDescription>
                <CardTitle className="text-2xl">18</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>75% success rate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="active">Active Threats</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="mitigated">Mitigated</SelectItem>
                    <SelectItem value="remediated">Remediated</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="social">Social Engineering</SelectItem>
                    <SelectItem value="access">Access Control</SelectItem>
                    <SelectItem value="malware">Malware</SelectItem>
                    <SelectItem value="data">Data Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Threat Trend Analysis</CardTitle>
                    <CardDescription>New and remediated threats over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ThreatTrendChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Threat Categories</CardTitle>
                    <CardDescription>Distribution of threats by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {threatCategories.map((category) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{category.name}</span>
                              {category.trend === "up" && <TrendingUp className="h-3 w-3 text-red-500" />}
                              {category.trend === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
                              {category.trend === "stable" && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={(category.count / 10) * 100} className="h-2 w-20" />
                            <span className="text-sm font-medium">{category.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Threats</CardTitle>
                  <CardDescription>Latest security threats requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Threat</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">CVSS Score</TableHead>
                        <TableHead className="hidden lg:table-cell">Detected</TableHead>
                        <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredThreats.slice(0, 5).map((threat) => (
                        <TableRow key={threat.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{threat.name}</div>
                              <div className="text-sm text-muted-foreground">{threat.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{threat.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                              {threat.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(threat.status)}>
                              {getStatusIcon(threat.status)}
                              <span className="ml-1">{threat.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{threat.cvssScore}</span>
                              <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${threat.cvssScore >= 9
                                    ? "bg-red-500"
                                    : threat.cvssScore >= 7
                                      ? "bg-orange-500"
                                      : threat.cvssScore >= 4
                                        ? "bg-amber-500"
                                        : "bg-green-500"
                                    }`}
                                  style={{ width: `${(threat.cvssScore / 10) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{threat.detectedDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm">{threat.assignedTo}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Zap className="h-4 w-4" />
                                <span className="sr-only">Take action</span>
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

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Threats</CardTitle>
                  <CardDescription>
                    All currently active security threats requiring immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Threat Details</TableHead>
                        <TableHead>Type & Severity</TableHead>
                        <TableHead>Impact Assessment</TableHead>
                        <TableHead>Affected Assets</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredThreats
                        .filter((threat) => threat.status === "Active")
                        .map((threat) => (
                          <TableRow key={threat.id}>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="font-medium">{threat.name}</div>
                                <div className="text-sm text-muted-foreground">{threat.description}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{threat.id}</span>
                                  <span>•</span>
                                  <span>Detected: {threat.detectedDate}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <Badge variant="outline">{threat.type}</Badge>
                                <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                                  {threat.severity}
                                </Badge>
                                <div className="text-sm">CVSS: {threat.cvssScore}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div>Impact: {threat.estimatedImpact}</div>
                                <div>Likelihood: {threat.likelihood}</div>
                                <div className="text-muted-foreground">Framework: {threat.framework}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {threat.affectedAssets.map((asset, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {asset}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div>{threat.assignedTo}</div>
                                <div className="text-muted-foreground">Source: {threat.source}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Zap className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <X className="h-4 w-4" />
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

            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {threatCategories.map((category) => (
                  <Card key={category.name}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          {category.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                          {category.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                          {category.trend === "stable" && <div className="h-4 w-4 rounded-full bg-gray-400" />}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{category.count}</span>
                          <span className="text-sm text-muted-foreground">Active threats</span>
                        </div>
                        <Progress value={(category.count / 10) * 100} className="h-2" />
                        <div className="text-sm text-muted-foreground">
                          {category.trend === "up" && "Increasing trend"}
                          {category.trend === "down" && "Decreasing trend"}
                          {category.trend === "stable" && "Stable trend"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Timeline</CardTitle>
                  <CardDescription>Chronological view of threat detection and response activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {threatData
                      .sort((a, b) => new Date(b.detectedDate).getTime() - new Date(a.detectedDate).getTime())
                      .map((threat, index) => (
                        <div key={threat.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-3 w-3 rounded-full ${threat.severity === "Critical"
                                ? "bg-red-500"
                                : threat.severity === "High"
                                  ? "bg-orange-500"
                                  : threat.severity === "Medium"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                                }`}
                            />
                            {index < threatData.length - 1 && <div className="h-12 w-px bg-border mt-2" />}
                          </div>
                          <div className="flex-1 space-y-2 pb-6">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{threat.name}</span>
                              <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                                {threat.severity}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(threat.status)}>
                                {threat.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{threat.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Detected: {threat.detectedDate}</span>
                              <span>•</span>
                              <span>Updated: {threat.lastUpdated}</span>
                              <span>•</span>
                              <span>Assigned to: {threat.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
