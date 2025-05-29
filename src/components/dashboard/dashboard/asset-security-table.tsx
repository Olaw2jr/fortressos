"use client"

import { AlertTriangle, CheckCircle2, Server, ShieldAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const assets = [
  {
    id: "AS-001",
    name: "Primary Database Server",
    type: "Server",
    risk: "High",
    vulnerabilities: 8,
    compliance: 62,
    lastScan: "2 days ago",
  },
  {
    id: "AS-002",
    name: "Web Application Server",
    type: "Server",
    risk: "Medium",
    vulnerabilities: 4,
    compliance: 85,
    lastScan: "1 day ago",
  },
  {
    id: "AS-003",
    name: "Authentication Service",
    type: "Application",
    risk: "Low",
    vulnerabilities: 1,
    compliance: 95,
    lastScan: "Today",
  },
  {
    id: "AS-004",
    name: "Customer Data Storage",
    type: "Storage",
    risk: "Critical",
    vulnerabilities: 12,
    compliance: 45,
    lastScan: "3 days ago",
  },
  {
    id: "AS-005",
    name: "Network Firewall",
    type: "Network",
    risk: "Low",
    vulnerabilities: 0,
    compliance: 100,
    lastScan: "Today",
  },
]

export default function AssetSecurityTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead className="hidden md:table-cell">Vulnerabilities</TableHead>
          <TableHead className="hidden md:table-cell">Compliance</TableHead>
          <TableHead className="hidden md:table-cell">Last Scan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>{asset.type}</TableCell>
            <TableCell>
              <RiskBadge risk={asset.risk} />
            </TableCell>
            <TableCell className="hidden md:table-cell">{asset.vulnerabilities}</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <Progress value={asset.compliance} className="h-2 w-20" />
                <span className="text-xs">{asset.compliance}%</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{asset.lastScan}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RiskBadge({ risk }: { risk: string }) {
  switch (risk) {
    case "Critical":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
          <ShieldAlert className="mr-1 h-3 w-3" />
          Critical
        </Badge>
      )
    case "High":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 hover:text-orange-700">
          <AlertTriangle className="mr-1 h-3 w-3" />
          High
        </Badge>
      )
    case "Medium":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700">
          <Server className="mr-1 h-3 w-3" />
          Medium
        </Badge>
      )
    case "Low":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Low
        </Badge>
      )
    default:
      return <Badge variant="outline">{risk}</Badge>
  }
}
