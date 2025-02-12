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

export default function TruckManagement() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [trucks, setTrucks] = useState([
    { id: 1, licensePlate: "ABC-123", allowance: "free" },
    { id: 2, licensePlate: "XYZ-789", allowance: "busy" },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteTruck, setIsDeleteTruck] = useState(false);
  const [isEditTruck, setIsEditTruck] = useState(false);
  const [formData,setFormdata] = useState(null);

  console.log(isDeleteTruck);

  const handleSubmit = async (updateTruck) => {
    console.log(updateTruck);
    
    axios.put(`/api/trucks/${updateTruck.id}`, {
      status: updateTruck.allowance,
      license_plate: updateTruck.licensePlate,
  })
  .then(response =>{
    if(response.status === 200){
    setStatus(newStatus)
    handleSuccessToast("Success");
    console.log("Success");
    
  } })
  .catch(error => console.error(error.response.data));  
  
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
          onConfirm={() => console.log("Truck deleted...")}
          onCancel={() => setIsDeleteTruck(false)}
        />
      )}
    </div>
  );
}
