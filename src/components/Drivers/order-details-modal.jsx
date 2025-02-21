"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OrderHeader from "./order-header";
import OrderOverview from "./order-overview";
import ProductsTable from "./products-table";
// import IssuesComplaints from "./issues-complaints";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { handleSuccessToast } from "../../helpers/ToastService";

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  customer,
  products,
  setRefresh,
}) {
  const { toast } = useToast();

  const [orderStatus, setOrderStatus] = useState("In Transit");
  const markAsComplete = () => {
    axios
      .post(`/api/orders/${order.id}/status`, {
        status: "completed",
      })
      .then((response) => {
        console.log(response.data);
        handleSuccessToast("Order Completed");
        onClose();
        setRefresh(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <div className="max-h-[80vh] overflow-y-auto">
          <OrderHeader
            order={order}
            status={orderStatus}
            onClose={onClose}
            markAsComplete={markAsComplete}
          />
          <div className="p-6 space-y-6">
            <OrderOverview order={order} />
            <ProductsTable products={products} order={order} />
            {order.isReturn ? (
              <div className="mt-6 p-4 border rounded-md flex flex-col space-y-2">
                <h3 className="font-semibold mb-2">Return Order Details</h3>
                <p>
                  Original Order:{" "}
                  <a
                    href={`#${order?.return_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    #{order?.return_id}
                  </a>
                </p>
                <p>Reason for Return: {order.return_reason}</p>
              </div>
            ) : null}
            {/* <IssuesComplaints /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
