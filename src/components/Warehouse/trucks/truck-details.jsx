"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import toast from "react-hot-toast"
import { handleSuccessToast } from "../../../helpers/ToastService"

export function TruckDetails({ truck, onClose }) {
  const [status, setStatus] = useState(truck.status)

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    axios.put(`/api/trucks/${truck.id}`, {
      status: newStatus
  })
  .then(response =>{
    if(response.status === 200){
    setStatus(newStatus)
    handleSuccessToast("Success");
    console.log("Success");
    
  } })
  .catch(error => console.error(error.response.data));  
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
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Driver</Label>
            <div className="col-span-3">{truck.driver || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Current Orders</Label>
            <div className="col-span-3">                {truck.assigned_orders.length > 0
  ? truck.assigned_orders.map(order => `ORD-${order.order_id}`).join(", ")
  : "None"}</div>
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

