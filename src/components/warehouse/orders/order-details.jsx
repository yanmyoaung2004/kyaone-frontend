"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, Calendar, MapPin, Building } from "lucide-react";

export function OrderDetails({ order, onStatusUpdate }) {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = () => {
    if (status !== order.status) {
      onStatusUpdate(order.id, status);
    }
  };

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Order ID</span>
          <Badge variant="secondary">{order.id}</Badge>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{order.customer}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{order.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{order.city.name}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Status</span>
            <Badge
              variant={
                order.status === "Delivered"
                  ? "success"
                  : order.status === "Cancelled"
                  ? "destructive"
                  : "default"
              }
            >
              {order.status}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Assigned Truck</span>
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>{order.assignedTruck || "Not Assigned"}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Estimated Delivery</span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{order.city.eta || "Not Scheduled"}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex flex-col space-y-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Change Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="w-full"
          onClick={handleStatusChange}
          disabled={status === order.status}
        >
          Update Status
        </Button>
      </CardFooter> */}
    </Card>
  );
}
