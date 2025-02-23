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
import { handleSuccessToast } from "../../../helpers/ToastService";

// const suppliers = [
//   { name: "Supplier 1", id: 1 },
//   { name: "Supplier 2", id: 2 },
//   { name: "Supplier 3", id: 3 },
//   { name: "Supplier 4", id: 4 },
// ];
// const productOptions = [
//   { name: "Product 1", id: 1 },
//   { name: "Product 2", id: 2 },
//   { name: "Product 3", id: 3 },
//   { name: "Product 4", id: 4 },
// ];

export default function PurchasePage() {
  const [suppliers, setSuppliers] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (selectedProduct && quantity && price) {
      const productToAdd = productOptions.find((p) => p.id === selectedProduct);
      if (productToAdd) {
        const newProduct = {
          id: productToAdd.id,
          name: productToAdd.name,
          quantity: Number.parseInt(quantity),
          price: Number.parseFloat(price),
        };
        setProducts([...products, newProduct]);
        setSelectedProduct(null);
        setQuantity("");
        setPrice("");
      }
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const calculateTotal = () => {
    return products
      .reduce((total, product) => total + product.quantity * product.price, 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {
    console.log("Submitting purchase:", {
      serviceCenter: supplier,
      products,
      total: calculateTotal(),
    });
    try {
      const res = await axios.post("api/purchase/create", {
        serviceCenter: supplier,
        products,
        total: calculateTotal(),
      });
      if (res.status === 201) {
        handleSuccessToast(res.data.message);
        setProducts([]);
        setSupplier(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServiceCenter = async () => {
    try {
      const res = await axios.get("/api/service-centers");
      setSuppliers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProductOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceCenter();
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Products</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Supplier Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={supplier?.toString() || ""}
            onValueChange={(value) => setSupplier(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((s) => (
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                {productOptions.map((product) => (
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
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(product.quantity * product.price).toFixed(2)}
                  </TableCell>
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
          <div className="text-lg font-semibold">
            Total: ${calculateTotal()}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={products.length === 0 || !supplier}
          >
            Submit Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
