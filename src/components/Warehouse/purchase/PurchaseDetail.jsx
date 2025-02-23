"use client";

import { useEffect, useState } from "react";
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
import { PlusCircle, Search, SquareArrowOutUpRight } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router";

export default function PurchaseDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const { invoice_number } = useParams();

  const invoiceProudct = async () => {
    try {
      const res = await axios.get(
        `api/purchase/data/product/${invoice_number}`
      );
      setProductList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    invoiceProudct();
  }, []);

  const total = productList.reduce(
    (total, product) => total + product.quantity * product.purchase_price.price,
    0
  );

  const filterProducts = productList.filter((product) => {
    return product.product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className="text-3xl font-bold mb-8 flex items-center flex-start">
        <PackageSearch size={24} />
        Invoice - {invoice_number}
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-2">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-8 pr-10 py-5 rounded-md"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <Button>
          <SquareArrowOutUpRight className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Buying Price</TableHead>
              <TableHead className="text-right pr-3">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterProducts.length > 0 &&
              filterProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>PD-{product.product.id}</TableCell>
                  <TableCell>{product.product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="text-right">
                    {(product.purchase_price.price * 1).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right pr-3">
                    {(product.purchase_price.price * product.quantity).toFixed(
                      2
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {filterProducts.length > 0 && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">Total : </TableCell>
                <TableCell className="text-right pr-3">
                  {total.toFixed(2)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
