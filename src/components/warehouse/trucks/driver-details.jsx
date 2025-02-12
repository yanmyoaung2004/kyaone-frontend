"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DriverDetails({ driver, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(driver.status)

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    onStatusUpdate(driver.id, newStatus)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Driver Details: {driver.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status" className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="On Delivery">On Delivery</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Assigned Truck</Label>
            <div className="col-span-3">{driver.assignedTruck || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Phone</Label>
            <div className="col-span-3">{driver.phone}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Last Delivery</Label>
            <div className="col-span-3">{driver.lastDelivery}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose}>Close</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>View History</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Driver History: {driver.name}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {/* Add driver history content here */}
                <p>Driver delivery history and performance stats will be displayed here.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}

