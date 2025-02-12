"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import axios from "axios";

export function TruckDashboard({
  onTruckSelect,
  setIsEditTruck,
  setIsFormOpen,
  isFormOpen,
  setIsDeleteTruck,
  setFormdata,
  setDeleteTruck,
  refresh,
}) {
  const [trucks, setTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTrucks, setFilterTrucks] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    axios
      .get("/api/trucks")
      .then((res) => {
        setTrucks(res.data.trucks);
        s(res.data.trucks);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch trucks. Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let filtered = trucks;
    if (searchTerm) {
      filtered = filtered.filter(
        (truck) =>
          (truck.license_plate
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            (truck.driver &&
              truck.driver.toLowerCase().includes(searchTerm.toLowerCase()))) &&
          (statusFilter === "All" || truck.status === statusFilter)
      );
      // console.log(filtered);
      setFilterTrucks(filtered);
    } else {
      setFilterTrucks(trucks);
    }
  }, [searchTerm, trucks]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const totalTrucks = trucks.length;
  const freeTrucks = trucks.filter((truck) => truck.status === "free").length;
  const busyTrucks = trucks.filter((truck) => truck.status === "busy").length;
  const maintenanceTrucks = trucks.filter(
    (truck) => truck.status === "maintenance"
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trucks</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Trucks</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{freeTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Busy Trucks</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{busyTrucks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceTrucks}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by Truck Number or Driver"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Truck Number</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Assigned Driver</TableHead> */}
              {/* <TableHead>Current Orders</TableHead> */}
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterTrucks.map((truck) => (
              <TableRow
                key={truck.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onTruckSelect(truck)}
              >
                <TableCell className="font-medium">
                  {truck.license_plate}
                </TableCell>
                <TableCell>
                  {truck.status == "free" ? (
                    <Badge variant="success">Free</Badge>
                  ) : (
                    <Badge variant="destructive">Busy</Badge>
                  )}
                </TableCell>
                {/* <TableCell>{truck.driver || "N/A"}</TableCell> */}
                {/* <TableCell>
                  {truck.assigned_orders?.length > 0
                    ? truck.assigned_orders
                        .map((order) => `ORD-${order.order_id}`)
                        .join(", ")
                    : "None"}
                </TableCell> */}
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Pencil
                      size={24}
                      className="hover:bg-gray-300 text-gray-500 rounded-md p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFormOpen(!isFormOpen);
                        setIsEditTruck(true);
                        setFormdata(truck);
                      }}
                    />
                    <Trash2Icon
                      size={24}
                      className="hover:bg-gray-300 rounded-md p-1 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDeleteTruck(true);
                        setDeleteTruck(truck);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-4">
          {/* <div className="flex-1 text-sm text-muted-foreground">
          {0} of {5} row(s) selected.
        </div> */}
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
