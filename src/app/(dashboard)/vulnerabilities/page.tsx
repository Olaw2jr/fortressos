"use client"

import { useState } from "react"
import {
  AlertTriangle,
  BarChart3,
  Bug,
  CheckCircle2,
  Clock,
  Code,
  Database,
  Download,
  Eye,
  FileText,
  FileWarning,
  FolderLock,
  Globe,
  History,
  Info,
  Menu,
  MoreHorizontal,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"

const vulnerabilityData = [
  {
    id: "CVE-2024-0001",
    title: "SQL Injection in Authentication Module",
    description: "Critical SQL injection vulnerability allowing unauthorized database access",
    severity: "Critical",
    cvssScore: 9.8,
    status: "Open",
    category: "Injection",
    affectedAssets: ["Web Application Server", "Database Server"],
    discoveredDate: "2024-01-15",
    lastUpdated: "2024-01-16",
    assignedTo: "Security Team",
    source: "Automated Scan",
    cwe: "CWE-89",
    exploitability: "High",
    impact: "Complete system compromise",
    remediation: "Implement parameterized queries and input validation",
    estimatedEffort: "8 hours",
    framework: "OWASP Top 10",
    assetType: "Application",
    vendor: "Internal",
    patchAvailable: true,
  },
  {
    id: "CVE-2024-0002",
    title: "Cross-Site Scripting (XSS) in User Profile",
    description: "Stored XSS vulnerability in user profile comments section",
    severity: "High",
    cvssScore: 7.4,
    status: "In Progress",
    category: "XSS",
    affectedAssets: ["Web Application"],
    discoveredDate: "2024-01-14",
    lastUpdated: "2024-01-15",
    assignedTo: "Development Team",
    source: "Penetration Test",
    cwe: "CWE-79",
    exploitability: "Medium",
    impact: "Session hijacking, data theft",
    remediation: "Implement output encoding and CSP headers",
    estimatedEffort: "4 hours",
    framework: "OWASP Top 10",
    assetType: "Application",
    vendor: "Internal",
    patchAvailable: false,
  },
  {
    id: "CVE-2024-0003",
    title: "Outdated OpenSSL Version",
    description: "Server running vulnerable OpenSSL version susceptible to known exploits",
    severity: "High",
    cvssScore: 8.1,
    status: "Remediated",
    category: "Cryptographic Issues",
    affectedAssets: ["Primary Database Server"],
    discoveredDate: "2024-01-12",
    lastUpdated: "2024-01-14",
    assignedTo: "Infrastructure Team",
    source: "Vulnerability Scanner",
    cwe: "CWE-327",
    exploitability: "Medium",
    impact: "Man-in-the-middle attacks",
    remediation: "Update OpenSSL to latest version",
    estimatedEffort: "2 hours",
    framework: "NIST",
    assetType: "Infrastructure",
    vendor: "OpenSSL",
    patchAvailable: true,
  },
  {
    id: "CVE-2024-0004",
    title: "Weak Password Policy",
    description: "System allows weak passwords that can be easily brute-forced",
    severity: "Medium",
    cvssScore: 5.3,
    status: "Open",
    category: "Authentication",
    affectedAssets: ["Authentication Service"],
    discoveredDate: "2024-01-10",
    lastUpdated: "2024-01-12",
    assignedTo: "Security Team",
    source: "Security Audit",
    cwe: "CWE-521",
    exploitability: "Low",
    impact: "Unauthorized access",
    remediation: "Implement strong password policy and MFA",
    estimatedEffort: "6 hours",
    framework: "ISO 27001",
    assetType: "Security",
    vendor: "Internal",
    patchAvailable: false,
  },
  {
    id: "CVE-2024-0005",
    title: "Unencrypted Data Transmission",
    description: "Sensitive data transmitted without encryption over network",
    severity: "High",
    cvssScore: 7.8,
    status: "In Progress",
    category: "Data Exposure",
    affectedAssets: ["Customer Data Storage", "API Gateway"],
    discoveredDate: "2024-01-08",
    lastUpdated: "2024-01-10",
    assignedTo: "Data Team",
    source: "Network Scan",
    cwe: "CWE-319",
    exploitability: "Medium",
    impact: "Data interception",
    remediation: "Implement TLS encryption for all data transmission",
    estimatedEffort: "12 hours",
    framework: "PCI DSS",
    assetType: "Network",
    vendor: "Internal",
    patchAvailable: false,
  },
  {
    id: "CVE-2024-0006",
    title: "Directory Traversal Vulnerability",
    description: "Application allows access to files outside intended directory",
    severity: "Medium",
    cvssScore: 6.5,
    status: "Open",
    category: "Path Traversal",
    affectedAssets: ["File Server"],
    discoveredDate: "2024-01-05",
    lastUpdated: "2024-01-08",
    assignedTo: "Development Team",
    source: "Code Review",
    cwe: "CWE-22",
    exploitability: "Medium",
    impact: "Unauthorized file access",
    remediation: "Implement proper input validation and file access controls",
    estimatedEffort: "6 hours",
    framework: "CIS Controls",
    assetType: "Application",
    vendor: "Internal",
    patchAvailable: false,
  },
  {
    id: "CVE-2024-0007",
    title: "Privilege Escalation in Admin Panel",
    description: "Regular users can escalate privileges to admin level",
    severity: "Critical",
    cvssScore: 9.2,
    status: "Open",
    category: "Privilege Escalation",
    affectedAssets: ["Admin Panel"],
    discoveredDate: "2024-01-03",
    lastUpdated: "2024-01-05",
    assignedTo: "Security Team",
    source: "Bug Bounty",
    cwe: "CWE-269",
    exploitability: "High",
    impact: "Complete system control",
    remediation: "Implement proper role-based access controls",
    estimatedEffort: "16 hours",
    framework: "HIPAA",
    assetType: "Application",
    vendor: "Internal",
    patchAvailable: false,
  },
  {
    id: "CVE-2024-0008",
    title: "Buffer Overflow in Network Service",
    description: "Memory corruption vulnerability in custom network service",
    severity: "High",
    cvssScore: 8.4,
    status: "In Progress",
    category: "Memory Corruption",
    affectedAssets: ["Network Service"],
    discoveredDate: "2024-01-01",
    lastUpdated: "2024-01-03",
    assignedTo: "Development Team",
    source: "Static Analysis",
    cwe: "CWE-120",
    exploitability: "Medium",
    impact: "Remote code execution",
    remediation: "Implement bounds checking and use safe string functions",
    estimatedEffort: "20 hours",
    framework: "NIST",
    assetType: "Network",
    vendor: "Internal",
    patchAvailable: false,
  },
]

const vulnerabilityCategories = [
  { name: "Injection", count: 12, trend: "down", icon: Code },
  { name: "XSS", count: 8, trend: "stable", icon: Globe },
  { name: "Authentication", count: 6, trend: "down", icon: Users },
  { name: "Data Exposure", count: 9, trend: "up", icon: Database },
  { name: "Cryptographic Issues", count: 4, trend: "down", icon: Shield },
  { name: "Privilege Escalation", count: 3, trend: "stable", icon: AlertTriangle },
]

const severityDistribution = [
  { name: "Critical", count: 8, percentage: 15.4, color: "bg-red-500" },
  { name: "High", count: 18, percentage: 34.6, color: "bg-orange-500" },
  { name: "Medium", count: 21, percentage: 40.4, color: "bg-amber-500" },
  { name: "Low", count: 5, percentage: 9.6, color: "bg-green-500" },
]

export default function VulnerabilitiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAssetType, setSelectedAssetType] = useState("all")

  const filteredVulnerabilities = vulnerabilityData.filter((vuln) => {
    const matchesSeverity = selectedSeverity === "all" || vuln.severity.toLowerCase() === selectedSeverity
    const matchesStatus = selectedStatus === "all" || vuln.status.toLowerCase().replace(" ", "") === selectedStatus
    const matchesCategory =
      selectedCategory === "all" || vuln.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesAssetType = selectedAssetType === "all" || vuln.assetType.toLowerCase() === selectedAssetType
    return matchesSeverity && matchesStatus && matchesCategory && matchesAssetType
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
      case "open":
        return "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
      case "in progress":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
      case "remediated":
        return "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
      case "verified":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return <AlertTriangle className="h-3 w-3" />
      case "in progress":
        return <Clock className="h-3 w-3" />
      case "remediated":
        return <CheckCircle2 className="h-3 w-3" />
      case "verified":
        return <Shield className="h-3 w-3" />
      default:
        return <Bug className="h-3 w-3" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "injection":
        return <Code className="h-4 w-4" />
      case "xss":
        return <Globe className="h-4 w-4" />
      case "authentication":
        return <Users className="h-4 w-4" />
      case "data exposure":
        return <Database className="h-4 w-4" />
      case "cryptographic issues":
        return <Shield className="h-4 w-4" />
      case "privilege escalation":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bug className="h-4 w-4" />
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
              placeholder="Search vulnerabilities..."
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
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Vulnerability Management</h1>
            <p className="text-muted-foreground">
              Track, prioritize, and remediate security vulnerabilities across your infrastructure
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Vulnerabilities</CardDescription>
                <CardTitle className="text-2xl">52</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span>-8 from last week</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Critical Vulnerabilities</CardDescription>
                <CardTitle className="text-2xl">8</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>Immediate action required</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. CVSS Score</CardDescription>
                <CardTitle className="text-2xl">6.8</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span>-0.4 improvement</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Remediated This Month</CardDescription>
                <CardTitle className="text-2xl">23</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>82% success rate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="remediation">Remediation</TabsTrigger>
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="remediated">Remediated</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="xss">XSS</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="data">Data Exposure</SelectItem>
                    <SelectItem value="crypto">Cryptographic</SelectItem>
                    <SelectItem value="privilege">Privilege Escalation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Severity Distribution</CardTitle>
                    <CardDescription>Vulnerabilities by severity level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {severityDistribution.map((severity) => (
                        <div key={severity.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${severity.color}`} />
                            <span className="text-sm font-medium">{severity.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={severity.percentage} className="h-2 w-20" />
                            <span className="text-sm font-medium w-8">{severity.count}</span>
                            <span className="text-xs text-muted-foreground w-12">{severity.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerability Categories</CardTitle>
                    <CardDescription>Distribution by vulnerability type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vulnerabilityCategories.map((category) => {
                        const IconComponent = category.icon
                        return (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm font-medium">{category.name}</span>
                                {category.trend === "up" && <TrendingUp className="h-3 w-3 text-red-500" />}
                                {category.trend === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
                                {category.trend === "stable" && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={(category.count / 15) * 100} className="h-2 w-20" />
                              <span className="text-sm font-medium">{category.count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Vulnerabilities</CardTitle>
                  <CardDescription>Latest discovered security vulnerabilities</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">CVSS Score</TableHead>
                        <TableHead className="hidden lg:table-cell">Affected Assets</TableHead>
                        <TableHead className="hidden lg:table-cell">Discovered</TableHead>
                        <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVulnerabilities.slice(0, 5).map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{vuln.title}</div>
                              <div className="text-sm text-muted-foreground">{vuln.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(vuln.status)}>
                              {getStatusIcon(vuln.status)}
                              <span className="ml-1">{vuln.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{vuln.cvssScore}</span>
                              <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${vuln.cvssScore >= 9
                                    ? "bg-red-500"
                                    : vuln.cvssScore >= 7
                                      ? "bg-orange-500"
                                      : vuln.cvssScore >= 4
                                        ? "bg-amber-500"
                                        : "bg-green-500"
                                    }`}
                                  style={{ width: `${(vuln.cvssScore / 10) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="space-y-1">
                              {vuln.affectedAssets.slice(0, 2).map((asset, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {asset}
                                </Badge>
                              ))}
                              {vuln.affectedAssets.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{vuln.affectedAssets.length - 2} more
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{vuln.discoveredDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm">{vuln.assignedTo}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Zap className="h-4 w-4" />
                                <span className="sr-only">Remediate</span>
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

            <TabsContent value="critical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Vulnerabilities</CardTitle>
                  <CardDescription>High-priority vulnerabilities requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability Details</TableHead>
                        <TableHead>Risk Assessment</TableHead>
                        <TableHead>Technical Information</TableHead>
                        <TableHead>Remediation</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVulnerabilities
                        .filter((vuln) => vuln.severity === "Critical")
                        .map((vuln) => (
                          <TableRow key={vuln.id}>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="font-medium">{vuln.title}</div>
                                <div className="text-sm text-muted-foreground">{vuln.description}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{vuln.id}</span>
                                  <span>•</span>
                                  <span>{vuln.cwe}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                                  {vuln.severity}
                                </Badge>
                                <div className="text-sm">CVSS: {vuln.cvssScore}</div>
                                <div className="text-sm text-muted-foreground">
                                  Exploitability: {vuln.exploitability}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div>Category: {vuln.category}</div>
                                <div>Source: {vuln.source}</div>
                                <div>Framework: {vuln.framework}</div>
                                <div className="text-muted-foreground">
                                  Patch: {vuln.patchAvailable ? "Available" : "Not Available"}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div className="font-medium">Effort: {vuln.estimatedEffort}</div>
                                <div className="text-muted-foreground">{vuln.remediation}</div>
                                <div>Assigned: {vuln.assignedTo}</div>
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
                                  <Info className="h-4 w-4" />
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
                {vulnerabilityCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Card key={category.name}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5" />
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                          </div>
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
                            <span className="text-sm text-muted-foreground">Vulnerabilities</span>
                          </div>
                          <Progress value={(category.count / 15) * 100} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {category.trend === "up" && "Increasing trend"}
                            {category.trend === "down" && "Decreasing trend"}
                            {category.trend === "stable" && "Stable trend"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="remediation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Remediation Pipeline</CardTitle>
                  <CardDescription>Track vulnerability remediation progress and assignments</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Effort</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVulnerabilities
                        .filter((vuln) => vuln.status !== "Remediated")
                        .sort((a, b) => {
                          const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
                          return (
                            severityOrder[b.severity as keyof typeof severityOrder] -
                            severityOrder[a.severity as keyof typeof severityOrder]
                          )
                        })
                        .map((vuln) => (
                          <TableRow key={vuln.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{vuln.title}</div>
                                <div className="text-sm text-muted-foreground">{vuln.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getSeverityColor(vuln.severity)}>
                                {vuln.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(vuln.status)}>
                                {getStatusIcon(vuln.status)}
                                <span className="ml-1">{vuln.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{vuln.estimatedEffort}</span>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div>{vuln.assignedTo}</div>
                                <div className="text-muted-foreground">Updated: {vuln.lastUpdated}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress
                                  value={
                                    vuln.status === "Open"
                                      ? 0
                                      : vuln.status === "In Progress"
                                        ? 50
                                        : vuln.status === "Remediated"
                                          ? 100
                                          : 25
                                  }
                                  className="h-2 w-16"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {vuln.status === "Open"
                                    ? "0%"
                                    : vuln.status === "In Progress"
                                      ? "50%"
                                      : vuln.status === "Remediated"
                                        ? "100%"
                                        : "25%"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
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

