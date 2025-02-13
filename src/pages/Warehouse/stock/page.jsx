"use client";

import { useEffect, useState } from "react";
import { StockList } from "../../../components/Warehouse/stock/stock-list";
import { RestockForm } from "../../../components/Warehouse/stock/restock-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import axios from "axios";

export default function StockManagement() {
  const [stock, setStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/warehouse/stocks`);
      setStock(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStock = stock.filter((item) =>
    item.name.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleRestock = (productId, quantity) => {
    setStock(
      stock.map((item) =>
        item.id === productId
          ? {
              ...item,
              currentStock: item.currentStock + quantity,
              lastRestockDate: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
    setSelectedProduct(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStock = filteredStock.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <BarChart2 className="mr-2 h-6 w-6" />
            Stock Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by Product Name or SKU"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <StockList
              stock={currentStock}
              onProductSelect={setSelectedProduct}
            />
            {selectedProduct && (
              <RestockForm
                product={selectedProduct}
                onRestock={handleRestock}
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
