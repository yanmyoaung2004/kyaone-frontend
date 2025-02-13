import { MapPin, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
export default function OrderOverview({ order }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Customer Details</h3>
        <p>{order?.customer?.user?.name}</p>
        <p>{order?.customer?.phone}</p>
        <p>{order?.location?.address}</p>
        <p className="text-sm text-gray-500">
          Order Placed:{" "}
          {moment(order?.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>
    </div>
  );
}
