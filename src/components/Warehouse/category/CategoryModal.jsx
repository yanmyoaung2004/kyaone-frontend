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

export default function CategoryModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
      });
    } else {
      setFormData({
        name: "",
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

    try {
      let res;
      if (product) {
        res = await axios.post(`api/categories/update/${product.id}`, data);
        console.log(res.data);
        if (res.status === 201) {
          handleSuccessToast("Category updated successfully!");
          onSave({
            id: res.data.id,
            name: res.data.name,
          });
          onClose();
        }
      } else {
        res = await axios.post("/api/categories", data);
        console.log(res.data);
        if (res.status === 201) {
          handleSuccessToast("Category created successfully!");
          onSave({
            id: res.data.id,
            name: res.data.name,
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
            {product ? "Edit Category" : "Add New Category"}
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
                  placeholder="Enter Category Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="py-6">
              {product ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
