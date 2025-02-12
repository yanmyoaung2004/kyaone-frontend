"use client"

import { useState } from "react"
import { ReturnList } from "../../../components/warehouse/returns/return-list"
import { ReturnDetails } from "../../../components/warehouse/returns/return-details"
import { CreateReturnForm } from "../../../components/warehouse/returns/create-return-form"
import { AssignReturnToTruckModal } from "../../../components/warehouse/returns/assign-return-to-truck-modal"
import { OrderDetailsModal } from "../../../components/warehouse/orders/order-details-modal"
import { ComplaintDetailsModal } from "../../../components/warehouse/complaints/complaint-details-modal"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { RotateCcw, Plus, Truck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { useToast } from "../../../components/warehouse/ui/use-toast"

// Mock data for demonstration
const mockReturns = [
  {
    id: "R001",
    orderId: "O123",
    productName: "Widget A",
    customerName: "John Doe",
    status: "Pending",
    reason: "Wrong Product",
    complaintId: "C001",
    assignedTruck: null,
  },
  {
    id: "R002",
    orderId: "O456",
    productName: "Gadget B",
    customerName: "Jane Smith",
    status: "InProgress",
    reason: "Damaged Item",
    complaintId: "C002",
    assignedTruck: null,
  },
  {
    id: "R003",
    orderId: "O789",
    productName: "Doohickey C",
    customerName: "Bob Johnson",
    status: "Delivered",
    reason: "Changed Mind",
    complaintId: null,
    assignedTruck: null,
  },
]

export default function Returns() {
  const [returns, setReturns] = useState(mockReturns)
  const [selectedReturn, setSelectedReturn] = useState(null)
  const [selectedReturns, setSelectedReturns] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [isAssignTruckOpen, setIsAssignTruckOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [selectedComplaintId, setSelectedComplaintId] = useState(null)

  const { toast } = useToast()

  const filteredReturns = returns.filter(
    (returnItem) =>
      (returnItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.id.includes(searchTerm) ||
        returnItem.orderId.includes(searchTerm)) &&
      (statusFilter === "All" || returnItem.status === statusFilter),
  )

  const handleReturnClick = (returnItem) => {
    setSelectedReturn(returnItem)
  }

  const handleStatusUpdate = (returnId, newStatus) => {
    setReturns(
      returns.map((returnItem) => (returnItem.id === returnId ? { ...returnItem, status: newStatus } : returnItem)),
    )
    if (selectedReturn && selectedReturn.id === returnId) {
      setSelectedReturn({ ...selectedReturn, status: newStatus })
    }
    toast({
      title: "Return Status Updated",
      description: `Return ${returnId} status changed to ${newStatus}`,
    })
  }

  const handleCreateReturn = (newReturn) => {
    setReturns([...returns, { ...newReturn, id: `R${returns.length + 1}`.padStart(4, "0"), assignedTruck: null }])
    setIsCreateFormOpen(false)
    toast({
      title: "New Return Created",
      description: `Return ${newReturn.id} has been created`,
    })
  }

  const handleAssignTruck = (returnIds, truckId) => {
    setReturns(
      returns.map((returnItem) =>
        returnIds.includes(returnItem.id) ? { ...returnItem, assignedTruck: truckId } : returnItem,
      ),
    )
    setSelectedReturns([])
    setIsAssignTruckOpen(false)
    toast({
      title: "Returns Assigned to Truck",
      description: `Selected returns have been assigned to truck ${truckId}`,
    })
  }

  const handleSelectReturn = (returnId) => {
    setSelectedReturns((prev) => (prev.includes(returnId) ? prev.filter((id) => id !== returnId) : [...prev, returnId]))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <RotateCcw className="mr-2 h-6 w-6" />
            Returns Management
          </CardTitle>
          <div className="flex space-x-2">
            <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Return
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Return</DialogTitle>
                </DialogHeader>
                <CreateReturnForm onSubmit={handleCreateReturn} />
              </DialogContent>
            </Dialog>
            {selectedReturns.length > 0 && (
              <Dialog open={isAssignTruckOpen} onOpenChange={setIsAssignTruckOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Truck className="mr-2 h-4 w-4" />
                    Assign Returns to Trucks
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Returns to Trucks</DialogTitle>
                  </DialogHeader>
                  <AssignReturnToTruckModal
                    returns={returns.filter((r) => selectedReturns.includes(r.id))}
                    onAssign={(truckId) => handleAssignTruck(selectedReturns, truckId)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Return ID, Order ID or Customer Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={statusFilter} onValueChange={(value) => {
              console.log("Selected Value:", value);
              setStatusFilter(value);
            }}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <ReturnList
              returns={filteredReturns}
              onReturnClick={handleReturnClick}
              onOrderClick={setSelectedOrderId}
              onComplaintClick={setSelectedComplaintId}
              selectedReturns={selectedReturns}
              onSelectReturn={handleSelectReturn}
            />
            {selectedReturn && (
              <ReturnDetails
                returnItem={selectedReturn}
                onStatusUpdate={handleStatusUpdate}
                onAssignTruck={(returnId) => {
                  setSelectedReturns([returnId])
                  setIsAssignTruckOpen(true)
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
      {selectedOrderId && <OrderDetailsModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />}
      {selectedComplaintId && (
        <ComplaintDetailsModal complaintId={selectedComplaintId} onClose={() => setSelectedComplaintId(null)} />
      )}
    </div>
  )
}

