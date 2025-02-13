"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { User } from "lucide-react";
import { DriverDetails } from "./driver-details";
import { Notifications } from "./notifications";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import DriverCreateDialog from "./DriverForm";
import { useToast } from "@/hooks/use-toast";
import { handleSuccessToast } from "../../../helpers/ToastService";
import { Badge } from "@/components/ui/badge";

export function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    axios.get("/api/drivers").then((res) => {
      console.log(res.data);
      setDrivers(res.data);
    });
  }, [refresh]);

  const filteredDrivers = drivers;

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
  };

  const handleStatusUpdate = (driverId, newStatus) => {
    setDrivers(
      drivers.map((driver) =>
        driver.id === driverId ? { ...driver, status: newStatus } : driver
      )
    );
    if (selectedDriver && selectedDriver.id === driverId) {
      setSelectedDriver({ ...selectedDriver, status: newStatus });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDriverClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createDriver = (driver) => {
    axios
      .post("/api/drivers", driver)
      .then((res) => {
        console.log(res.data);
        setRefresh(!refresh);
        handleSuccessToast("Driver added successfully");
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: <span>{"Driver creation failed"}</span>,
        });
      });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <User className="mr-2 h-6 w-6" />
            Driver Management
            <div className="flex-1"></div>
            <Button onClick={handleAddDriverClick}>Add Driver</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by Driver Name or Truck Number"
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
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="On Delivery">On Delivery</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver ID</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleDriverClick(driver)}
                  >
                    <TableCell className="font-medium">{driver.id}</TableCell>
                    <TableCell>{driver.driver_license}</TableCell>
                    <TableCell>
                      {driver?.status == "free" ? (
                        <Badge variant="success">Free</Badge>
                      ) : (
                        <Badge variant="destructive">Busy</Badge>
                      )}
                    </TableCell>
                    <TableCell>{driver.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedDriver && (
        <DriverDetails
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {isModalOpen && (
        <DriverCreateDialog onClose={handleCloseModal} onSave={createDriver} />
      )}

      <Notifications />
    </div>
  );
}
