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
import { DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../../../helpers/ToastService";

export function TruckAssignmentModal({
  selectedOrders,
  onAssign,
  onClose,
  drivers,
  trucks,
}) {
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");

  const handleAssign = async () => {
    try {
      if (selectedDriver === "" && selectedTruck === "") {
        return;
      }
      const res = await axios.post("/api/orderAssignTrucks", {
        orders: selectedOrders,
        driver_id: selectedDriver,
        truck_id: selectedTruck,
      });
      if (res.status === 201) {
        handleSuccessToast("Successfully assigned!");
        onAssign();
      }
    } catch (error) {
      handleFailureToast("Error occur!");
      console.log(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Assign Truck to Order{" "}
            {selectedOrders.map((o) => {
              return o + ", ";
            })}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="py-10">
          <div className="flex gap-10 flex-col">
            <Select value={selectedTruck} onValueChange={setSelectedTruck}>
              <SelectTrigger>
                <SelectValue placeholder="Select a truck" />
              </SelectTrigger>
              <SelectContent>
                {trucks.map((truck) => (
                  <SelectItem key={truck.id} value={truck.id}>
                    {truck.license_plate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger>
                <SelectValue placeholder="Select a driver" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
