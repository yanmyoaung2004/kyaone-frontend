"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const escalationData = {
  id: 1,
  customer: "Alice Johnson",
  issue: "Late Delivery",
  priority: "High",
  status: "Open",
  orderNumber: "#12345",
  description:
    "Customer reports that their order #12345 was supposed to be delivered yesterday but hasn't arrived yet.",
  timeline: [
    { date: "2023-06-01 10:00 AM", action: "Escalation created", user: "System" },
    { date: "2023-06-01 10:15 AM", action: "Assigned to shipping department", user: "John Doe" },
    { date: "2023-06-01 11:30 AM", action: "Contacted courier for status update", user: "Jane Smith" },
  ],
}

export default function EscalationDetails() {
  const [status, setStatus] = useState(escalationData.status)
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real application, you would send this to your backend
      console.log("Adding note:", newNote)
      setNewNote("")
    }
  }

  const handleStatusChange = (newStatus) => {
    // In a real application, you would update this in your backend
    setStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Customer</Label>
          <p className="text-lg font-medium">{escalationData.customer}</p>
        </div>
        <div>
          <Label>Order Number</Label>
          <p className="text-lg">{escalationData.orderNumber}</p>
        </div>
        <div>
          <Label>Issue</Label>
          <p className="text-lg">{escalationData.issue}</p>
        </div>
        <div>
          <Label>Priority</Label>
          <p className="text-lg">{escalationData.priority}</p>
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <p className="text-lg">{escalationData.description}</p>
      </div>
      <div>
        <Label>Status</Label>
        <Select onValueChange={handleStatusChange} defaultValue={status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Timeline</Label>
        <ul className="space-y-2">
          {escalationData.timeline.map((event, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{event.date}</span> - {event.action} by {event.user}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label>Add Note</Label>
        <Textarea
          placeholder="Type your note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
    </div>
  )
}

