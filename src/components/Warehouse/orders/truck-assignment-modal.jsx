"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for available trucks
const availableTrucks = [
  { id: "TRUCK-001", capacity: "5 tons", location: "Warehouse A" },
  { id: "TRUCK-002", capacity: "3 tons", location: "Warehouse B" },
  { id: "TRUCK-003", capacity: "7 tons", location: "Warehouse C" },
];

export function TruckAssignmentModal({ order, onAssign, onClose }) {
  const [selectedTruck, setSelectedTruck] = useState("");

  console.log(order);

  const handleAssign = () => {
    if (selectedTruck) {
      onAssign(order, selectedTruck);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Truck to Order {order}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedTruck} onValueChange={setSelectedTruck}>
            <SelectTrigger>
              <SelectValue placeholder="Select a truck" />
            </SelectTrigger>
            <SelectContent>
              {availableTrucks.map((truck) => (
                <SelectItem key={truck.id} value={truck.id}>
                  {truck.id} - Capacity: {truck.capacity}, Location:{" "}
                  {truck.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedTruck}>
            Assign Truck
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
