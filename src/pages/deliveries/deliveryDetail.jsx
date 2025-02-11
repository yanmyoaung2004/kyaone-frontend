"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, User } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import DeliveryDetailCustomerList from "@/components/Sales/DeliveryDetailCustomerList";
import OrderDetailProfile from "@/components/Sales/OrderDetailProfile";
import ChatInterface from "@/components/Sales/ChatInterface";
import { useParams } from "react-router-dom";

export default function DeliveryDetail() {
  const { truckId } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [driver, setDriver] = useState();
  const [truck, setTruck] = useState();
  const [truckInfo, setTruckInfo] = useState({
    orderCount: 0,
    status: "pending",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/deliveries/${truckId}`);
      setOrders(res.data.orders);
      setDriver(res.data.driver);
      setTruck(res.data.truck);
      setSelectedOrder(res.data.orders[0]);
      setTruckInfo({
        orderCount: res.data.orders.length,
        status: res.data.orders[0].status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [truckId]); // Added truckId as a dependency

  const changeOrder = (id) => {
    setSelectedOrder(orders.find((o) => o.id === id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Delivery Detail</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Orders
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{truckInfo.orderCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivery Status
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{truckInfo.status}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Driver</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{driver?.user.name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Truck</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{truck?.license_plate}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryDetailCustomerList
              orders={orders}
              changeSelectedOrder={changeOrder}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <Tabs defaultValue="profile">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="profile">
                <OrderDetailProfile selectedOrder={selectedOrder} />
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
