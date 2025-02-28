"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../../../helpers/ToastService";
import { X } from "lucide-react";

export function RestockForm({ product, onRestock, setSelectedProduct }) {
  const [safetyStock, setSafetyStock] = useState(product.reorderLevel);

  useEffect(() => {
    setSafetyStock(product?.reorderLevel);
  }, [product]);

  const restock = async () => {
    try {
      const res = await axios.post(`/api/warehouse/stocks/update`, {
        quantity: 0,
        productId: product.id,
        safetyStock: safetyStock,
      });

      if (res.status === 200) {
        handleSuccessToast("Successfully updated!");
      }
    } catch (error) {
      console.log(error);
      handleFailureToast("Error occur!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    restock();
    onRestock(product.id, 0, Number(safetyStock));
    setQuantity(0);
  };

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center  justify-between">
            <span>Restock Product</span>
            <span
              className="hover:bg-gray-100 cursor-pointer rounded-lg p-1"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={20} />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-md">
            <p>
              <strong>Name :</strong> {product.name}
            </p>

            <p>
              <strong>Current Stock :</strong> {product.currentStock}
            </p>
          </div>

          <div>
            <label
              htmlFor="safetyStock"
              className="block text-sm font-medium text-gray-700"
            >
              Safety Stock
            </label>
            <Input
              type="number"
              id="safetyStock"
              value={safetyStock}
              onChange={(e) => setSafetyStock(e.target.value)}
              min="1"
              required
            />
          </div>
          <Button type="submit">Restock</Button>
        </form>
      </CardContent>
    </Card>
  );
}
