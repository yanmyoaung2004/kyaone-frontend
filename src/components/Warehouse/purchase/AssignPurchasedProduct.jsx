"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Search, Plus, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data - assume we have over 50 warehouses
const products = [
  { id: 1, name: "Product A", quantity: 100, price: 25 },
  { id: 2, name: "Product B", quantity: 50, price: 30 },
  { id: 3, name: "Product C", quantity: 75, price: 15 },
  // ... more products
];

const warehouses = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Warehouse ${String.fromCharCode(65 + (i % 26))}${
    Math.floor(i / 26) || ""
  }`,
}));

export default function AssignPurchasedProduct() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleQuantityChange = (productId, warehouseId, quantity) => {
    const existingAssignment = assignments.find(
      (a) => a.productId === productId && a.warehouseId === warehouseId
    );

    if (existingAssignment) {
      setAssignments(
        assignments.map((a) =>
          a.productId === productId && a.warehouseId === warehouseId
            ? { ...a, quantity }
            : a
        )
      );
    } else {
      setAssignments([...assignments, { productId, warehouseId, quantity }]);
    }
  };

  const getAssignedQuantity = (productId, warehouseId) => {
    const assignment = assignments.find(
      (a) => a.productId === productId && a.warehouseId === warehouseId
    );
    return assignment?.quantity || 0;
  };

  const getTotalAssigned = (productId) => {
    return assignments
      .filter((a) => a.productId === productId)
      .reduce((sum, a) => sum + a.quantity, 0);
  };

  const getWarehouseTotal = (warehouseId) => {
    return assignments
      .filter((a) => a.warehouseId === warehouseId)
      .reduce((sum, a) => sum + a.quantity, 0);
  };

  const addWarehouse = (warehouseId) => {
    if (!selectedWarehouses.includes(warehouseId)) {
      setSelectedWarehouses([...selectedWarehouses, warehouseId]);
    }
  };

  const removeWarehouse = (warehouseId) => {
    setSelectedWarehouses(
      selectedWarehouses.filter((id) => id !== warehouseId)
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              Assign Products to Warehouses
            </h1>
            <p className="text-muted-foreground">Purchase ID: {id}</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Warehouses</DialogTitle>
            </DialogHeader>
            <Select onValueChange={(value) => addWarehouse(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses
                  .filter((w) => !selectedWarehouses.includes(w.id))
                  .map((warehouse) => (
                    <SelectItem
                      key={warehouse.id}
                      value={warehouse.id.toString()}
                    >
                      {warehouse.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedWarehouses.map((warehouseId) => {
          const warehouse = warehouses.find((w) => w.id === warehouseId);
          return (
            <Badge key={warehouseId} variant="secondary">
              {warehouse?.name}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => removeWarehouse(warehouseId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background">
                Product
              </TableHead>
              <TableHead className="sticky left-[200px] bg-background">
                Total Qty
              </TableHead>
              <TableHead className="sticky left-[300px] bg-background">
                Remaining
              </TableHead>
              {selectedWarehouses.map((warehouseId) => {
                const warehouse = warehouses.find((w) => w.id === warehouseId);
                return (
                  <TableHead
                    key={warehouseId}
                    className="text-center min-w-[150px]"
                  >
                    {warehouse?.name}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="sticky left-0 bg-background font-medium">
                  {product.name}
                </TableCell>
                <TableCell className="sticky left-[200px] bg-background">
                  {product.quantity}
                </TableCell>
                <TableCell className="sticky left-[300px] bg-background">
                  {product.quantity - getTotalAssigned(product.id)}
                </TableCell>
                {selectedWarehouses.map((warehouseId) => (
                  <TableCell key={warehouseId} className="text-center p-2">
                    <Input
                      type="number"
                      min="0"
                      max={
                        product.quantity -
                        getTotalAssigned(product.id) +
                        getAssignedQuantity(product.id, warehouseId)
                      }
                      value={getAssignedQuantity(product.id, warehouseId) || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          warehouseId,
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 mx-auto"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="sticky left-0 bg-muted/50 font-medium">
                Warehouse Totals
              </TableCell>
              <TableCell className="sticky left-[200px] bg-muted/50" />
              <TableCell className="sticky left-[300px] bg-muted/50" />
              {selectedWarehouses.map((warehouseId) => (
                <TableCell
                  key={warehouseId}
                  className="text-center font-medium"
                >
                  {getWarehouseTotal(warehouseId)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={() => {
            // Handle save assignments
            console.log("Assignments:", assignments);
          }}
        >
          Save Assignments
        </Button>
      </div>
    </div>
  );
}
