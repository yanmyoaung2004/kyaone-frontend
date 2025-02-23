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
import { PackageSearch } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";
import { formatToSpecificDateTime } from "../../../helpers/services";

export default function PurchaseList() {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/purchase/data/get`);
      setServiceCenters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterProducts = serviceCenters.filter((product) => {
    return product.service_center.name
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
        Purchase Management
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
        <Link to={"/purchase-create"}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Purchase
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.invoice_number.slice(0, 9)}</TableCell>
                <TableCell>{product.service_center.name}</TableCell>
                <TableCell>
                  {formatToSpecificDateTime(product.created_at)}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Assign
                  </Button>
                  <Link to={`/purchase-detail/${product.invoice_number}`}>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
