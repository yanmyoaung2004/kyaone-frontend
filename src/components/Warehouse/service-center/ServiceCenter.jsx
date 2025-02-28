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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PlusCircle, Search } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import ServiceCenterDetail from "./ServiceCenterDetail";

export default function ServiceCenter() {
  const [serviceCenters, setServicCenters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/service-centers`);
      setServicCenters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = (newProduct) => {
    setServicCenters([...serviceCenters, { ...newProduct }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setServicCenters(
      serviceCenters.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/cities/${id}`);
      if (res.status === 200) {
        setServicCenters(serviceCenters.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = serviceCenters.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filterProducts.length / ordersPerPage);
  const paginatedOrders = filterProducts.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

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
        Service Center Management
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
          <PlusCircle className="mr-2 h-4 w-4" /> Add Service Center
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((product) => (
              <TableRow key={product.id}>
                <TableCell>SC-{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.phone}</TableCell>
                <TableCell>{product.location}</TableCell>
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
        <Pagination className="py-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer hover:bg-transparent"
              />
            </PaginationItem>
            <span className="font-semibold text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer hover:bg-transparent"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {isModalOpen && (
        <ServiceCenterDetail
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
