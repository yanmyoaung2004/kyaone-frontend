"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
  handleWarningToast,
} from "../../../helpers/ToastService";

export default function WarehouseTransfer() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [fromWarehouse, setFromWarehouse] = useState(null);
  const [toWarehouse, setToWarehouse] = useState(null);
  const [availableProduct, setAvailableProduct] = useState([]);

  const addProduct = () => {
    if (selectedProduct && quantity) {
      const productToAdd = availableProduct.find(
        (p) => p.id === selectedProduct
      );
      if (productToAdd) {
        const newProduct = {
          id: productToAdd.id,
          name: productToAdd.name,
          quantity: Number.parseInt(quantity),
        };
        setProducts([...products, newProduct]);
        setSelectedProduct(null);
        setQuantity("");
      }
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSubmit = async () => {
    if (
      fromWarehouse === null ||
      toWarehouse === null ||
      products.length === 0
    ) {
      handleWarningToast("Please fill all the required fields!");
      return;
    }
    try {
      const res = await axios.post(
        "api/warehouses/product/transferWarehouse/transfer",
        {
          products,
          fromWarehouse,
          toWarehouse,
        }
      );
      if (res.status === 200) {
        handleSuccessToast(res.data.message);
        setProducts([]);
        setAvailableProduct([]);
        setFromWarehouse(null);
        setToWarehouse(null);
      }
    } catch (error) {
      handleFailureToast("Error Occured");
      console.log(error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("/api/warehouses");
      setWarehouses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarehouseAvailability = async () => {
    try {
      const res = await axios.get(
        `/api/warehouses/product/getWarehouseProduct/${fromWarehouse}`
      );
      setAvailableProduct(
        res.data.map((d) => ({
          id: d.product_id,
          name: d.product.name,
          quantity: d.quantity,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouseAvailability();
  }, [fromWarehouse]);

  useEffect(() => {
    fetchWarehouses();
    // fetchWarehouseAvailability();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Warehouse Transfer</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Warehouses Selection</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5">
          <Select
            value={fromWarehouse?.toString() || ""}
            onValueChange={(value) => setFromWarehouse(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Warehouse From" />
            </SelectTrigger>
            <SelectContent>
              {warehouses.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={toWarehouse?.toString() || ""}
            onValueChange={(value) => setToWarehouse(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Warehouse To" />
            </SelectTrigger>
            <SelectContent>
              {warehouses.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={selectedProduct?.toString() || ""}
              onValueChange={(value) =>
                setSelectedProduct(value ? Number.parseInt(value) : null)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {availableProduct.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              max={
                availableProduct.find((p) => p.id === selectedProduct)
                  ?.quantity || 0
              }
              onChange={(e) => {
                const value = Number(e.target.value);
                const maxQuantity =
                  availableProduct.find((p) => p.id === selectedProduct)
                    ?.quantity || 0;
                if (value <= maxQuantity) {
                  setQuantity(e.target.value);
                } else {
                  handleWarningToast("Maximum quantity is " + maxQuantity);
                }
              }}
            />

            <Button onClick={addProduct}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>

                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSubmit}
            disabled={products.length === 0 || !toWarehouse || !fromWarehouse}
          >
            Submit Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
