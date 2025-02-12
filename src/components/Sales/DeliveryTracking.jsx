"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Truck, Eye } from "lucide-react"

const deliveries = [
  {
    id: "12345",
    customer: "Alice Johnson",
    eta: "11:00 AM",
    status: "In Progress",
    address: "123 Main St, Anytown, AN 12345",
    items: ["2x Large Pizza", "1x Garlic Bread"],
    driver: "John Doe",
  },
  {
    id: "67890",
    customer: "Bob Smith",
    eta: "12:00 PM",
    status: "Delayed",
    address: "456 Oak Ave, Somewhere, SW 67890",
    items: ["1x Burger Combo", "1x Milkshake"],
    driver: "Jane Smith",
  },
  {
    id: "54321",
    customer: "Charlie Brown",
    eta: "1:30 PM",
    status: "On Time",
    address: "789 Pine Rd, Elsewhere, EL 54321",
    items: ["3x Tacos", "1x Nachos", "2x Soda"],
    driver: "Sam Wilson",
  },
]

export default function DeliveryTracking() {
  const [selectedDelivery, setSelectedDelivery] = useState(null)

  const openDeliveryDetails = (delivery) => {
    setSelectedDelivery(delivery)
  }

  const closeDeliveryDetails = () => {
    setSelectedDelivery(null)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Delivery Tracking</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View All</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>All Deliveries</DialogTitle>
              <DialogDescription>Overview of all current deliveries.</DialogDescription>
            </DialogHeader>
            <CardContent>
              <ul className="space-y-4">
                {deliveries.map((delivery) => (
                  <li key={delivery.id} className="bg-gray-50 p-3 rounded-md text-sm hover:bg-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>Customer: {delivery.customer}</p>
                        <p>ETA: {delivery.eta}</p>
                        <p>Status: {delivery.status}</p>
                      </div>
                      <div>
                        <Eye
                          className="h-5 w-5 hover:text-gray-700 cursor-pointer"
                          onClick={() => openDeliveryDetails(delivery)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>{delivery.customer}</TableCell>
                <TableCell>{delivery.eta}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      delivery.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : delivery.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {delivery.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" onClick={() => openDeliveryDetails(delivery)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedDelivery && (
        <Dialog open={!!selectedDelivery} onOpenChange={closeDeliveryDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Delivery Details</DialogTitle>
              <DialogDescription>Order ID: {selectedDelivery.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Info</h3>
                  <p>{selectedDelivery.customer}</p>
                  <p className="text-sm text-gray-500">{selectedDelivery.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Delivery Status</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedDelivery.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : selectedDelivery.status === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedDelivery.status}
                  </span>
                  <p className="mt-1 text-sm">ETA: {selectedDelivery.eta}</p>
                  <p className="text-sm text-gray-500">Driver: {selectedDelivery.driver}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <ul className="list-disc pl-5">
                  {selectedDelivery.items.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Map</h3>
                <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Map placeholder</span>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button type="button" variant="secondary">
                <Package className="mr-2 h-4 w-4" />
                Track Package
              </Button>
              <Button type="button" variant="secondary">
                <Truck className="mr-2 h-4 w-4" />
                Contact Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

