"use client"

import { useState } from "react"
import { TruckDashboard } from "../../../components/warehouse/trucks/truck-dashboard"
import { TruckDetails } from "../../../components/warehouse/trucks/truck-details"
import { LiveTracking } from "../../../components/warehouse/trucks/live-tracking"
import { OrderAssignment } from "../../../components/warehouse/trucks/order-assignment"
import { DriverManagement } from "../../../components/warehouse/trucks/driver-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Truck } from "lucide-react"

export default function TruckManagement() {
  const [selectedTruck, setSelectedTruck] = useState(null)

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Truck className="mr-2 h-6 w-6" />
            Truck and Driver Management Dashboard
          </CardTitle>
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
              <TruckDashboard onTruckSelect={setSelectedTruck} />
              {selectedTruck && <TruckDetails truck={selectedTruck} onClose={() => setSelectedTruck(null)} />}
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
    </div>
  )
}

