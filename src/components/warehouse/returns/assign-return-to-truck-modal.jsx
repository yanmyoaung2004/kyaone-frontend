"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for available trucks
const availableTrucks = [
  { id: "TRUCK-001", capacity: "5 tons", location: "Warehouse A" },
  { id: "TRUCK-002", capacity: "3 tons", location: "Warehouse B" },
  { id: "TRUCK-003", capacity: "7 tons", location: "Warehouse C" },
]

export function AssignReturnToTruckModal({ returns, onAssign }) {
  const [assignments, setAssignments] = useState({})

  const handleAssign = (returnId, truckId) => {
    setAssignments({ ...assignments, [returnId]: truckId })
  }

  const handleSubmit = () => {
    Object.entries(assignments).forEach(([returnId, truckId]) => {
      onAssign(returnId, truckId)
    })
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Return ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Assign Truck</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns
            .filter((r) => r.status === "Pending" && !r.assignedTruck)
            .map((returnItem) => (
              <TableRow key={returnItem.id}>
                <TableCell>{returnItem.id}</TableCell>
                <TableCell>{returnItem.productName}</TableCell>
                <TableCell>{returnItem.customerName}</TableCell>
                <TableCell>
                  <Select
                    value={assignments[returnItem.id] || ""}
                    onValueChange={(value) => handleAssign(returnItem.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a truck" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTrucks.map((truck) => (
                        <SelectItem key={truck.id} value={truck.id}>
                          {truck.id} - {truck.capacity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Assign Trucks</Button>
      </div>
    </div>
  )
}

