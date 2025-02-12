"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck } from "lucide-react"

// Mock data for demonstration
const mockTrucks = [
  { id: "T001", number: "TRK-001", status: "Free", driver: "John Doe", currentOrders: [], lastUsed: "2023-06-10" },
  {
    id: "T002",
    number: "TRK-002",
    status: "Busy",
    driver: "Jane Smith",
    currentOrders: ["ORD-123", "ORD-124"],
    lastUsed: "2023-06-12",
  },
  { id: "T003", number: "TRK-003", status: "Maintenance", driver: null, currentOrders: [], lastUsed: "2023-06-08" },
  // Add more mock trucks as needed
]

export function TruckDashboard({ onTruckSelect }) {
  const [trucks] = useState(mockTrucks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredTrucks = trucks.filter(
    (truck) =>
      (truck.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (truck.driver && truck.driver.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (statusFilter === "All" || truck.status === statusFilter),
  )

  const totalTrucks = trucks.length
  const freeTrucks = trucks.filter((truck) => truck.status === "Free").length
  const busyTrucks = trucks.filter((truck) => truck.status === "Busy").length
  const maintenanceTrucks = trucks.filter((truck) => truck.status === "Maintenance").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Trucks</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{freeTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Busy Trucks</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{busyTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceTrucks}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by Truck Number or Driver"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Truck Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Current Orders</TableHead>
              <TableHead>Last Used Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrucks.map((truck) => (
              <TableRow
                key={truck.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onTruckSelect(truck)}
              >
                <TableCell className="font-medium">{truck.number}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      truck.status === "Free"
                        ? "bg-green-100 text-green-800"
                        : truck.status === "Busy"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {truck.status}
                  </span>
                </TableCell>
                <TableCell>{truck.driver || "N/A"}</TableCell>
                <TableCell>{truck.currentOrders.length > 0 ? truck.currentOrders.join(", ") : "None"}</TableCell>
                <TableCell>{truck.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

