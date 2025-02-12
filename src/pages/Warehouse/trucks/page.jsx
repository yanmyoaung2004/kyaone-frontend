"use client";

import { useState } from "react";
import { TruckDashboard } from "../../../components/Warehouse/trucks/truck-dashboard";
import { TruckDetails } from "../../../components/Warehouse/trucks/truck-details";
import { LiveTracking } from "../../../components/Warehouse/trucks/live-tracking";
import { OrderAssignment } from "../../../components/Warehouse/trucks/order-assignment";
import { DriverManagement } from "../../../components/Warehouse/trucks/driver-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TruckForm from "../../../components/Warehouse/trucks/TruckForm";
import DeleteConfirmation from "../../../components/Warehouse/trucks/DeleteConfirmation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon } from "lucide-react";

export default function TruckManagement() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteTruck, setIsDeleteTruck] = useState(false);
  const [deleteTruck, setDeleteTruck] = useState(null);
  const [isEditTruck, setIsEditTruck] = useState(false);
  const [formData, setFormdata] = useState(null);
  const { toast } = useToast();
  const [refresh, setRefresh] = useState(false);

  // console.log(isDeleteTruck);
  const handleSuccessToast = (message) => {
    toast({
      title: (
        <span>
          <CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" />
          {message}
        </span>
      ),
      variant: "success",
    });
  };

  const handleSubmit = async (updateTruck) => {
    // console.log(updateTruck);

    if (!isEditTruck) {
      console.log("Adding new truck", updateTruck);
      axios
        .post("/api/trucks", {
          status: updateTruck.allowance,
          license_plate: updateTruck.licensePlate,
        })
        .then((response) => {
          // setFormdata(response.data.truck);
          handleSuccessToast("Truck added successfully");
          setRefresh(!refresh);
          // console.log(response.data);
        })
        .catch((error) => console.error(error));
      return;
    }

    axios
      .put(`/api/trucks/${updateTruck.id}`, {
        status: updateTruck.allowance,
        license_plate: updateTruck.licensePlate,
      })
      .then((response) => {
        if (response.status === 200) {
          // setStatus(newStatus);
          setFormdata(response.data.truck);
          handleSuccessToast("Success");
          setRefresh(!refresh);
          // console.log(response.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const onSubmitDelete = async (truck) => {
    let truckId = truck.id;
    axios
      .delete(`/api/trucks/${truckId}`)
      .then((response) => {
        if (response.status === 200) {
          handleSuccessToast("Truck deleted successfully");
          setRefresh(!refresh);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Truck className="mr-2 h-6 w-6" />
            Truck and Driver Management Dashboard
          </CardTitle>
          <Button
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              setIsEditTruck(false);
            }}
            className="mb-4"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Truck
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
              <TabsTrigger value="orders">Order Assignment</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <TruckDashboard
                onTruckSelect={setSelectedTruck}
                setIsFormOpen={setIsFormOpen}
                setIsEditTruck={setIsEditTruck}
                isFormOpen={isFormOpen}
                setFormdata={setFormdata}
                setIsDeleteTruck={setIsDeleteTruck}
                refresh={refresh}
                setDeleteTruck={setDeleteTruck}
              />
              {selectedTruck && (
                <TruckDetails
                  truck={selectedTruck}
                  onClose={() => setSelectedTruck(null)}
                />
              )}
            </TabsContent>
            <TabsContent value="drivers">
              <DriverManagement />
            </TabsContent>
            <TabsContent value="tracking">
              <LiveTracking />
            </TabsContent>
            <TabsContent value="orders">
              <OrderAssignment />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {isFormOpen && (
        <TruckForm
          isEditTruck={isEditTruck}
          onSubmit={handleSubmit}
          formData={formData}
          onCancel={() => {
            setIsFormOpen(false);
            setIsEditTruck(false);
          }}
        />
      )}
      {isDeleteTruck && (
        <DeleteConfirmation
          onConfirm={(data) => onSubmitDelete(deleteTruck)}
          onCancel={() => setIsDeleteTruck(false)}
        />
      )}
    </div>
  );
}
