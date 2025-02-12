"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock complaints data for demonstration
const mockComplaints = [
  { id: "C001", orderId: "O123", description: "Wrong product received" },
  { id: "C002", orderId: "O456", description: "Item arrived damaged" },
  { id: "C003", orderId: "O789", description: "Late delivery" },
]

export function CreateReturnForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    orderId: "",
    productName: "",
    customerName: "",
    reason: "",
    complaintId: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, status: "Pending" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="orderId">Order ID</Label>
        <Input id="orderId" name="orderId" value={formData.orderId} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="customerName">Customer Name</Label>
        <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="reason">Reason for Return</Label>
        <Textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="complaintId">Related Complaint (Optional)</Label>
        <Select
          name="complaintId"
          onValueChange={(value) => setFormData((prevData) => ({ ...prevData, complaintId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a related complaint" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No related complaint</SelectItem>
            {mockComplaints.map((complaint) => (
              <SelectItem key={complaint.id} value={complaint.id}>
                {complaint.id} - Order {complaint.orderId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create Return</Button>
    </form>
  )
}

