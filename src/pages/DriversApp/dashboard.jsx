import { Bell, LayoutDashboard, CheckCheck, Ban } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import { CardDescription } from "@/components/ui/card";
import { Package, Truck } from "lucide-react";

import { ActiveDeliveriesList } from "../../components/Drivers/active-deliveries-list";
import { TruckStatus } from "../../components/Drivers/truck-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import axios from "axios";
import OrderDetailsModal from "../../components/Drivers/order-details-modal";
import moment from "moment/moment";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import Header from "./Header";

function MetricCard({ icon: Icon, title, value }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={`h-4 w-4 text-muted-foreground ${
            title == "Deliveries Cancelled" ? "text-red-400" : "text-green-600"
          } `}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function DriverDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [driver, setDriver] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderCount, setOrderCount] = useState(0);
  const [truckId, setTruckId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    toast({
      title: "Order marked as complete",
    });
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios
      .get(`api/dirvers/${currentUser.id}`)
      .then((response) => {
        setDriver(response.data);
        let trucks = response.data?.order_assing_truck;
        if (trucks?.length > 0) {
          setTruckId(trucks[0].truck_id);
          axios
            .get("/api/truck/" + trucks[0].truck_id + "/orders")
            .then((response) => {
              setOrders(response.data.orders);
              setOrderCount(response.data.order_count);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentTime={currentTime} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  icon={Package}
                  title="Total Deliveries"
                  value={orderCount}
                />{" "}
                <MetricCard
                  icon={CheckCheck}
                  title="Deliveries Completed"
                  value={
                    orders?.filter((order) => order.status === "completed")
                      .length
                  }
                />
                <MetricCard
                  icon={Ban}
                  title="Deliveries Cancelled"
                  value={
                    orders?.filter((order) => order.status === "cancelled")
                      .length
                  }
                />
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Active Deliveries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActiveDeliveriesList
                      setIsModalOpen={setIsModalOpen}
                      orders={orders}
                      setSelectedOrder={setSelectedOrder}
                    />
                  </CardContent>
                </Card>
                {truckId && <TruckStatus truckId={truckId} />}
              </div>
              <div className="container mx-auto ">
                <header className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <switch id="driver-mode" />
                  </div>
                </header>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Deliveries</CardTitle>
                    <CardDescription>
                      Your latest completed deliveries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders
                        ?.filter((order) => order?.status == "completed")
                        ?.map((order, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-muted rounded-lg"
                          >
                            <div>
                              <p className="font-medium">Order #{order?.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {order?.location?.address}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                $ {order?.total_price}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Completed at{" "}
                                {moment(order?.updated_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    You have 3 pending deliveries
                  </p>
                  <Button size="lg">
                    <Truck className="mr-2 h-4 w-4" />
                    Start Next Delivery
                  </Button>
                </div>
              </div>
            </>
          </div>
        </main>
      </div>
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        customer={selectedOrder?.customer}
        products={selectedOrder?.products}
        setRefresh={setRefresh}
      />
    </div>
  );
}
