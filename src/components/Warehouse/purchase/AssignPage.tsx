"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
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
import { AssignWarehouseModal } from "./AssignWarehouseModal.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";

const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${String.fromCharCode(65 + (i % 26))}${
    Math.floor(i / 26) || ""
  }`,
  quantity: Math.floor(Math.random() * 1000) + 100,
  price: Math.floor(Math.random() * 100) + 10,
}));

const warehouses = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Warehouse ${String.fromCharCode(65 + (i % 26))}${
    Math.floor(i / 26) || ""
  }`,
  capacity: Math.floor(Math.random() * 10000) + 5000,
}));

interface Assignment {
  productId: number;
  warehouseId: number;
  quantity: number;
}

export default function AssignPage() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleQuantityChange = useCallback(
    (productId: number, warehouseId: number, quantity: number) => {
      setAssignments((prevAssignments) => {
        const existingIndex = prevAssignments.findIndex(
          (a) => a.productId === productId && a.warehouseId === warehouseId
        );
        if (existingIndex > -1) {
          if (quantity === 0) {
            return prevAssignments.filter(
              (_, index) => index !== existingIndex
            );
          }
          return [
            ...prevAssignments.slice(0, existingIndex),
            { ...prevAssignments[existingIndex], quantity },
            ...prevAssignments.slice(existingIndex + 1),
          ];
        } else if (quantity > 0) {
          return [...prevAssignments, { productId, warehouseId, quantity }];
        }
        return prevAssignments;
      });
    },
    []
  );

  const getAssignedQuantity = useCallback(
    (productId: number, warehouseId: number) => {
      return (
        assignments.find(
          (a) => a.productId === productId && a.warehouseId === warehouseId
        )?.quantity || 0
      );
    },
    [assignments]
  );

  const getTotalAssigned = useCallback(
    (productId: number) => {
      return assignments
        .filter((a) => a.productId === productId)
        .reduce((sum, a) => sum + a.quantity, 0);
    },
    [assignments]
  );

  const getWarehouseTotal = useCallback(
    (warehouseId: number) => {
      return assignments
        .filter((a) => a.warehouseId === warehouseId)
        .reduce((sum, a) => sum + a.quantity, 0);
    },
    [assignments]
  );

  const getAssignedWarehouses = useCallback(
    (productId: number) => {
      return assignments
        .filter((a) => a.productId === productId)
        .map((a) => warehouses.find((w) => w.id === a.warehouseId))
        .filter((w): w is NonNullable<typeof w> => w !== undefined);
    },
    [assignments]
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
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
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)] border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{getTotalAssigned(product.id)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedProduct(
                          expandedProduct === product.id ? null : product.id
                        )
                      }
                    >
                      {expandedProduct === product.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {expandedProduct && (
        <AssignWarehouseModal
          expandedProduct={expandedProduct}
          onClose={() => setExpandedProduct(null)}
          products={products}
          warehouses={warehouses}
          getAssignedWarehouses={getAssignedWarehouses}
          handleQuantityChange={handleQuantityChange}
          getAssignedQuantity={getAssignedQuantity}
          assignments={assignments}
        />
      )}
    </div>
  );
}
