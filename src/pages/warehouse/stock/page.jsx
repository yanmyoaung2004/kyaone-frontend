"use client"

import { useState } from "react"
import { StockList } from "../../../components/warehouse/stock/stock-list"
import { RestockForm } from "../../../components/warehouse/stock/restock-form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"

// Mock data for demonstration
const mockStock = [
  { id: "P001", name: "Widget A", sku: "WA-001", currentStock: 50, reorderLevel: 20, lastRestockDate: "2023-05-15" },
  { id: "P002", name: "Gadget B", sku: "GB-002", currentStock: 15, reorderLevel: 30, lastRestockDate: "2023-05-20" },
  { id: "P003", name: "Doohickey C", sku: "DC-003", currentStock: 75, reorderLevel: 50, lastRestockDate: "2023-05-10" },
]

export default function StockManagement() {
  const [stock, setStock] = useState(mockStock)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredStock = stock.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRestock = (productId, quantity) => {
    setStock(
      stock.map((item) =>
        item.id === productId
          ? {
              ...item,
              currentStock: item.currentStock + quantity,
              lastRestockDate: new Date().toISOString().split("T")[0],
            }
          : item,
      ),
    )
    setSelectedProduct(null)
  }

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
            <StockList stock={filteredStock} onProductSelect={setSelectedProduct} />
            {selectedProduct && <RestockForm product={selectedProduct} onRestock={handleRestock} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

