"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TruckDetails({ truck, onClose }) {
  const [status, setStatus] = useState(truck.status)

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    // Here you would typically update the truck status in your backend
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Truck Details: {truck.number}</DialogTitle>
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
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Busy">Busy</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Driver</Label>
            <div className="col-span-3">{truck.driver || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Current Orders</Label>
            <div className="col-span-3">{truck.currentOrders.length > 0 ? truck.currentOrders.join(", ") : "None"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Last Used</Label>
            <div className="col-span-3">{truck.lastUsed}</div>
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
                <DialogTitle>Truck History: {truck.number}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {/* Add truck history content here */}
                <p>Truck history and logs will be displayed here.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}

