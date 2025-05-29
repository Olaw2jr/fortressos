"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Database,
  Download,
  Eye,
  FileText,
  FileWarning,
  FolderLock,
  Globe,
  HardDrive,
  History,
  Laptop,
  MapPin,
  Menu,
  Monitor,
  MoreHorizontal,
  Network,
  Plus,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
  Wifi,
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

const assetData = [
  {
    id: "AS-001",
    name: "Primary Database Server",
    type: "Server",
    category: "Infrastructure",
    criticality: "Critical",
    status: "Active",
    riskLevel: "High",
    compliance: 62,
    vulnerabilities: 8,
    lastScan: "2024-01-15",
    location: "Data Center A",
    owner: "Database Team",
    operatingSystem: "Ubuntu 20.04",
    ipAddress: "10.0.1.100",
    framework: "NIST",
    businessValue: "High",
    dataClassification: "Confidential",
  },
  {
    id: "AS-002",
    name: "Web Application Server",
    type: "Server",
    category: "Application",
    criticality: "High",
    status: "Active",
    riskLevel: "Medium",
    compliance: 85,
    vulnerabilities: 4,
    lastScan: "2024-01-14",
    location: "Cloud - AWS",
    owner: "Development Team",
    operatingSystem: "CentOS 8",
    ipAddress: "10.0.2.50",
    framework: "ISO 27001",
    businessValue: "High",
    dataClassification: "Internal",
  },
  {
    id: "AS-003",
    name: "Authentication Service",
    type: "Application",
    category: "Security",
    criticality: "Critical",
    status: "Active",
    riskLevel: "Low",
    compliance: 95,
    vulnerabilities: 1,
    lastScan: "2024-01-16",
    location: "Cloud - Azure",
    owner: "Security Team",
    operatingSystem: "Container",
    ipAddress: "10.0.3.25",
    framework: "CIS Controls",
    businessValue: "Critical",
    dataClassification: "Restricted",
  },
  {
    id: "AS-004",
    name: "Customer Data Storage",
    type: "Storage",
    category: "Data",
    criticality: "Critical",
    status: "Active",
    riskLevel: "Critical",
    compliance: 45,
    vulnerabilities: 12,
    lastScan: "2024-01-13",
    location: "Data Center B",
    owner: "Data Team",
    operatingSystem: "Windows Server 2019",
    ipAddress: "10.0.4.200",
    framework: "PCI DSS",
    businessValue: "Critical",
    dataClassification: "Restricted",
  },
  {
    id: "AS-005",
    name: "Network Firewall",
    type: "Network",
    category: "Security",
    criticality: "High",
    status: "Active",
    riskLevel: "Low",
    compliance: 100,
    vulnerabilities: 0,
    lastScan: "2024-01-16",
    location: "Data Center A",
    owner: "Network Team",
    operatingSystem: "Firmware",
    ipAddress: "10.0.0.1",
    framework: "HIPAA",
    businessValue: "High",
    dataClassification: "Internal",
  },
  {
    id: "AS-006",
    name: "Employee Workstation",
    type: "Endpoint",
    category: "User Device",
    criticality: "Medium",
    status: "Active",
    riskLevel: "Medium",
    compliance: 78,
    vulnerabilities: 3,
    lastScan: "2024-01-12",
    location: "Office Floor 3",
    owner: "IT Support",
    operatingSystem: "Windows 11",
    ipAddress: "10.0.5.45",
    framework: "NIST",
    businessValue: "Medium",
    dataClassification: "Internal",
  },
  {
    id: "AS-007",
    name: "Mobile Device Fleet",
    type: "Mobile",
    category: "User Device",
    criticality: "Medium",
    status: "Active",
    riskLevel: "Medium",
    compliance: 82,
    vulnerabilities: 2,
    lastScan: "2024-01-11",
    location: "Distributed",
    owner: "Mobile Team",
    operatingSystem: "iOS/Android",
    ipAddress: "Dynamic",
    framework: "ISO 27001",
    businessValue: "Medium",
    dataClassification: "Internal",
  },
  {
    id: "AS-008",
    name: "Backup Storage System",
    type: "Storage",
    category: "Infrastructure",
    criticality: "High",
    status: "Active",
    riskLevel: "Low",
    compliance: 92,
    vulnerabilities: 1,
    lastScan: "2024-01-10",
    location: "Data Center C",
    owner: "Backup Team",
    operatingSystem: "Linux",
    ipAddress: "10.0.6.100",
    framework: "CIS Controls",
    businessValue: "High",
    dataClassification: "Confidential",
  },
]

const assetCategories = [
  { name: "Infrastructure", count: 45, trend: "stable", icon: Server },
  { name: "Application", count: 32, trend: "up", icon: Globe },
  { name: "Security", count: 18, trend: "up", icon: Shield },
  { name: "Data", count: 12, trend: "down", icon: Database },
  { name: "User Device", count: 89, trend: "up", icon: Laptop },
  { name: "Network", count: 24, trend: "stable", icon: Network },
]

const assetTypes = [
  { name: "Server", count: 28, percentage: 20.4 },
  { name: "Endpoint", count: 67, percentage: 48.9 },
  { name: "Network", count: 15, percentage: 10.9 },
  { name: "Storage", count: 8, percentage: 5.8 },
  { name: "Application", count: 12, percentage: 8.8 },
  { name: "Mobile", count: 7, percentage: 5.1 },
]

export default function AssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCriticality, setSelectedCriticality] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredAssets = assetData.filter((asset) => {
    const matchesCriticality = selectedCriticality === "all" || asset.criticality.toLowerCase() === selectedCriticality
    const matchesRisk = selectedRisk === "all" || asset.riskLevel.toLowerCase() === selectedRisk
    const matchesType = selectedType === "all" || asset.type.toLowerCase() === selectedType
    const matchesLocation =
      selectedLocation === "all" || asset.location.toLowerCase().includes(selectedLocation.toLowerCase())
    return matchesCriticality && matchesRisk && matchesType && matchesLocation
  })

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
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

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
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

  const getAssetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "server":
        return <Server className="h-4 w-4" />
      case "endpoint":
        return <Monitor className="h-4 w-4" />
      case "network":
        return <Wifi className="h-4 w-4" />
      case "storage":
        return <HardDrive className="h-4 w-4" />
      case "application":
        return <Globe className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      default:
        return <FolderLock className="h-4 w-4" />
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
              placeholder="Search assets..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Asset
            </Button>
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
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Asset Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage your organization&apos;s digital assets and their security posture
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Assets</CardDescription>
                <CardTitle className="text-2xl">137</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+8 this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Critical Assets</CardDescription>
                <CardTitle className="text-2xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldAlert className="h-4 w-4 text-red-600" />
                  <span>Require attention</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Compliance</CardDescription>
                <CardTitle className="text-2xl">78%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>+5% improvement</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Vulnerable Assets</CardDescription>
                <CardTitle className="text-2xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span>-3 from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select value={selectedCriticality} onValueChange={setSelectedCriticality}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Criticality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="endpoint">Endpoint</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Distribution</CardTitle>
                    <CardDescription>Assets by type and percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assetTypes.map((type) => (
                        <div key={type.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {getAssetIcon(type.name)}
                              <span className="text-sm font-medium">{type.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={type.percentage} className="h-2 w-20" />
                            <span className="text-sm font-medium w-8">{type.count}</span>
                            <span className="text-xs text-muted-foreground w-12">{type.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Asset Categories</CardTitle>
                    <CardDescription>Distribution by business category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assetCategories.map((category) => {
                        const IconComponent = category.icon
                        return (
                          <div key={category.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm font-medium">{category.name}</span>
                                {category.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                                {category.trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
                                {category.trend === "stable" && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={(category.count / 100) * 100} className="h-2 w-20" />
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
                  <CardTitle>High-Risk Assets</CardTitle>
                  <CardDescription>Assets requiring immediate security attention</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Compliance</TableHead>
                        <TableHead className="hidden md:table-cell">Vulnerabilities</TableHead>
                        <TableHead className="hidden lg:table-cell">Last Scan</TableHead>
                        <TableHead className="hidden lg:table-cell">Owner</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets
                        .filter((asset) => asset.riskLevel === "High" || asset.riskLevel === "Critical")
                        .slice(0, 5)
                        .map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{asset.name}</div>
                                <div className="text-sm text-muted-foreground">{asset.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getAssetIcon(asset.type)}
                                <Badge variant="outline">{asset.type}</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getRiskColor(asset.riskLevel)}>
                                {asset.riskLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={asset.compliance} className="h-2 w-16" />
                                <span className="text-sm">{asset.compliance}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="text-sm">{asset.vulnerabilities}</span>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{asset.lastScan}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <span className="text-sm">{asset.owner}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Shield className="h-4 w-4" />
                                  <span className="sr-only">Security scan</span>
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

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Asset Inventory</CardTitle>
                  <CardDescription>Comprehensive view of all organizational assets</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset Details</TableHead>
                        <TableHead>Classification</TableHead>
                        <TableHead>Security Status</TableHead>
                        <TableHead>Technical Info</TableHead>
                        <TableHead>Business Context</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {getAssetIcon(asset.type)}
                                <span className="font-medium">{asset.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{asset.id}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{asset.location}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge variant="outline">{asset.type}</Badge>
                              <Badge variant="outline" className={getCriticalityColor(asset.criticality)}>
                                {asset.criticality}
                              </Badge>
                              <div className="text-xs text-muted-foreground">{asset.category}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge variant="outline" className={getRiskColor(asset.riskLevel)}>
                                {asset.riskLevel} Risk
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Progress value={asset.compliance} className="h-2 w-16" />
                                <span className="text-xs">{asset.compliance}%</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {asset.vulnerabilities} vulnerabilities
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-xs">
                              <div>{asset.operatingSystem}</div>
                              <div className="text-muted-foreground">{asset.ipAddress}</div>
                              <div className="text-muted-foreground">Scan: {asset.lastScan}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{asset.owner}</span>
                              </div>
                              <div>Value: {asset.businessValue}</div>
                              <div className="text-muted-foreground">{asset.dataClassification}</div>
                              <div className="text-muted-foreground">{asset.framework}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Shield className="h-4 w-4" />
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

            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assetCategories.map((category) => {
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
                            {category.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {category.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                            {category.trend === "stable" && <div className="h-4 w-4 rounded-full bg-gray-400" />}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{category.count}</span>
                            <span className="text-sm text-muted-foreground">Assets</span>
                          </div>
                          <Progress value={(category.count / 100) * 100} className="h-2" />
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

            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Overview</CardTitle>
                  <CardDescription>Asset compliance status across security frameworks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Framework Compliance</h4>
                      {["NIST", "ISO 27001", "CIS Controls", "PCI DSS", "HIPAA"].map((framework) => {
                        const compliance = Math.floor(Math.random() * 30) + 70 // Random compliance between 70-100
                        return (
                          <div key={framework} className="flex items-center justify-between">
                            <span className="text-sm">{framework}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={compliance} className="h-2 w-24" />
                              <span className="text-sm font-medium w-10">{compliance}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Compliance by Asset Type</h4>
                      {assetTypes.map((type) => {
                        const compliance = Math.floor(Math.random() * 25) + 75 // Random compliance between 75-100
                        return (
                          <div key={type.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getAssetIcon(type.name)}
                              <span className="text-sm">{type.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={compliance} className="h-2 w-24" />
                              <span className="text-sm font-medium w-10">{compliance}%</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Non-Compliant Assets</CardTitle>
                  <CardDescription>Assets requiring compliance remediation</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Framework</TableHead>
                        <TableHead>Compliance Score</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets
                        .filter((asset) => asset.compliance < 80)
                        .map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{asset.name}</div>
                                <div className="text-sm text-muted-foreground">{asset.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{asset.framework}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={asset.compliance} className="h-2 w-16" />
                                <span className="text-sm">{asset.compliance}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{Math.floor(Math.random() * 5) + 1} control gaps</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getCriticalityColor(asset.criticality)}>
                                {asset.criticality}
                              </Badge>
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
