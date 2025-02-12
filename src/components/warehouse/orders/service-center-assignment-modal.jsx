"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for available service centers
const availableServiceCenters = [
  { id: "SC-001", name: "Service Center A", location: "City A" },
  { id: "SC-002", name: "Service Center B", location: "City B" },
  { id: "SC-003", name: "Service Center C", location: "City C" },
]

export function ServiceCenterAssignmentModal({ order, onAssign, onClose }) {
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("")

  const handleAssign = () => {
    if (selectedServiceCenter) {
      onAssign(order.id, selectedServiceCenter)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Service Center to Order {order.id}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedServiceCenter} onValueChange={setSelectedServiceCenter}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service center" />
            </SelectTrigger>
            <SelectContent>
              {availableServiceCenters.map((center) => (
                <SelectItem key={center.id} value={center.name}>
                  {center.name} - {center.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedServiceCenter}>
            Assign Service Center
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

