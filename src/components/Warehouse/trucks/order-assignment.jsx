"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package } from "lucide-react"

// Mock data for demonstration
const mockOrders = [
  { id: "ORD-001", customer: "Acme Corp", status: "Pending", assignedTruck: null },
  { id: "ORD-002", customer: "GlobalTech", status: "Assigned", assignedTruck: "TRK-002" },
  { id: "ORD-003", customer: "MegaSoft", status: "Pending", assignedTruck: null },
  // Add more mock orders as needed
]

const mockTrucks = [
  { id: "T001", number: "TRK-001", status: "Free" },
  { id: "T002", number: "TRK-002", status: "Busy" },
  { id: "T003", number: "TRK-003", status: "Free" },
  // Add more mock trucks as needed
]

export function OrderAssignment() {
  const [orders, setOrders] = useState(mockOrders)

  const handleAssignTruck = (orderId, truckId) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, assignedTruck: truckId, status: "Assigned" } : order)),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-4 w-4" />
          Order Assignment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Truck</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.assignedTruck || "Not Assigned"}</TableCell>
                <TableCell>
                  <Select
                    value={order.assignedTruck || ""}
                    onValueChange={(value) => handleAssignTruck(order.id, value)}
                    disabled={order.status === "Assigned"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Assign Truck" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTrucks
                        .filter((truck) => truck.status === "Free")
                        .map((truck) => (
                          <SelectItem key={truck.id} value={truck.number}>
                            {truck.number}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

