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

export default function ServiceCenterDetail({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        phone: product.phone || "",
        location: product.location || "",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        location: "",
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
    data.append("phone", formData.phone);
    data.append("location", formData.location);

    try {
      let res;

      if (product) {
        res = await axios.put(`api/service-centers/${product.id}`, data);
        if (res.status === 201) {
          handleSuccessToast("Service center updated successfully!");
          console.log(res.data);
          // onSave({
          //   id: res.data.city.id,
          //   name: res.data.city.name,
          //   eta: res.data.city.eta,
          // });
          onClose();
        }
      } else {
        res = await axios.post("/api/service-centers", data);
        if (res.status === 201) {
          handleSuccessToast("Sercice Center created successfully!");
          console.log(res.data);
          onSave({
            id: res.data.data.id,
            name: res.data.data.name,
            phone: res.data.data.phone,
            location: res.data.data.locatoin,
          });
          onClose();
        }
      }
    } catch (error) {
      handleFailureToast("Error occur!");
      console.error("Error creating service center:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl mb-4">
            {product ? "Edit Service Center" : "Add New Service Center"}
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
                  placeholder="Enter Service Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="py-6">
              {product ? "Update Service Center" : "Add Service Center"}
            </Button>
          </div>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
