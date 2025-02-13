"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IssuesComplaints() {
  const [complaintStatus, setComplaintStatus] = useState("Pending")

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Issues & Complaints</h3>
      <div className="flex space-x-4">
        <Button variant="outline">Report Wrong Item</Button>
        <Button variant="outline">Report Damaged Product</Button>
        <Button variant="outline">Request Order Return</Button>
      </div>
      <div className="flex items-center space-x-4">
        <span>Complaint Status:</span>
        <Select value={complaintStatus} onValueChange={setComplaintStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary">Reassign Order</Button>
        <Button variant="secondary">Mark as Resolved</Button>
      </div>
    </div>
  )
}

