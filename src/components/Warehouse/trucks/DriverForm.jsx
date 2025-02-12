import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DriverCreateDialog = ({ open, onClose, onSave }) => {
  const [driver, setDriver] = useState({
    user_id: "",
    driver_license: "",
    nrc_number: "",
    phone: "",
    status: "free",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(driver);
    onSave(driver);
    // onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <Label>User ID</Label>
        <Input
          autoFocus
          name="user_id"
          label="User ID"
          type="text"
          fullWidth
          placeholder="User ID"
          onChange={handleChange}
        />
        <Label>License Number</Label>
        <Input
          name="driver_license"
          label="License Number"
          type="text"
          fullWidth
          //   value={driver.licenseNumber}
          placeholder="Driver License Number"
          onChange={handleChange}
        />
        <Label>NRC Number</Label>
        <Input
          name="nrc_number"
          label="NRC Number"
          type="text"
          fullWidth
          //   value={driver.licenseNumber}
          placeholder="NRC Number"
          onChange={handleChange}
        />
        <Label>Phone Number</Label>
        <Input
          name="phone"
          label="Phone Number"
          type="text"
          fullWidth
          placeholder="09xxxxxxxxx"
          //   value={driver.phoneNumber}
          onChange={handleChange}
        />

        <div className="flex space-x-4">
          <Button onClick={onClose} variant="outline" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DriverCreateDialog;
