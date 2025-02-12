"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { handleSuccessToast } from "../../../helpers/ToastService";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck, User, Package, Calendar } from "lucide-react";

export function TruckDetails({ truck, onClose }) {
  const [status, setStatus] = useState(truck.status);
  const [orders, setOrders] = useState([]);
  const [driver, setDriver] = useState([]);

  console.log(truck);

  useEffect(() => {
    axios.get(`/api/truck/${truck.id}/orders`).then((response) => {
      if (response.status === 200) {
        // setStatus(response.data.status);
        setOrders(response.data.orders);
        setDriver(response.data.driver);
        console.log(response.data);
      }
    });
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    axios
      .put(`/api/trucks/${truck.id}`, {
        status: newStatus,
      })
      .then((response) => {
        if (response.status === 200) {
          setStatus(newStatus);
          handleSuccessToast("Success");
          console.log("Success");
        }
      })
      .catch((error) => console.error(error.response.data));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Truck Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TruckInfo truck={truck} />
          <AssignedDriver driver={driver} />
          <CurrentOrders orders={orders} />
          {/* <MaintenanceStatus /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TruckInfo({ truck }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Truck Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="font-medium">Truck ID:</dt>
          <dd>TRK-{truck?.id}</dd>
          <dt className="font-medium">License Plate:</dt>
          <dd>{truck?.license_plate}</dd>
          <dt className="font-medium">Model:</dt>
          <dd>Volvo FH16</dd>
          <dt className="font-medium">Capacity:</dt>
          <dd>20,000 kg</dd>
          <dt className="font-medium">Current Status:</dt>
          <dd>
            {truck?.status == "free" ? (
              <Badge variant="success">Free</Badge>
            ) : (
              <Badge variant="destructive">Busy</Badge>
            )}
          </dd>
        </dl>
      </CardContent>
    </Card>
  );
}

function AssignedDriver({ driver }) {
  console.log(driver);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <User className="w-5 h-5 mr-2" />
          Assigned Driver
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="font-medium">Driver Name:</dt>
          <dd>{driver?.user?.name || "John Doe"}</dd>
          <dt className="font-medium">Contact:</dt>
          <dd>{driver?.phone}</dd>
          <dt className="font-medium">Status:</dt>
          <dd>
            {driver.status == "free" ? (
              <Badge variant="success">Free</Badge>
            ) : (
              <Badge variant="destructive">Busy</Badge>
            )}
          </dd>
        </dl>
      </CardContent>
    </Card>
  );
}

function CurrentOrders({ orders }) {
  return (
    <Card className="col-span-full ">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Current Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-60 overflow-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Delivery Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow>
                <TableCell>ORD-{order?.id}</TableCell>
                <TableCell>{order?.total_price} MMK</TableCell>
                <TableCell>
                  <Badge variant="secondary">{order?.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function MaintenanceStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Maintenance Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="font-medium">Last Service Date:</dt>
          <dd>2023-05-15</dd>
          <dt className="font-medium">Next Scheduled Service:</dt>
          <dd>2023-08-15</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
