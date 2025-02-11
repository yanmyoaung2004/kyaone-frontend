"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "lucide-react"
import { DriverDetails } from "./driver-details"
import { Notifications } from "./notifications"

// Mock data for demonstration
const mockDrivers = [
  {
    id: "D001",
    name: "John Doe",
    assignedTruck: "TRK-001",
    status: "Available",
    phone: "123-456-7890",
    lastDelivery: "2023-06-10",
  },
  {
    id: "D002",
    name: "Jane Smith",
    assignedTruck: "TRK-002",
    status: "On Delivery",
    phone: "234-567-8901",
    lastDelivery: "2023-06-12",
  },
  {
    id: "D003",
    name: "Bob Johnson",
    assignedTruck: null,
    status: "Inactive",
    phone: "345-678-9012",
    lastDelivery: "2023-06-08",
  },
  // Add more mock drivers as needed
]

export function DriverManagement() {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedDriver, setSelectedDriver] = useState(null)

  const filteredDrivers = drivers.filter(
    (driver) =>
      (driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (driver.assignedTruck && driver.assignedTruck.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (statusFilter === "All" || driver.status === statusFilter),
  )

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver)
  }

  const handleStatusUpdate = (driverId, newStatus) => {
    setDrivers(drivers.map((driver) => (driver.id === driverId ? { ...driver, status: newStatus } : driver)))
    if (selectedDriver && selectedDriver.id === driverId) {
      setSelectedDriver({ ...selectedDriver, status: newStatus })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <User className="mr-2 h-6 w-6" />
            Driver Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Driver Name or Truck Number"
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
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="On Delivery">On Delivery</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Assigned Truck</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleDriverClick(driver)}
                  >
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.assignedTruck || "N/A"}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          driver.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : driver.status === "On Delivery"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {driver.status === "Available" ? "🟢" : driver.status === "On Delivery" ? "🟡" : "🔴"}{" "}
                        {driver.status}
                      </span>
                    </TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.lastDelivery}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedDriver && (
        <DriverDetails
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      <Notifications />
    </div>
  )
}

