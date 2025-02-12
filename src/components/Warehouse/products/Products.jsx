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
import { PlusCircle, Search } from "lucide-react";
import ProductModal from "./ProductModal";
import { PackageSearch } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";

const initialProducts = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    quantity: 50,
    price: 999.99,
  },
  {
    id: "2",
    name: "Desk Chair",
    category: "Furniture",
    quantity: 30,
    price: 199.99,
  },
  {
    id: "3",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 100,
    price: 29.99,
  },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id} `);
      if (res.status === 200) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = products.filter((product) => {
    const productNameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return productNameMatch;
  });

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-8">
      <div className="text-3xl font-bold mb-8 flex items-center flex-start">
        <PackageSearch size={24} />
        Product Management
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-2">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-8 pr-10 py-5 rounded-full"
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
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterProducts.length > 0 &&
              filterProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>PD-{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={(product) => {
            if (editingProduct) {
              handleEditProduct(product);
            } else {
              handleAddProduct(product);
            }
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
        />
      )}
    </div>
  );
}
