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
import CityModal from "./WarehouseModal";
import { PackageSearch } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/warehouses`);
      setWarehouses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = (newProduct) => {
    setWarehouses([...warehouses, { ...newProduct }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setWarehouses(
      warehouses.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/warehouses/${id}`);
      if (res.status === 200) {
        setWarehouses(warehouses.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = warehouses.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
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
        Warehouse Management
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
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Warehouse
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>WH-{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.address}</TableCell>
                <TableCell>{product.phone}</TableCell>
                <TableCell>
                  <Link to={`/warehouse-product/${product.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      Detail
                    </Button>
                  </Link>
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
        <CityModal
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
