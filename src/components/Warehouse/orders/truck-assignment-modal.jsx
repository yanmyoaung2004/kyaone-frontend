"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleFailureToast, handleSuccessToast } from "@/helpers/ToastService";
import findNearestWarehouse from "@/helpers/WarehouseSelection";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

export function TruckAssignmentModal({
  selectedOrders,
  onAssign,
  onClose,
  drivers,
  trucks,
  deliveryCity,
}) {
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    "Select available warehouse"
  );
  const { nearestWarehouse } = findNearestWarehouse(deliveryCity);
  const [warehouseInfo, setWarehouseInfo] = useState([]);
  const [availableWarehouses, setAvailableWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDriverTruck, setShowDriverTruck] = useState(false);

  useEffect(() => {
    fetchWarehouseAvailable();
  }, []);

  const fetchWarehouseAvailable = async () => {
    try {
      const res = await axios.post(
        "/api/warehouses/product/checkwarehouseavailability/check",
        {
          orders: selectedOrders,
          warehouse: nearestWarehouse.city,
        }
      );

      if (!res.data.success) {
        setWarehouseInfo(res.data.data);
        const warehousesRes = await axios.post(
          "/api/warehouses/product/checkwarehouseavailability/warehouse",
          {
            orders: selectedOrders,
          }
        );

        setAvailableWarehouses(warehousesRes.data.data);
      } else {
        setSelectedWarehouse(res.data.warehouseId);
      }
      setShowDriverTruck(true);
    } catch (error) {
      console.error("Error fetching warehouse availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWarehouseSelect = (warehouseId) => {
    setSelectedWarehouse(warehouseId);
    setSelectedTruck("");
    setSelectedDriver("");
  };

  const handleAssign = async () => {
    if (!selectedDriver || !selectedTruck) return;

    try {
      const res = await axios.post("/api/orderAssignTrucks", {
        orders: selectedOrders,
        driver_id: selectedDriver,
        truck_id: selectedTruck,
        selectedWarehouse: selectedWarehouse,
      });

      if (res.status === 201) {
        handleSuccessToast("Successfully assigned!");
        onAssign();
      }
    } catch (error) {
      handleFailureToast("Error occurred!");
      console.error("Error assigning truck:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-10">
        <DialogHeader>
          <DialogTitle>Assign Truck</DialogTitle>
          <DialogDescription>
            Assign a truck and driver to the selected orders.
          </DialogDescription>
        </DialogHeader>
        <div>
          {loading ? (
            <div className="text-center text-gray-500 flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Optimizing best warehouse...
            </div>
          ) : (
            <WarehouseInfoDisplay
              warehouseName={nearestWarehouse.city}
              warehouseInfo={warehouseInfo}
              nearestWarehouse={nearestWarehouse}
              availableWarehouses={availableWarehouses}
              onWarehouseSelect={handleWarehouseSelect}
              selectedWarehouse={selectedWarehouse}
            />
          )}

          {(warehouseInfo.length === 0 ||
            (selectedWarehouse !== "Select available warehouse" && !loading)) &&
            showDriverTruck && (
              <TruckDriverSelection
                trucks={trucks}
                drivers={drivers}
                selectedTruck={selectedTruck}
                setSelectedTruck={setSelectedTruck}
                selectedDriver={selectedDriver}
                setSelectedDriver={setSelectedDriver}
              />
            )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={
              !selectedTruck ||
              !selectedDriver ||
              (warehouseInfo.length > 0 && selectedWarehouse === "none")
            }
          >
            Assign Truck
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WarehouseInfoDisplay({
  warehouseInfo,
  nearestWarehouse,
  availableWarehouses,
  onWarehouseSelect,
  warehouseName,
  selectedWarehouse,
}) {
  if (warehouseInfo.length > 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Alert: Insufficient Stock Detected
        </h2>
        <p className="text-gray-600">
          The system has selected the nearest warehouse,{" "}
          <strong>{warehouseName}</strong>, to fulfill the current order.
          However, there is insufficient stock for the following products:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          {warehouseInfo.map((data, i) => (
            <li key={i}>
              <span className="font-medium">
                {data.product_name} - Available: {data.available_quantity} /
                Required: {data.required_quantity}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          To ensure timely order fulfillment, please take one of the following
          actions:
        </p>
        <div className="flex gap-4">
          <Link to={"/purchase-create"}>
            <Button className="py-2">Restock Products</Button>
          </Link>
          <Link to={"/warehouse-transfer"}>
            <Button className="py-2">Initiate Warehouse Transfer</Button>
          </Link>
        </div>

        <p className="text-gray-600">Or Choose other available warehouse</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            onValueChange={onWarehouseSelect}
            value={selectedWarehouse}
            className="col-span-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose an available warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Select available warehouse">
                Select available warehouse
              </SelectItem>

              {availableWarehouses.map((warehouse) => (
                <SelectItem
                  key={warehouse.warehouse_id}
                  value={warehouse.warehouse_id}
                >
                  {warehouse.warehouse_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600">
        The system has selected the nearest warehouse to fulfill the current
        order. There is sufficient stock for all requested products. The
        selected warehouse is{" "}
        <span className="font-semibold">{nearestWarehouse.city}</span>.
      </p>
    </div>
  );
}

function TruckDriverSelection({
  trucks,
  drivers,
  selectedTruck,
  setSelectedTruck,
  selectedDriver,
  setSelectedDriver,
}) {
  return (
    <div className="space-y-4 mt-4">
      <Select value={selectedTruck} onValueChange={setSelectedTruck}>
        <SelectTrigger>
          <SelectValue placeholder="Select a truck" />
        </SelectTrigger>
        <SelectContent>
          {trucks.map((truck) => (
            <SelectItem key={truck.id} value={truck.id}>
              {truck.license_plate}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedDriver} onValueChange={setSelectedDriver}>
        <SelectTrigger>
          <SelectValue placeholder="Select a driver" />
        </SelectTrigger>
        <SelectContent>
          {drivers.map((driver) => (
            <SelectItem key={driver.id} value={driver.id}>
              {driver.user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
