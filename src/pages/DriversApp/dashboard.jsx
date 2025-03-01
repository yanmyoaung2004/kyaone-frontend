import { CheckCheck, Ban } from "lucide-react";
import { useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { Package, Truck } from "lucide-react";

import { ActiveDeliveriesList } from "../../components/Drivers/active-deliveries-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import axios from "axios";
import OrderDetailsModal from "../../components/Drivers/order-details-modal";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import { Badge } from "@/components/ui/badge";

import Header from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToSpecificDateTime } from "../../helpers/services";
import { X } from "lucide-react";

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

function getCompletedKeys(mapObject) {
  let completedKeys = [];

  for (const [key, valueArray] of Object.entries(mapObject)) {
    if (Array.isArray(valueArray) && valueArray.length > 0) {
      const allComplete = valueArray.every(
        (item) => item.order.status === "completed"
      );

      if (allComplete) {
        completedKeys.push(key);
      }
    }
  }

  return completedKeys;
}

export default function DriverDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [routes, setRoutes] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(false);
  const [selectedOrderList, setSelectedOrderList] = useState([]);
  const [completedKeys, setCompletedKeys] = useState([]);
  const [completedShow, setCompletedShow] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`api/driver/orderassign/${currentUser.id}`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSameRoute = async () => {
    try {
      const res = await axios.get(
        `api/orders/truck/assigned/${currentUser.id}`
      );
      console.log(res.data);
      setCompletedKeys(getCompletedKeys(res.data));
      console.log(completedKeys);
      setRoutes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(completedKeys);

  useEffect(() => {
    fetchData();
    fetchSameRoute();
  }, [refresh]);

  const seeRouteDetail = (orderList) => {
    setCompletedShow(false);
    setSelectedRoute(true);
    setSelectedOrderList(orderList);
  };

  const seeCompleteDetail = (orderList) => {
    setSelectedRoute(false);
    setCompletedShow(true);
    setSelectedOrderList(orderList);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  icon={Package}
                  title="Total Deliveries"
                  value={orders.length}
                />{" "}
                <MetricCard
                  icon={CheckCheck}
                  title="Deliveries Completed"
                  value={
                    orders?.filter(
                      (order) => order.order.status === "completed"
                    ).length
                  }
                />
                <MetricCard
                  icon={Ban}
                  title="Deliveries Cancelled"
                  value={
                    orders?.filter(
                      (order) => order.order.status === "cancelled"
                    ).length
                  }
                />
              </div>

              <div className="mt-5">
                {!selectedRoute && (
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Routes List</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center">No.</TableHead>
                            <TableHead className="text-center">
                              Driver Name
                            </TableHead>
                            <TableHead className="text-center">Truck</TableHead>
                            <TableHead className="text-center">City</TableHead>
                            <TableHead className="text-center">
                              No. of Orders
                            </TableHead>
                            <TableHead className="text-center">
                              Assigned Date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.keys(routes).length === 0 ? (
                            <TableRow className="text-center cursor-pointer">
                              <TableCell>No Order</TableCell>
                            </TableRow>
                          ) : (
                            Object.entries(routes).map(
                              ([groupKey, orderList]) => {
                                return (
                                  completedKeys.some(
                                    (key) => key !== groupKey
                                  ) && (
                                    <TableRow
                                      onClick={() => {
                                        seeRouteDetail(orderList);
                                      }}
                                      key={groupKey}
                                      className="text-center cursor-pointer"
                                    >
                                      <TableCell>
                                        {groupKey.slice(0, 9)}
                                      </TableCell>
                                      <TableCell>
                                        {orderList[0].driver.user.name}
                                      </TableCell>
                                      <TableCell>
                                        {orderList[0].truck.license_plate}
                                      </TableCell>
                                      <TableCell>
                                        {orderList[0].order.location.city.name}
                                      </TableCell>
                                      <TableCell>{orderList.length}</TableCell>
                                      <TableCell>
                                        {formatToSpecificDateTime(
                                          orderList[0].created_at
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  )
                                );
                              }
                            )
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
                {selectedRoute && (
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle className="flex w-full justify-between">
                        <span>Orders List</span>
                        <span
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setSelectedRoute(false);
                          }}
                        >
                          <X size={22} />
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ActiveDeliveriesList
                        setIsModalOpen={setIsModalOpen}
                        orders={selectedOrderList}
                        setSelectedOrder={setSelectedOrder}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="container mx-auto ">
                <header className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <switch id="driver-mode" />
                  </div>
                </header>
                {completedShow && (
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle className="flex w-full justify-between">
                        <span>Orders List</span>
                        <span
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setCompletedShow(false);
                          }}
                        >
                          <X size={22} />
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ActiveDeliveriesList
                        setIsModalOpen={setIsModalOpen}
                        orders={selectedOrderList}
                        setSelectedOrder={setSelectedOrder}
                      />
                    </CardContent>
                  </Card>
                )}
                {!completedShow && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Recent Deliveries Routes</CardTitle>
                      <CardDescription>
                        Your latest completed delivey routes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-center">No.</TableHead>
                              <TableHead className="text-center">
                                Driver Name
                              </TableHead>
                              <TableHead className="text-center">
                                Truck
                              </TableHead>
                              <TableHead className="text-center">
                                City
                              </TableHead>
                              <TableHead className="text-center">
                                No. of Orders
                              </TableHead>
                              <TableHead className="text-center">
                                Assigned Date
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.keys(routes).length === 0 ? (
                              <TableRow className="text-center cursor-pointer">
                                <TableCell>No Order</TableCell>
                              </TableRow>
                            ) : (
                              Object.entries(routes).map(
                                ([groupKey, orderList]) => {
                                  return (
                                    completedKeys.some(
                                      (key) => key === groupKey
                                    ) && (
                                      <TableRow
                                        onClick={() => {
                                          seeCompleteDetail(orderList);
                                        }}
                                        key={groupKey}
                                        className="text-center cursor-pointer"
                                      >
                                        <TableCell>
                                          {groupKey.slice(0, 9)}
                                        </TableCell>

                                        <TableCell>
                                          {orderList[0].driver.user.name}
                                        </TableCell>
                                        <TableCell>
                                          {orderList[0].truck.license_plate}
                                        </TableCell>
                                        <TableCell>
                                          {
                                            orderList[0].order.location.city
                                              .name
                                          }
                                        </TableCell>
                                        <TableCell>
                                          {orderList.length}
                                        </TableCell>
                                        <TableCell>
                                          {formatToSpecificDateTime(
                                            orderList[0].created_at
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  );
                                }
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder.order}
          customer={selectedOrder?.customer}
          products={selectedOrder?.products}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}
