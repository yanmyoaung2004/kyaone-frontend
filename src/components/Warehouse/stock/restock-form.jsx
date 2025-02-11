"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RestockForm({ product, onRestock }) {
  const [quantity, setQuantity] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    onRestock(product.id, Number(quantity))
    setQuantity(0)
  }

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Restock Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p>
              <strong>Product:</strong> {product.name}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Current Stock:</strong> {product.currentStock}
            </p>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity to Add
            </label>
            <Input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>
          <Button type="submit">Restock</Button>
        </form>
      </CardContent>
    </Card>
  )
}

