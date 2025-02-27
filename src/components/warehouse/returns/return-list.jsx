import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import axios from "axios";
import OrderDetails from "../../../pages/orders/OrderDetials";

export function ReturnList({ orders, refreshList }) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [total, setTotal] = useState(0);
  const [unitpriceId, setUnitPriceId] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onSubmit() {
    console.log(values);
    setOpen(false);
  }

  console.log(orders);

  function onReturnClick(order) {
    console.log(order);
  }

  function markAsReturn() {
    let data = {
      customer_id: selectedOrder?.customer_detail?.id,
      return_id: selectedOrder?.id,
      isReturn: 1,
      return_reason: returnReason,
      payment: "paypal",
      total,
      shipmentInfo: {
        address: selectedOrder?.location?.address,
        state: selectedOrder?.location?.state,
        city: selectedOrder?.location?.city_id?.toString(),
      },
      items: [
        {
          id: productId,
          unitprice_id: unitpriceId,
          quantity,
        },
      ],
    };
    console.log(data);
    axios
      .post("/api/orders", data)
      .then((rep) => {
        setOpen(false);
        refreshList();
      })
      .catch((error) => console.log(error));
  }
  function onProductIdChange(productId) {
    if (!productId) return;
    axios
      .get("/api/products/" + productId)
      .then((rep) => {
        // console.log(rep.data);
        setUnitPriceId(rep.data?.unitprice?.id);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              // onClick={() => onReturnClick(order)}
              // className="cursor-pointer"
            >
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.customer}</TableCell>
              {/* <TableCell>{order?.eta}</TableCell> */}
              <TableCell>{order?.eta}</TableCell>
              <TableCell>
                <Badge variant="outline">{order?.status}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrderDetails
        orderId={selectedOrder?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        callBackOnSuccess={(id) => {
          setOrders(orders.filter((order) => order.id !== id));
        }}
      />
    </div>
  );
}
