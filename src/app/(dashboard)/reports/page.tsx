"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Download,
  Eye,
  FileText,
  Plus,
  Search,
  Settings,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const reportTemplates = [
  {
    id: "executive-summary",
    name: "Executive Summary",
    description: "High-level overview for leadership and stakeholders",
    type: "Executive",
    frameworks: ["All"],
    lastGenerated: "2024-01-15",
    size: "2.3 MB",
    pages: 8,
  },
  {
    id: "technical-detailed",
    name: "Technical Assessment Report",
    description: "Comprehensive technical analysis with detailed findings",
    type: "Technical",
    frameworks: ["NIST", "ISO 27001"],
    lastGenerated: "2024-01-14",
    size: "15.7 MB",
    pages: 45,
  },
  {
    id: "compliance-audit",
    name: "Compliance Audit Report",
    description: "Framework compliance status and gap analysis",
    type: "Compliance",
    frameworks: ["PCI DSS", "HIPAA"],
    lastGenerated: "2024-01-12",
    size: "8.9 MB",
    pages: 28,
  },
  {
    id: "vulnerability-assessment",
    name: "Vulnerability Assessment",
    description: "Detailed vulnerability analysis and remediation recommendations",
    type: "Security",
    frameworks: ["CIS Controls"],
    lastGenerated: "2024-01-10",
    size: "12.4 MB",
    pages: 35,
  },
  {
    id: "risk-analysis",
    name: "Risk Analysis Report",
    description: "Risk assessment with impact and probability analysis",
    type: "Risk",
    frameworks: ["All"],
    lastGenerated: "2024-01-08",
    size: "6.2 MB",
    pages: 22,
  },
]

const recentReports = [
  {
    id: "RPT-2024-001",
    name: "Q1 2024 Security Assessment",
    type: "Quarterly",
    generatedDate: "2024-01-15",
    generatedBy: "John Smith",
    format: "PDF",
    size: "8.7 MB",
    status: "Ready",
  },
  {
    id: "RPT-2024-002",
    name: "NIST Framework Compliance",
    type: "Compliance",
    generatedDate: "2024-01-14",
    generatedBy: "Sarah Johnson",
    format: "XLSX",
    size: "3.2 MB",
    status: "Ready",
  },
  {
    id: "RPT-2024-003",
    name: "Threat Landscape Analysis",
    type: "Security",
    generatedDate: "2024-01-12",
    generatedBy: "Mike Chen",
    format: "PDF",
    size: "12.1 MB",
    status: "Ready",
  },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeRawData, setIncludeRawData] = useState(false)
  const [customNotes, setCustomNotes] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFrameworkChange = (framework: string, checked: boolean) => {
    if (checked) {
      setSelectedFrameworks([...selectedFrameworks, framework])
    } else {
      setSelectedFrameworks(selectedFrameworks.filter((f) => f !== framework))
    }
  }

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(`Report generated successfully! Format: ${selectedFormat.toUpperCase()}`)
    }, 3000)
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex w-full items-center gap-2">
          <form className="relative flex flex-1 md:max-w-sm lg:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search reports..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container py-6 md:py-8">
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Security Reports</h1>
            <p className="text-muted-foreground">
              Generate comprehensive security reports for stakeholders and compliance requirements
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Reports</CardDescription>
                <CardTitle className="text-2xl">47</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>+5 this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Templates Available</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  <span>5 frameworks</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Generated</CardDescription>
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
                <CardDescription>Export Formats</CardDescription>
                <CardTitle className="text-2xl">PDF/XLSX</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <span>Multiple formats</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="generate" className="space-y-6">
            <TabsList>
              <TabsTrigger value="generate">Generate Report</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Report Configuration */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Configuration</CardTitle>
                      <CardDescription>Configure your security report settings and content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Template Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="template">Report Template</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a report template" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name} - {template.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Framework Selection */}
                      <div className="space-y-3">
                        <Label>Security Frameworks</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {["NIST", "ISO 27001", "CIS Controls", "PCI DSS", "HIPAA"].map((framework) => (
                            <div key={framework} className="flex items-center space-x-2">
                              <Checkbox
                                id={framework}
                                checked={selectedFrameworks.includes(framework)}
                                onCheckedChange={(checked) => handleFrameworkChange(framework, checked as boolean)}
                              />
                              <Label htmlFor={framework} className="text-sm">
                                {framework}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Export Format */}
                      <div className="space-y-2">
                        <Label htmlFor="format">Export Format</Label>
                        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="xlsx">Excel Spreadsheet (XLSX)</SelectItem>
                            <SelectItem value="both">Both PDF and XLSX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Additional Options */}
                      <div className="space-y-3">
                        <Label>Additional Options</Label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="charts"
                              checked={includeCharts}
                              onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                            />
                            <Label htmlFor="charts" className="text-sm">
                              Include charts and visualizations
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="rawdata" 
                              checked={includeRawData} 
                              onCheckedChange={(checked) => setIncludeRawData(!!checked)}
                            />
                            <Label htmlFor="rawdata" className="text-sm">
                              Include raw data tables
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Custom Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="notes">Custom Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any custom notes or context for this report..."
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Report Preview & Generation */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Preview</CardTitle>
                      <CardDescription>Preview of your configured report</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedTemplate ? (
                        <div className="space-y-3">
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium">
                              {reportTemplates.find((t) => t.id === selectedTemplate)?.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {reportTemplates.find((t) => t.id === selectedTemplate)?.description}
                            </p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Frameworks:</span>
                              <span>{selectedFrameworks.length || "None"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Format:</span>
                              <span className="uppercase">{selectedFormat}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Charts:</span>
                              <span>{includeCharts ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Raw Data:</span>
                              <span>{includeRawData ? "Yes" : "No"}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                          <p>Select a template to preview</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Report</CardTitle>
                      <CardDescription>Create your customized security report</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isGenerating && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <span>Generating report...</span>
                          </div>
                          <Progress value={66} className="h-2" />
                        </div>
                      )}
                      <Button
                        onClick={handleGenerateReport}
                        disabled={!selectedTemplate || selectedFrameworks.length === 0 || isGenerating}
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate Report"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Report generation typically takes 1-3 minutes
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>Pre-configured report templates for different use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reportTemplates.map((template) => (
                      <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <Badge variant="outline">{template.type}</Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="text-sm">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Frameworks:</span>
                              <span>{template.frameworks.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pages:</span>
                              <span>{template.pages}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Used:</span>
                              <span>{template.lastGenerated}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Recently generated security reports</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{report.name}</div>
                              <div className="text-sm text-muted-foreground">{report.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{report.generatedDate}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">by {report.generatedBy}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.format}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{report.size}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View report</span>
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
