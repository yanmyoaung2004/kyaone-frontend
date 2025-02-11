"use client"

import { useState } from "react"
import { OrderList } from "../../../components/Warehouse/orders/order-list"
import { OrderDetails } from "../../../components/Warehouse/orders/order-details"
import { TruckAssignmentModal } from "../../../components/Warehouse/orders/truck-assignment-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

// Mock data for demonstration
const mockOrders = [
  {
    id: "001",
    customerName: "John Doe",
    status: "Pending",
    address: "123 Main St",
    assignedTruck: null,
    estimatedDelivery: null,
  },
  {
    id: "002",
    customerName: "Jane Smith",
    status: "Processing",
    address: "456 Elm St",
    assignedTruck: "TRUCK-001",
    estimatedDelivery: "2023-06-15",
  },
  {
    id: "003",
    customerName: "Bob Johnson",
    status: "Shipped",
    address: "789 Oak St",
    assignedTruck: "TRUCK-002",
    estimatedDelivery: "2023-06-14",
  },
]

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isAssigningTruck, setIsAssigningTruck] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredOrders = orders.filter(
    (order) =>
      (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.includes(searchTerm)) &&
      (statusFilter === "All" || order.status === statusFilter),
  )

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
  }

  const handleAssignTruck = (order) => {
    setSelectedOrder(order)
    setIsAssigningTruck(true)
  }

  const handleTruckAssigned = (orderId, truckId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, assignedTruck: truckId } : order)))
    setIsAssigningTruck(false)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2 h-6 w-6" />
            Orders Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Order ID or Customer Name"
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <OrderList orders={filteredOrders} onOrderClick={handleOrderClick} onAssignTruck={handleAssignTruck} />
            {selectedOrder && <OrderDetails order={selectedOrder} />}
          </div>
        </CardContent>
      </Card>

      {isAssigningTruck && (
        <TruckAssignmentModal
          order={selectedOrder}
          onAssign={handleTruckAssigned}
          onClose={() => setIsAssigningTruck(false)}
        />
      )}
    </div>
  )
}

