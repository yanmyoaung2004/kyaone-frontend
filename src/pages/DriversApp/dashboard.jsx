import {
  Bell,
  MessageSquare,
  LayoutDashboard,
  FileWarning,
  CircleDollarSign,
  MapPin,
  Clock,
  Star,
  CheckCheck,
  LucideInbox,
  Ban,
} from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDescription } from "@/components/ui/card";
import { Package, AlertTriangle, Truck } from "lucide-react";

import { ActiveDeliveriesList } from "../../components/Drivers/active-deliveries-list";
import { TruckStatus } from "../../components/Drivers/truck-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDriver, mockOrders, mockTruckStatus } from "./mockData";
import { ComplaintsManagement } from "../../components/Drivers/complaints-management";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import OrderDetailsModal from "../../components/Drivers/order-details-modal";
import moment from "moment/moment";
import { useToast } from "@/hooks/use-toast";

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
  const [currentView, setCurrentView] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [driver, setDriver] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderCount, setOrderCount] = useState(0);
  const [truckId, setTruckId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    toast({
      title: "Order marked as complete",
    });
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios
      .get("/api/dirvers/1")
      .then((response) => {
        setDriver(response.data);
        let trucks = response.data?.order_assing_truck;
        if (trucks?.length > 0) {
          setTruckId(trucks[0].truck_id);

          axios
            .get("/api/truck/" + trucks[0].truck_id + "/orders")
            .then((response) => {
              console.log(response.data);
              setOrders(response.data.orders);
              setOrderCount(response.data.order_count);
            })
            .catch((error) => {
              console.error(error);
            });
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}

      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarContent>
          <div className="border-b px-4 py-2">
            <h1 className="text-xl font-bold text-primary">
              Warehouse Dashboard
            </h1>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1 p-2">
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-2 text-left ${
                  currentView === "dashboard" &&
                  "bg-muted font-semibold text-primary"
                }`}
                onClick={() => setCurrentView("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              {/* <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-2 text-left ${
                  currentView === "complaints" &&
                  "bg-muted font-semibold text-primary"
                }`}
                onClick={() => setCurrentView("complaints")}
              >
                <FileWarning className="mr-2 h-5 w-5" />
                Complaints
              </Button> */}
            </ul>
          </nav>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md border-b p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-8 w-8 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/warehouse-admin"}>Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search orders, customers, or issues"
                className="pl-8 pr-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentTime.toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {currentView === "dashboard" ? (
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
                  <TruckStatus truckId={truckId}></TruckStatus>
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
                                <p className="font-medium">
                                  Order #{order?.id}
                                </p>
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
            ) : (
              <ComplaintsManagement />
            )}
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
