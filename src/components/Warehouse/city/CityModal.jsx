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
    eta: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        eta: product.eta || 0,
      });
    } else {
      setFormData({
        name: "",
        eta: "",
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
    data.append("eta", formData.eta);

    try {
      let res;
      if (product) {
        res = await axios.post(`api/cities/update/${product.id}`, data);
        if (res.status === 201) {
          handleSuccessToast("City updated successfully!");
          console.log(res.data);
          onSave({
            id: res.data.city.id,
            name: res.data.city.name,
            eta: res.data.city.eta,
          });
          onClose();
        }
      } else {
        res = await axios.post("/api/cities", data);
        if (res.status === 201) {
          handleSuccessToast("City created successfully!");
          console.log(res.data);
          onSave({
            id: res.data.city.id,
            name: res.data.city.name,
            eta: res.data.city.eta,
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
            {product ? "Edit City" : "Add New City"}
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
                <Label htmlFor="description">ETA</Label>
                <Input
                  id="eta"
                  name="eta"
                  placeholder="Enter ETA"
                  value={formData.eta}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="py-6">
              {product ? "Update City" : "Add City"}
            </Button>
          </div>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
