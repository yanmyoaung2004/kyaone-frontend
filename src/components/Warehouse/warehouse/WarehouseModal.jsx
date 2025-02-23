"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import axios from "axios";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../../../helpers/ToastService";

export default function CityModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        address: product.address || "",
        phone: product.phone || "",
      });
    } else {
      setFormData({
        name: "",
        address: "",
        phone: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("phone", formData.phone);

    try {
      let res;
      if (product) {
        res = await axios.post(`api/warehouses/update/${product.id}`, data);
        if (res.status === 200) {
          handleSuccessToast("Warehouse updated successfully!");
          onSave({
            id: res.data.warehouse.id,
            name: res.data.warehouse.name,
            address: res.data.warehouse.address,
            phone: res.data.warehouse.phone,
          });
          onClose();
        }
      } else {
        res = await axios.post("/api/warehouses", data);
        if (res.status === 201) {
          handleSuccessToast("Warehouse created successfully!");
          onSave({
            id: res.data.warehouse.id,
            name: res.data.warehouse.name,
            address: res.data.warehouse.address,
            phone: res.data.warehouse.phone,
          });
          onClose();
        }
      }
    } catch (error) {
      handleFailureToast("Error occur!");
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl mb-4">
            {product ? "Edit Warehouse" : "Add New Warehouse"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter City Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="py-6">
              {product ? "Update Warehouse" : "Add Warehouse"}
            </Button>
          </div>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
