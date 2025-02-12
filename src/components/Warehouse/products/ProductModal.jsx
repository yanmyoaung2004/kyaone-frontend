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
import Upload from "./Upload";
import axios from "axios";
// import Upload from "./Upload";

export default function ProductModal({ isOpen, onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: 0,
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: "",
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        image: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const updateProduct = async () => {
    try {
      const res = await axios.put("/api/products", formData);
      console.log(res);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-3xl mb-4">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-lg font-semibold">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-lg font-semibold">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Product Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.image ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Product"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    No image uploaded
                  </div>
                )}
              </div>
              <Upload onImageUpload={handleImageUpload} />
            </div>
          </div>
          <Button type="submit" className="w-full text-lg py-6">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
