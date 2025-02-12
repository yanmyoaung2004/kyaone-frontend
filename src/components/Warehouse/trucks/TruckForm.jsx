"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";

export default function TruckForm({ onSubmit, onCancel, isEditTruck,formData }) {
  const [licensePlate, setLicensePlate] = useState(formData.license_plate ?? "");
  const [allowance, setAllowance] = useState(formData.status ?? "free");
  console.log("form data",formData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: formData.id,licensePlate, allowance });
    setAllowance("free");
    setLicensePlate("");
  };
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditTruck ? "Edit Truck" : "Add New Truck"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Allowance</Label>
            <RadioGroup value={allowance} onValueChange={setAllowance}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free">Free</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="busy" id="busy" />
                <Label htmlFor="busy">Busy</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{isEditTruck ? "Update" : "Add"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
