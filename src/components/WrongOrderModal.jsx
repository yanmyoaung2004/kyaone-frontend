"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { useEffect } from "react";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../helpers/ToastService";

export default function WrongOrderModal({ selectComplaint }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editableQuantities, setEditableQuantities] = useState(
    Object.fromEntries(
      products.map((product) => [product.id, product.quantity])
    )
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `api/warehouse/getproducts/${selectComplaint.order_id}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [selectComplaint]);

  const handleQuantityClick = (productId) => {
    setEditableQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId],
    }));
  };

  const handleQuantityChange = (productId, value) => {
    setEditableQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.id.toString().includes(searchTerm)
  );

  const handleAssignToNewOrder = async (e) => {
    e.preventDefault();

    const selectedData = selectedProducts.map((id) => ({
      id,
      quantity: editableQuantities[id],
    }));
    try {
      const res = await axios.post("/api/orders/create/return", {
        order_id: selectComplaint.order_id,
        products: selectedData,
      });
      if (res.status === 201) {
        setIsOpen(false);
        handleSuccessToast("You have successfully assigned!");
      }
    } catch (error) {
      console.log(error);
      setIsOpen(false);
      handleFailureToast("Error occur!");
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Return</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Wrong Order Complaint</DialogTitle>
            <DialogDescription>
              Select products and adjust quantities
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleProductSelect(product.id)}
                      />
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {selectedProducts.includes(product.id) ? (
                        <Input
                          type="number"
                          value={editableQuantities[product.id]}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                        />
                      ) : (
                        <span
                          onDoubleClick={() => handleQuantityClick(product.id)}
                        >
                          {editableQuantities[product.id]}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssignToNewOrder}
              disabled={selectedProducts.length === 0}
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
