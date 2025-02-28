"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
import axios from "axios";

interface Assignment {
  productId: number;
  warehouseId: number;
  quantity: number;
}

export default function AssignPurchaseProduct() {
  const { invoice_number } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [purchaseProduct, setPurchaseProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios(`api/purchase/data/product/${invoice_number}`);
      setProducts(
        res.data.map((p) => ({
          purchaseProductId: p.id,
          id: p.product_id,
          name: p.product.name,
          storedQuantity: p.stored_quantity,
          quantity: p.quantity,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, [invoice_number]);

  const fetchWarehouses = useCallback(async () => {
    try {
      const res = await axios.get("/api/warehouses");
      setWarehouses(
        res.data.data.map((p) => ({
          id: p.id,
          name: p.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
    fetchWarehouses();
  }, [invoice_number, fetchProduct, fetchWarehouses]);

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

  const getAssignedWarehouses = useCallback(
    (productId: number) => {
      return assignments
        .filter((a) => a.productId === productId)
        .map((a) => warehouses.find((w) => w.id === a.warehouseId))
        .filter((w): w is NonNullable<typeof w> => w !== undefined);
    },
    [assignments, warehouses]
  );

  const handleAddQuantity = (quantity: number) => {
    setProducts(
      products.map((item) =>
        item.id === purchaseProduct
          ? {
              ...item,
              storedQuantity: item.storedQuantity + quantity,
            }
          : item
      )
    );
    setPurchaseProduct(null);
  };

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
            <p className="text-muted-foreground">
              Purchase ID: {invoice_number}
            </p>
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
                <TableHead>Stored Qty</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.storedQuantity}</TableCell>
                  <TableCell>{getTotalAssigned(product.id)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPurchaseProduct(product.purchaseProductId);
                        setExpandedProduct(
                          expandedProduct === product.id ? null : product.id
                        );
                      }}
                    >
                      Assign
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
          purchaseProduct={purchaseProduct}
          expandedProduct={expandedProduct}
          onClose={() => setExpandedProduct(null)}
          products={products}
          warehouses={warehouses}
          getAssignedWarehouses={getAssignedWarehouses}
          handleQuantityChange={handleQuantityChange}
          getAssignedQuantity={getAssignedQuantity}
          assignments={assignments}
          refuillStoredQuantity={handleAddQuantity}
        />
      )}
    </div>
  );
}
