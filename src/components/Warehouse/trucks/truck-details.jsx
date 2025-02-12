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

export function TruckDetails({ truck, onClose }) {
  const [status, setStatus] = useState(truck.status);
  const [orders, setOrders] = useState([]);
  const [driver, setDriver] = useState([]);

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Truck Details: {truck.number}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status :
            </Label>
            <div>
              <span
                className={`flex justify-center items-center rounded-full py-1 text-xs font-medium ${
                  truck.status === "free"
                    ? "bg-green-100 text-green-800"
                    : truck.status === "busy"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {truck.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Driver : </Label>
            <div className="col-span-3">{driver.nrc_number || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Current Orders : </Label>
            <div className="col-span-3">
              {" "}
              {orders?.length > 0
                ? orders.map((order) => `ORD-${order.id}`).join(", ")
                : "None"}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {/* <Button onClick={onClose}>Close</Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>View History</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Truck History: {truck.number}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {/* Add truck history content here */}
                <p>Truck history and logs will be displayed here.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
