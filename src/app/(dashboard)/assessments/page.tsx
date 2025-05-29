"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle2, Info, Shield, Settings, Eye, CheckSquare, TrendingUp, Upload, Plus } from "lucide-react"

const rmfSteps = [
  { id: 0, name: "Prepare", description: "Assessment Setup", icon: Settings, status: "completed" },
  { id: 1, name: "Categorize", description: "System Impact", icon: Shield, status: "completed" },
  { id: 2, name: "Select", description: "Security Controls", icon: CheckSquare, status: "completed" },
  { id: 3, name: "Implement", description: "Deploy Controls", icon: Settings, status: "completed" },
  { id: 4, name: "Assess", description: "Evaluate Controls", icon: Eye, status: "completed" },
  { id: 5, name: "Authorize", description: "Risk Decision", icon: CheckCircle2, status: "current" },
  { id: 6, name: "Monitor", description: "Continuous Monitoring", icon: TrendingUp, status: "pending" },
]

const riskMatrix = [
  { likelihood: "Very High", impact: ["Medium", "High", "Very High", "Very High", "Very High"] },
  { likelihood: "High", impact: ["Medium", "Medium", "High", "High", "Very High"] },
  { likelihood: "Medium", impact: ["Low", "Medium", "Medium", "High", "High"] },
  { likelihood: "Low", impact: ["Very Low", "Low", "Medium", "Medium", "High"] },
  { likelihood: "Very Low", impact: ["Very Low", "Very Low", "Low", "Low", "Medium"] },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Very High":
      return "bg-red-500"
    case "High":
      return "bg-orange-500"
    case "Medium":
      return "bg-yellow-500"
    case "Low":
      return "bg-blue-500"
    case "Very Low":
      return "bg-green-500"
    default:
      return "bg-gray-300"
  }
}

export default function NistRmfAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentType, setAssessmentType] = useState("qualitative")
  const [assessmentApproach, setAssessmentApproach] = useState("asset-based")
  const [activeTab, setActiveTab] = useState("controls")

  function ImplementControls() {
    // Define interface for control items
    interface ControlItem {
      id: string;
      name: string;
      status: string;
      progress: number;
      assignee: string;
      dueDate: string;
      priority: string;
      implementation: {
        description: string;
        procedures: string[];
        artifacts: string[];
        testResults: string;
      };
    }
    
    const [selectedControl, setSelectedControl] = useState<ControlItem | null>(null)
    const [implementationView, setImplementationView] = useState("overview")

    const controls = [
      {
        id: "AC-1",
        name: "Access Control Policy and Procedures",
        status: "Implemented",
        progress: 100,
        assignee: "John Smith",
        dueDate: "2024-01-15",
        priority: "High",
        implementation: {
          description: "Formal access control policy documented and approved",
          procedures: ["User access request process", "Access review procedures", "Termination procedures"],
          artifacts: ["AC Policy v2.1.pdf", "Access Request Form.docx"],
          testResults: "Passed - Policy reviewed and approved by CISO",
        },
      },
      {
        id: "AC-2",
        name: "Account Management",
        status: "In Progress",
        progress: 75,
        assignee: "Sarah Johnson",
        dueDate: "2024-02-01",
        priority: "High",
        implementation: {
          description: "Automated account provisioning system being deployed",
          procedures: ["Account creation workflow", "Periodic access reviews"],
          artifacts: ["Account Management SOP.pdf"],
          testResults: "In Progress - Testing automated workflows",
        },
      },
      {
        id: "AC-3",
        name: "Access Enforcement",
        status: "Planned",
        progress: 25,
        assignee: "Mike Davis",
        dueDate: "2024-02-15",
        priority: "Medium",
        implementation: {
          description: "Role-based access control implementation planned",
          procedures: ["RBAC matrix definition", "Access enforcement testing"],
          artifacts: [],
          testResults: "Not Started",
        },
      },
      {
        id: "AU-1",
        name: "Audit and Accountability Policy",
        status: "Implemented",
        progress: 100,
        assignee: "Lisa Chen",
        dueDate: "2024-01-10",
        priority: "High",
        implementation: {
          description: "Comprehensive audit policy established",
          procedures: ["Log collection procedures", "Audit review process"],
          artifacts: ["Audit Policy v1.2.pdf", "Log Retention Schedule.xlsx"],
          testResults: "Passed - Policy implemented and operational",
        },
      },
    ]

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Implemented":
          return "bg-green-500"
        case "In Progress":
          return "bg-blue-500"
        case "Planned":
          return "bg-yellow-500"
        case "Not Started":
          return "bg-gray-500"
        default:
          return "bg-gray-500"
      }
    }

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "High":
          return "bg-red-500"
        case "Medium":
          return "bg-yellow-500"
        case "Low":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Implement Security Controls</h2>
          <p className="text-muted-foreground">
            Deploy and configure selected security controls with proper documentation
          </p>
        </div>

        <Tabs value={implementationView} onValueChange={setImplementationView}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Implementation Overview</TabsTrigger>
            <TabsTrigger value="details">Control Details</TabsTrigger>
            <TabsTrigger value="artifacts">Artifacts & Evidence</TabsTrigger>
            <TabsTrigger value="testing">Testing & Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-muted-foreground">Implemented</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-muted-foreground">Planned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">75%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Control Implementation Status</CardTitle>
                <CardDescription>Track progress of security control deployment</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Control</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {controls.map((control) => (
                      <TableRow key={control.id}>
                        <TableCell>
                          <div>
                            <div className="font-mono text-sm">{control.id}</div>
                            <div className="text-sm text-muted-foreground">{control.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(control.status)} hover:${getStatusColor(control.status)}`}
                          >
                            {control.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={control.progress} className="h-2" />
                            <div className="text-xs text-muted-foreground">{control.progress}%</div>
                          </div>
                        </TableCell>
                        <TableCell>{control.assignee}</TableCell>
                        <TableCell>{control.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${getPriorityColor(control.priority)} hover:${getPriorityColor(control.priority)}`}
                          >
                            {control.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedControl(control)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
                <CardDescription>Detailed implementation information for each control</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedControl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {(selectedControl as ControlItem).id} - {(selectedControl as ControlItem).name}
                      </h3>
                      <Badge
                        className={`${getStatusColor((selectedControl as ControlItem).status)} hover:${getStatusColor((selectedControl as ControlItem).status)}`}
                      >
                        {(selectedControl as ControlItem).status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Implementation Description</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(selectedControl as ControlItem).implementation.description}
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Procedures</Label>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                          {(selectedControl as ControlItem).implementation.procedures.map((procedure, index) => (
                            <li key={index}>{procedure}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Test Results</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(selectedControl as ControlItem).implementation.testResults}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Select a control from the overview to view implementation details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artifacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Artifacts</CardTitle>
                <CardDescription>Documentation and evidence of control implementation</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedControl ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{(selectedControl as ControlItem).id} - Artifacts</h3>

                    {(selectedControl as ControlItem).implementation.artifacts.length > 0 ? (
                      <div className="space-y-2">
                        {(selectedControl as ControlItem).implementation.artifacts.map((artifact: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Upload className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{artifact}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                        <p>No artifacts uploaded yet</p>
                      </div>
                    )}

                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Artifact
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p>Select a control to manage artifacts</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testing & Validation</CardTitle>
                <CardDescription>Control testing procedures and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">2</div>
                        <div className="text-sm text-muted-foreground">Tests Passed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">1</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-gray-600">1</div>
                        <div className="text-sm text-muted-foreground">Not Started</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Proceed to Assessment</Button>
        </div>
      </div>
    )
  }

  function AssessControls({
    assessmentType,
    activeTab,
    setActiveTab,
  }: {
    assessmentType: string
    activeTab: string
    setActiveTab: (tab: string) => void
  }) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Assess Security Controls</h2>
          <p className="text-muted-foreground">
            Evaluate control effectiveness and identify risks through comprehensive testing
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="controls">Control Assessment</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="findings">Assessment Findings</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-6">
            <EnhancedControlAssessmentTab />
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-6">
            <EnhancedVulnerabilitiesTab />
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <EnhancedThreatsTab />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RiskCalculationTab assessmentType={assessmentType} />
          </TabsContent>

          <TabsContent value="findings" className="space-y-6">
            <AssessmentFindingsTab />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Complete Assessment & Authorize</Button>
        </div>
      </div>
    )
  }

  function EnhancedControlAssessmentTab() {
    const controls = [
      {
        id: "AC-1",
        name: "Access Control Policy",
        status: "Implemented",
        effectiveness: "Effective",
        testMethod: "Interview, Document Review",
        findings: "Policy is comprehensive and up-to-date",
        deficiencies: "None identified",
        lastTested: "2024-01-15",
      },
      {
        id: "AC-2",
        name: "Account Management",
        status: "Partially Implemented",
        effectiveness: "Partially Effective",
        testMethod: "Automated Testing, Sampling",
        findings: "Automated provisioning working, manual reviews inconsistent",
        deficiencies: "Quarterly access reviews not consistently performed",
        lastTested: "2024-01-20",
      },
      {
        id: "AC-3",
        name: "Access Enforcement",
        status: "Implemented",
        effectiveness: "Effective",
        testMethod: "Technical Testing",
        findings: "RBAC properly configured and enforced",
        deficiencies: "None identified",
        lastTested: "2024-01-18",
      },
    ]

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-muted-foreground">Effective Controls</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Partially Effective</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-muted-foreground">Ineffective</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-sm text-muted-foreground">Overall Effectiveness</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Control Assessment</CardTitle>
            <CardDescription>Comprehensive evaluation of control implementation and effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Control</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Effectiveness</TableHead>
                  <TableHead>Test Method</TableHead>
                  <TableHead>Last Tested</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controls.map((control) => (
                  <TableRow key={control.id}>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{control.id}</div>
                        <div className="text-sm text-muted-foreground">{control.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={control.status === "Implemented" ? "default" : "secondary"}>
                        {control.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          control.effectiveness === "Effective"
                            ? "bg-green-500 hover:bg-green-600"
                            : control.effectiveness === "Partially Effective"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {control.effectiveness}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{control.testMethod}</TableCell>
                    <TableCell className="text-sm">{control.lastTested}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  function EnhancedVulnerabilitiesTab() {
    const vulnerabilities = [
      {
        id: "CVE-2024-0001",
        title: "SQL Injection in Web Application",
        severity: "High",
        cvss: "8.1",
        asset: "Web Server 01",
        status: "Open",
        discoveredDate: "2024-01-10",
        dueDate: "2024-02-10",
      },
      {
        id: "CVE-2024-0002",
        title: "Outdated SSL/TLS Configuration",
        severity: "Medium",
        cvss: "5.3",
        asset: "Load Balancer",
        status: "In Progress",
        discoveredDate: "2024-01-12",
        dueDate: "2024-02-15",
      },
      {
        id: "INTERNAL-001",
        title: "Weak Password Policy",
        severity: "Medium",
        cvss: "4.7",
        asset: "Active Directory",
        status: "Open",
        discoveredDate: "2024-01-15",
        dueDate: "2024-02-20",
      },
    ]

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "Critical":
          return "bg-purple-500"
        case "High":
          return "bg-red-500"
        case "Medium":
          return "bg-yellow-500"
        case "Low":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-muted-foreground">High Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-muted-foreground">Medium Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Low Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">6.0</div>
              <div className="text-sm text-muted-foreground">Avg CVSS Score</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Register</CardTitle>
            <CardDescription>Identified vulnerabilities and remediation status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vulnerability</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>CVSS</TableHead>
                  <TableHead>Affected Asset</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilities.map((vuln) => (
                  <TableRow key={vuln.id}>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{vuln.id}</div>
                        <div className="text-sm text-muted-foreground">{vuln.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getSeverityColor(vuln.severity)} hover:${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{vuln.cvss}</TableCell>
                    <TableCell>{vuln.asset}</TableCell>
                    <TableCell>
                      <Badge variant={vuln.status === "Open" ? "destructive" : "secondary"}>{vuln.status}</Badge>
                    </TableCell>
                    <TableCell>{vuln.dueDate}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Remediate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Vulnerability
        </Button>
      </div>
    )
  }

  function EnhancedThreatsTab() {
    const threats = [
      {
        id: "T-001",
        name: "Advanced Persistent Threat",
        category: "External",
        likelihood: "Medium",
        capability: "High",
        intent: "High",
        targeting: "Medium",
        assets: ["Web Servers", "Database", "User Workstations"],
        mitigations: ["Network Segmentation", "EDR Solution", "User Training"],
      },
      {
        id: "T-002",
        name: "Insider Threat - Malicious",
        category: "Internal",
        likelihood: "Low",
        capability: "High",
        intent: "Medium",
        targeting: "High",
        assets: ["Customer Database", "Financial Systems"],
        mitigations: ["Access Controls", "Monitoring", "Background Checks"],
      },
      {
        id: "T-003",
        name: "Ransomware Attack",
        category: "External",
        likelihood: "High",
        capability: "Medium",
        intent: "High",
        targeting: "Medium",
        assets: ["File Servers", "Workstations", "Backup Systems"],
        mitigations: ["Backup Strategy", "Email Security", "Endpoint Protection"],
      },
    ]

    const getLikelihoodColor = (likelihood: string) => {
      switch (likelihood) {
        case "High":
          return "bg-red-500"
        case "Medium":
          return "bg-yellow-500"
        case "Low":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-muted-foreground">High Likelihood</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Medium Likelihood</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Low Likelihood</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Threat Analysis</CardTitle>
            <CardDescription>Identified threat actors and scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Threat</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Likelihood</TableHead>
                  <TableHead>Capability</TableHead>
                  <TableHead>Targeted Assets</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threats.map((threat) => (
                  <TableRow key={threat.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{threat.name}</div>
                        <div className="text-sm text-muted-foreground">{threat.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{threat.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getLikelihoodColor(threat.likelihood)} hover:${getLikelihoodColor(threat.likelihood)}`}
                      >
                        {threat.likelihood}
                      </Badge>
                    </TableCell>
                    <TableCell>{threat.capability}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {threat.assets.slice(0, 2).join(", ")}
                        {threat.assets.length > 2 && ` +${threat.assets.length - 2} more`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Threat Scenario
        </Button>
      </div>
    )
  }

  function AssessmentFindingsTab() {
    const findings = [
      {
        id: "F-001",
        type: "Control Deficiency",
        severity: "High",
        title: "Inconsistent Access Reviews",
        description: "Quarterly access reviews are not consistently performed across all systems",
        affectedControls: ["AC-2"],
        recommendation: "Implement automated access review workflow with mandatory quarterly reviews",
        status: "Open",
        assignee: "Sarah Johnson",
      },
      {
        id: "F-002",
        type: "Vulnerability",
        severity: "High",
        title: "SQL Injection Vulnerability",
        description: "Web application vulnerable to SQL injection attacks",
        affectedControls: ["SI-10", "SI-15"],
        recommendation: "Implement input validation and parameterized queries",
        status: "In Progress",
        assignee: "Mike Davis",
      },
      {
        id: "F-003",
        type: "Policy Gap",
        severity: "Medium",
        title: "Incomplete Incident Response Procedures",
        description: "Incident response procedures lack specific steps for ransomware scenarios",
        affectedControls: ["IR-4", "IR-8"],
        recommendation: "Update incident response plan with ransomware-specific procedures",
        status: "Open",
        assignee: "Lisa Chen",
      },
    ]

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "Critical":
          return "bg-purple-500"
        case "High":
          return "bg-red-500"
        case "Medium":
          return "bg-yellow-500"
        case "Low":
          return "bg-green-500"
        default:
          return "bg-gray-500"
      }
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-muted-foreground">High Findings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-muted-foreground">Medium Findings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Low Findings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Total Findings</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Findings</CardTitle>
            <CardDescription>Identified deficiencies and recommendations for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Finding</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Affected Controls</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findings.map((finding) => (
                  <TableRow key={finding.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{finding.title}</div>
                        <div className="text-sm text-muted-foreground">{finding.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{finding.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getSeverityColor(finding.severity)} hover:${getSeverityColor(finding.severity)}`}
                      >
                        {finding.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-mono">{finding.affectedControls.join(", ")}</div>
                    </TableCell>
                    <TableCell>{finding.assignee}</TableCell>
                    <TableCell>
                      <Badge variant={finding.status === "Open" ? "destructive" : "secondary"}>{finding.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  function AuthorizeSystem() {
    const [authorizationDecision, setAuthorizationDecision] = useState("authorize-conditions")

    const riskRegister = [
      {
        id: "R-001",
        description: "Inconsistent access review process",
        likelihood: "High",
        impact: "Medium",
        level: "High",
        status: "Open",
        mitigation: "Implement automated access review workflow",
        residualRisk: "Medium",
        owner: "Sarah Johnson",
      },
      {
        id: "R-002",
        description: "SQL injection vulnerability in web application",
        likelihood: "Medium",
        impact: "High",
        level: "High",
        status: "In Progress",
        mitigation: "Code remediation and input validation",
        residualRisk: "Low",
        owner: "Mike Davis",
      },
      {
        id: "R-003",
        description: "Incomplete incident response procedures",
        likelihood: "Low",
        impact: "Medium",
        level: "Low",
        status: "Accepted",
        mitigation: "Update IR procedures for ransomware scenarios",
        residualRisk: "Low",
        owner: "Lisa Chen",
      },
    ]

    const poamItems = [
      {
        id: "POA-001",
        weakness: "Inconsistent Access Reviews",
        resources: "IT Security Team, HR",
        scheduledCompletion: "2024-03-15",
        milestones: ["Workflow Design (Feb 15)", "Implementation (Mar 1)", "Testing (Mar 15)"],
        status: "On Track",
      },
      {
        id: "POA-002",
        weakness: "SQL Injection Vulnerability",
        resources: "Development Team, Security Team",
        scheduledCompletion: "2024-02-28",
        milestones: ["Code Review (Feb 10)", "Remediation (Feb 20)", "Testing (Feb 28)"],
        status: "At Risk",
      },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Authorize System Operation</h2>
          <p className="text-muted-foreground">Review assessment results and make informed authorization decision</p>
        </div>

        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Executive Summary</TabsTrigger>
            <TabsTrigger value="risks">Risk Register</TabsTrigger>
            <TabsTrigger value="poam">POA&M</TabsTrigger>
            <TabsTrigger value="decision">Authorization Decision</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-sm text-muted-foreground">High Risks</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">0</div>
                      <div className="text-sm text-muted-foreground">Medium Risks</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1</div>
                      <div className="text-sm text-muted-foreground">Low Risks</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-muted-foreground">Control Coverage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Controls Assessed</span>
                      <span className="font-medium">8/8 (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Effective Controls</span>
                      <span className="font-medium">6/8 (75%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Vulnerabilities Found</span>
                      <span className="font-medium">3 (1 High, 2 Medium)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assessment Duration</span>
                      <span className="font-medium">14 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-700">Critical Issues</h4>
                    <p className="text-sm text-muted-foreground">
                      SQL injection vulnerability requires immediate attention
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-yellow-700">Areas for Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Access review processes need standardization and automation
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-700">Strengths</h4>
                    <p className="text-sm text-muted-foreground">
                      Strong policy framework and audit capabilities in place
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Risk Register</CardTitle>
                <CardDescription>
                  All identified risks with mitigation strategies and residual risk levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Risk ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Current Risk</TableHead>
                      <TableHead>Mitigation</TableHead>
                      <TableHead>Residual Risk</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riskRegister.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell className="font-mono text-sm">{risk.id}</TableCell>
                        <TableCell>{risk.description}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              risk.level === "High"
                                ? "bg-red-500 hover:bg-red-600"
                                : risk.level === "Medium"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-green-500 hover:bg-green-600"
                            }
                          >
                            {risk.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{risk.mitigation}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              risk.residualRisk === "High"
                                ? "bg-red-500 hover:bg-red-600"
                                : risk.residualRisk === "Medium"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-green-500 hover:bg-green-600"
                            }
                          >
                            {risk.residualRisk}
                          </Badge>
                        </TableCell>
                        <TableCell>{risk.owner}</TableCell>
                        <TableCell>
                          <Badge variant={risk.status === "Open" ? "destructive" : "secondary"}>{risk.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="poam" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan of Action & Milestones (POA&M)</CardTitle>
                <CardDescription>Remediation plan for identified weaknesses and deficiencies</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>POA&M ID</TableHead>
                      <TableHead>Weakness/Deficiency</TableHead>
                      <TableHead>Resources Required</TableHead>
                      <TableHead>Scheduled Completion</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poamItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.id}</TableCell>
                        <TableCell>{item.weakness}</TableCell>
                        <TableCell className="text-sm">{item.resources}</TableCell>
                        <TableCell>{item.scheduledCompletion}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "On Track" ? "default" : "destructive"}>{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Milestones
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authorization Decision</CardTitle>
                <CardDescription>Make the final authorization decision based on assessment results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={authorizationDecision} onValueChange={setAuthorizationDecision}>
                  <div className="space-y-4">
                    <Card
                      className={`cursor-pointer transition-colors ${authorizationDecision === "authorize" ? "ring-2 ring-green-500" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="authorize" id="authorize" />
                          <Label htmlFor="authorize" className="font-medium cursor-pointer text-green-700">
                            Authorize Operation
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          System meets security requirements and can operate with acceptable risk
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-colors ${authorizationDecision === "authorize-conditions" ? "ring-2 ring-yellow-500" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="authorize-conditions" id="authorize-conditions" />
                          <Label htmlFor="authorize-conditions" className="font-medium cursor-pointer text-yellow-700">
                            Authorize with Conditions
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          System can operate with specific conditions and timeline for risk mitigation
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-colors ${authorizationDecision === "deny" ? "ring-2 ring-red-500" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="deny" id="deny" />
                          <Label htmlFor="deny" className="font-medium cursor-pointer text-red-700">
                            Deny Authorization
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          System does not meet security requirements and cannot operate
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </RadioGroup>

                {authorizationDecision === "authorize-conditions" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Authorization Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Specific Conditions</Label>
                        <Textarea
                          placeholder="List specific conditions that must be met..."
                          className="min-h-[100px]"
                          defaultValue="1. SQL injection vulnerability must be remediated within 30 days
2. Access review process must be automated within 60 days
3. Monthly security status reports required"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Authorization Period</Label>
                          <Select defaultValue="1-year">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6-months">6 Months</SelectItem>
                              <SelectItem value="1-year">1 Year</SelectItem>
                              <SelectItem value="2-years">2 Years</SelectItem>
                              <SelectItem value="3-years">3 Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Next Review Date</Label>
                          <Input type="date" defaultValue="2025-01-27" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="rationale">Authorization Rationale</Label>
                  <Textarea
                    id="rationale"
                    placeholder="Provide detailed rationale for the authorization decision..."
                    className="min-h-[120px]"
                    defaultValue="Based on the comprehensive risk assessment, the system demonstrates adequate security controls with identified areas for improvement. The high-risk SQL injection vulnerability and access review process deficiencies can be mitigated through the specified conditions and timeline. The overall security posture is acceptable for continued operation with enhanced monitoring."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Authorizing Official</Label>
                    <Input defaultValue="Chief Information Security Officer" />
                  </div>
                  <div className="space-y-2">
                    <Label>Authorization Date</Label>
                    <Input type="date" defaultValue="2024-01-27" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Submit Authorization & Proceed to Monitor</Button>
        </div>
      </div>
    )
  }

  function MonitorSystem() {
    const [monitoringView, setMonitoringView] = useState("dashboard")

    const securityMetrics = [
      { name: "Control Effectiveness", current: 85, target: 90, trend: "up" },
      { name: "Vulnerability Remediation", current: 78, target: 95, trend: "up" },
      { name: "Incident Response Time", current: 92, target: 85, trend: "down" },
      { name: "Compliance Score", current: 88, target: 95, trend: "stable" },
    ]

    const recentEvents = [
      {
        id: "E-001",
        timestamp: "2024-01-27 14:30",
        type: "Security Alert",
        severity: "Medium",
        description: "Multiple failed login attempts detected",
        status: "Investigating",
        assignee: "SOC Team",
      },
      {
        id: "E-002",
        timestamp: "2024-01-27 12:15",
        type: "Control Change",
        severity: "Low",
        description: "Firewall rule updated for web server access",
        status: "Approved",
        assignee: "Network Team",
      },
      {
        id: "E-003",
        timestamp: "2024-01-27 09:45",
        type: "Vulnerability",
        severity: "High",
        description: "New CVE identified affecting web application",
        status: "Open",
        assignee: "Security Team",
      },
    ]

    const upcomingTasks = [
      {
        id: "T-001",
        task: "Quarterly Access Review",
        dueDate: "2024-02-15",
        assignee: "Sarah Johnson",
        priority: "High",
        status: "Pending",
      },
      {
        id: "T-002",
        task: "Vulnerability Scan - Production",
        dueDate: "2024-02-01",
        assignee: "Security Team",
        priority: "Medium",
        status: "Scheduled",
      },
      {
        id: "T-003",
        task: "Control Assessment - AC-2",
        dueDate: "2024-02-10",
        assignee: "Mike Davis",
        priority: "Medium",
        status: "In Progress",
      },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Continuous Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor security posture and maintain authorization through ongoing assessment
          </p>
        </div>

        <Tabs value={monitoringView} onValueChange={setMonitoringView}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="tasks">Monitoring Tasks</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <div className="text-sm text-muted-foreground">Authorization Status</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-muted-foreground">Control Effectiveness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-muted-foreground">Open Findings</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">127</div>
                  <div className="text-sm text-muted-foreground">Days Since Authorization</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Security Events</CardTitle>
                  <CardDescription>Latest security alerts and incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={
                                event.severity === "High"
                                  ? "bg-red-500 hover:bg-red-600"
                                  : event.severity === "Medium"
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-green-500 hover:bg-green-600"
                              }
                            >
                              {event.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                          </div>
                          <div className="text-sm font-medium">{event.description}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Scheduled monitoring and assessment activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{task.task}</div>
                          <div className="text-xs text-muted-foreground">
                            Due: {task.dueDate} | Assigned: {task.assignee}
                          </div>
                        </div>
                        <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>{task.priority}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for security program effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {securityMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {metric.current}% / {metric.target}%
                          </span>
                          <TrendingUp
                            className={`w-4 h-4 ${metric.trend === "up"
                              ? "text-green-500"
                              : metric.trend === "down"
                                ? "text-red-500"
                                : "text-gray-500"
                              }`}
                          />
                        </div>
                      </div>
                      <Progress value={metric.current} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Events Log</CardTitle>
                <CardDescription>Comprehensive log of security-related events and incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event ID</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assignee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono text-sm">{event.id}</TableCell>
                        <TableCell className="text-sm">{event.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              event.severity === "High"
                                ? "bg-red-500 hover:bg-red-600"
                                : event.severity === "Medium"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-green-500 hover:bg-green-600"
                            }
                          >
                            {event.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>
                          <Badge variant={event.status === "Open" ? "destructive" : "secondary"}>{event.status}</Badge>
                        </TableCell>
                        <TableCell>{event.assignee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Tasks & Schedule</CardTitle>
                <CardDescription>Ongoing monitoring activities and assessment schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-mono text-sm">{task.id}</TableCell>
                        <TableCell>{task.task}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              task.priority === "High"
                                ? "bg-red-500 hover:bg-red-600"
                                : task.priority === "Medium"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "bg-green-500 hover:bg-green-600"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={task.status === "Pending" ? "destructive" : "secondary"}>{task.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Task
            </Button>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automated Reports</CardTitle>
                  <CardDescription>Scheduled security and compliance reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Monthly Security Dashboard</div>
                      <div className="text-sm text-muted-foreground">Next: Feb 1, 2024</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Quarterly Risk Assessment</div>
                      <div className="text-sm text-muted-foreground">Next: Mar 31, 2024</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Annual Authorization Review</div>
                      <div className="text-sm text-muted-foreground">Next: Jan 27, 2025</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>Security trend analysis and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Trend Analysis</h4>
                    <p className="text-sm text-blue-600">
                      Security posture has improved 12% over the last quarter with enhanced monitoring capabilities.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-700 mb-2">Recommendations</h4>
                    <p className="text-sm text-yellow-600">
                      Consider implementing automated vulnerability scanning to reduce manual effort and improve
                      coverage.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">Achievements</h4>
                    <p className="text-sm text-green-600">
                      Successfully maintained 99.2% uptime while improving security control effectiveness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>Create ad-hoc reports for specific requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="risk-summary">Risk Summary</SelectItem>
                        <SelectItem value="control-assessment">Control Assessment</SelectItem>
                        <SelectItem value="vulnerability-report">Vulnerability Report</SelectItem>
                        <SelectItem value="compliance-status">Compliance Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Complete RMF Cycle</Button>
        </div>
      </div>
    )
  }

  function AssessmentSetup({
    assessmentType,
    setAssessmentType,
    assessmentApproach,
    setAssessmentApproach,
  }: {
    assessmentType: string
    setAssessmentType: (type: string) => void
    assessmentApproach: string
    setAssessmentApproach: (approach: string) => void
  }) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Assessment Setup</h2>
          <p className="text-muted-foreground">Configure your risk assessment parameters and approach</p>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Information</CardTitle>
              <CardDescription>Provide basic details about this assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assessment-name">Assessment Name</Label>
                  <Input id="assessment-name" placeholder="e.g., Q1 2024 Infrastructure Assessment" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assessment-date">Assessment Date</Label>
                  <Input id="assessment-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope">Scope Definition</Label>
                <Textarea
                  id="scope"
                  placeholder="Define the systems, assets, and boundaries included in this assessment..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Assessment Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Assessment Methodology
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose how you want to measure and express risk</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>Select your preferred risk assessment approach</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={assessmentType} onValueChange={setAssessmentType}>
                <div className="grid grid-cols-3 gap-4">
                  <Card
                    className={`cursor-pointer transition-colors ${assessmentType === "qualitative" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="qualitative" id="qualitative" />
                        <Label htmlFor="qualitative" className="font-medium cursor-pointer">
                          Qualitative
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uses descriptive scales (Low, Medium, High) for likelihood and impact assessment
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${assessmentType === "quantitative" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="quantitative" id="quantitative" />
                        <Label htmlFor="quantitative" className="font-medium cursor-pointer">
                          Quantitative
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uses numerical values (AV, EF, ARO) to calculate financial risk exposure (SLE, ALE)
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${assessmentType === "hybrid" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid" className="font-medium cursor-pointer">
                          Hybrid
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Combines qualitative and quantitative methods for comprehensive analysis
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Assessment Approach */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Approach</CardTitle>
              <CardDescription>Choose your starting point for the risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={assessmentApproach} onValueChange={setAssessmentApproach}>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer transition-colors ${assessmentApproach === "asset-based" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="asset-based" id="asset-based" />
                        <Label htmlFor="asset-based" className="font-medium cursor-pointer">
                          Asset-Based
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Start by identifying and cataloging assets, then assess threats and vulnerabilities against them
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-colors ${assessmentApproach === "threat-based" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="threat-based" id="threat-based" />
                        <Label htmlFor="threat-based" className="font-medium cursor-pointer">
                          Threat-Based
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Start by identifying threat scenarios, then map them to affected assets and vulnerabilities
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" className="px-8">
              Start Assessment
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  function CategorizeSystem() {
    const informationTypes = [
      { name: "Customer Data", confidentiality: "High", integrity: "High", availability: "Medium" },
      { name: "Financial Records", confidentiality: "High", integrity: "High", availability: "High" },
      { name: "System Logs", confidentiality: "Low", integrity: "Medium", availability: "Low" },
      { name: "Configuration Data", confidentiality: "Medium", integrity: "High", availability: "Medium" },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Categorize System</h2>
          <p className="text-muted-foreground">Determine the impact level for each information type using FIPS 199</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Information Types & Impact Levels</CardTitle>
            <CardDescription>
              Assess the potential impact of a security breach on confidentiality, integrity, and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Information Type</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      Confidentiality
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Impact of unauthorized disclosure</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      Integrity
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Impact of unauthorized modification</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      Availability
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Impact of disruption of access</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {informationTypes.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">
                      <Select defaultValue={item.confidentiality.toLowerCase()}>
                        <SelectTrigger className="w-24 mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Select defaultValue={item.integrity.toLowerCase()}>
                        <SelectTrigger className="w-24 mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Select defaultValue={item.availability.toLowerCase()}>
                        <SelectTrigger className="w-24 mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall System Categorization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">HIGH</div>
                <div className="text-sm text-muted-foreground">System Impact Level (Highest of C, I, A)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Save & Proceed to Select</Button>
        </div>
      </div>
    )
  }

  function SelectControls() {
    const controls = [
      { id: "AC-1", name: "Access Control Policy and Procedures", baseline: "Low", selected: true },
      { id: "AC-2", name: "Account Management", baseline: "Low", selected: true },
      { id: "AC-3", name: "Access Enforcement", baseline: "Low", selected: true },
      { id: "AC-7", name: "Unsuccessful Logon Attempts", baseline: "Low", selected: true },
      { id: "AU-1", name: "Audit and Accountability Policy", baseline: "Low", selected: true },
      { id: "AU-2", name: "Audit Events", baseline: "Low", selected: true },
      { id: "CA-1", name: "Security Assessment and Authorization Policy", baseline: "Low", selected: true },
      { id: "CM-1", name: "Configuration Management Policy", baseline: "Low", selected: true },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Select Security Controls</h2>
          <p className="text-muted-foreground">
            Choose and tailor NIST 800-53 controls based on your system categorization
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Control Selection</CardTitle>
              <CardDescription>
                Based on your HIGH impact categorization, the following controls are recommended
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="Search controls..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Families</SelectItem>
                      <SelectItem value="ac">Access Control (AC)</SelectItem>
                      <SelectItem value="au">Audit & Accountability (AU)</SelectItem>
                      <SelectItem value="ca">Assessment & Authorization (CA)</SelectItem>
                      <SelectItem value="cm">Configuration Management (CM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Control ID</TableHead>
                      <TableHead>Control Name</TableHead>
                      <TableHead>Baseline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {controls.map((control) => (
                      <TableRow key={control.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            defaultChecked={control.selected}
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell className="font-mono text-sm">{control.id}</TableCell>
                        <TableCell>{control.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{control.baseline}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Tailor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selection Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-sm text-muted-foreground">Selected Controls</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">Tailored Controls</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Added Controls</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Previous Step</Button>
          <Button>Save & Proceed to Assess</Button>
        </div>
      </div>
    )
  }

  function RiskCalculationTab({ assessmentType }: { assessmentType: string }) {
    return (
      <div>
        <h2>Risk Calculation</h2>
        <p>Assessment Type: {assessmentType}</p>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <AssessmentSetup
            assessmentType={assessmentType}
            setAssessmentType={setAssessmentType}
            assessmentApproach={assessmentApproach}
            setAssessmentApproach={setAssessmentApproach}
          />
        )
      case 1:
        return <CategorizeSystem />
      case 2:
        return <SelectControls />
      case 3:
        return <ImplementControls />
      case 4:
        return <AssessControls assessmentType={assessmentType} activeTab={activeTab} setActiveTab={setActiveTab} />
      case 5:
        return <AuthorizeSystem />
      case 6:
        return <MonitorSystem />
      default:
        return <div className="text-center py-12 text-muted-foreground">Step content coming soon...</div>
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">FortressOS Risk Assessment</h1>
                <p className="text-sm text-muted-foreground">NIST RMF Guided Workflow</p>
              </div>
              <Badge variant="outline" className="text-sm">
                Assessment ID: RA-2024-001
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar Stepper */}
            <div className="col-span-3">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">NIST RMF Process</CardTitle>
                  <CardDescription>Follow each step to complete your assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rmfSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`
                          flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors
                          ${step.status === "completed"
                              ? "bg-green-500 border-green-500 text-white"
                              : step.status === "current"
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "bg-background border-muted-foreground/30 text-muted-foreground"
                            }
                        `}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-medium">{step.id + 1}</span>
                          )}
                        </div>
                        {index < rmfSteps.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => step.status !== "pending" && setCurrentStep(step.id)}
                          className={`
                            text-left w-full group transition-colors
                            ${step.status === "current"
                              ? "text-foreground"
                              : step.status === "completed"
                                ? "text-foreground hover:text-blue-600"
                                : "text-muted-foreground"
                            }
                          `}
                          disabled={step.status === "pending"}
                        >
                          <div className="font-medium text-sm">{step.name}</div>
                          <div className="text-xs text-muted-foreground">{step.description}</div>
                        </button>
                      </div>
                    </div>
                  ))}

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">3/7 Steps</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="col-span-9">{renderStepContent()}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
