"use client"

import { useState } from "react"
import { ComplaintList } from "../../../components/warehouse/complaints/complaint-list";
import { ComplaintDetails } from "../../../components/warehouse/complaints/complaint-details"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockComplaints = [
  { id: "C001", orderId: "O123", customerName: "John Doe", issueType: "Wrong Product", status: "Open" },
  { id: "C002", orderId: "O456", customerName: "Jane Smith", issueType: "Damaged Item", status: "In Progress" },
  { id: "C003", orderId: "O789", customerName: "Bob Johnson", issueType: "Late Delivery", status: "Resolved" },
]

export default function Complaints() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const { toast } = useToast()

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.id.includes(searchTerm) ||
        complaint.orderId.includes(searchTerm)) &&
      (statusFilter === "All" || complaint.status === statusFilter),
  )

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint)
  }

  const handleStatusUpdate = (complaintId, newStatus) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint)),
    )
    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus })
    }
    toast({
      title: "Complaint Status Updated",
      description: `Complaint ${complaintId} status changed to ${newStatus}`,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <AlertCircle className="mr-2 h-6 w-6" />
            Complaints Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Complaint ID, Order ID or Customer Name"
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
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <ComplaintList complaints={filteredComplaints} onComplaintClick={handleComplaintClick} />
            {selectedComplaint && (
              <ComplaintDetails complaint={selectedComplaint} onStatusUpdate={handleStatusUpdate} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

