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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../../../helpers/ToastService";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    image: null,
  });

  console.log(product);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        category: product.category_id || "",
        description: product.description || "",
        price: product.price || 0,
        image: product.image || null,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        description: "",
        price: 0,
        image: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category_id", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      let res;
      if (product) {
        res = await axios.post(`api/products/${product.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          handleSuccessToast("Product updated successfully!");
          onSave({
            id: res.data.product.id,
            name: res.data.product.name,
            category: "testing",
            description: res.data.product.description,
            price: res.data.product.unitprice.price,
          });
        }
      } else {
        res = await axios.post("/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          handleSuccessToast("Product created successfully!");
          onSave({
            id: res.data.product.id,
            name: res.data.product.name,
            category: "testing",
            description: res.data.product.description,
            price: res.data.product.unitprice.price,
          });
        }
      }
      console.log(res);
    } catch (error) {
      handleFailureToast("Error occur!");
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl mb-4">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category.toString()}
                onValueChange={(value) =>
                  handleCategoryChange(Number.parseInt(value, 10))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value.toString()}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="image">Product Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.image ? (
                  <label htmlFor="image" className="cursor-pointer">
                    <img
                      src={
                        formData.image instanceof File
                          ? URL.createObjectURL(formData.image)
                          : formData.image
                      }
                      alt="Product Preview"
                      className="rounded-lg object-contain w-full h-48"
                    />
                  </label>
                ) : (
                  <label
                    htmlFor="image"
                    className="text-center text-gray-500 cursor-pointer"
                  >
                    No image uploaded
                  </label>
                )}
              </div>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden w-full text-sm"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="py-6">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
