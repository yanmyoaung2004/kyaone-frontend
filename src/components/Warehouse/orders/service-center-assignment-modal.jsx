"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import {
  handleFailureToast,
  handleSuccessToast,
} from "../../../helpers/ToastService";

// Mock data for available service centers
const availableServiceCenters = [
  { id: "SC-001", name: "Service Center A", location: "City A" },
  { id: "SC-002", name: "Service Center B", location: "City B" },
  { id: "SC-003", name: "Service Center C", location: "City C" },
];

export function ServiceCenterAssignmentModal({
  order,
  onAssign,
  onClose,
  orders,
  setOrders,
}) {
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("");
  const [serviceCenters, setServiceCenters] = useState([]);

  useEffect(() => {
    axios
      .get("/api/service-centers")
      .then((response) => {
        console.log(response.data);
        setServiceCenters(response.data);
      })
      .catch((error) => {
        console.log(error);
        handleFailureToast("Faile to get service-centers ");
      });
  }, []);

  const handleAssign = () => {
    // if (selectedServiceCenter) {
    //   onAssign(order.id, selectedServiceCenter);
    // }
    handleSuccessToast("Successfully Assign");

    console.log("sfj");

    // order is array of id
    setOrders(
      orders.map((o) =>
        order.includes(o.id)
          ? { ...o, serviceCenter: selectedServiceCenter }
          : o
      )
    );

    console.log(orders);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          // onClick={() => {
          //   handleAssignTruckClick();
          // }}
          className="flex items-center"
        >
          <Building2 className="mr-2 h-4 w-4" />
          Assign To Service Center
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Service Center to Order {order.id}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select
            value={selectedServiceCenter}
            onValueChange={setSelectedServiceCenter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a service center" />
            </SelectTrigger>
            <SelectContent>
              {serviceCenters &&
                serviceCenters.map((center) => (
                  <SelectItem key={center.id} value={center.name}>
                    {center.name} - {center.location}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedServiceCenter}>
            Assign Service Center
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
