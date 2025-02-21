import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, User, Package, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export function TruckStatus({ truckId }) {
  const [truck, setTruck] = useState({});
  useEffect(() => {
    axios
      .get("/api/trucks/" + truckId)
      .then((response) => {
        setTruck(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [truckId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Truck Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {truckId ? (
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="font-medium">Truck ID:</dt>
            <dd>TRK-{truck?.id}</dd>
            <dt className="font-medium">License Plate:</dt>
            <dd>{truck?.license_plate}</dd>
            <dt className="font-medium">Model:</dt>
            <dd>Volvo FH16</dd>
            <dt className="font-medium">Capacity:</dt>
            <dd>20,000 kg</dd>
            <dt className="font-medium">Current Status:</dt>
            <dd>
              {truck?.status === "free" ? (
                <Badge variant="success">Free</Badge>
              ) : (
                <Badge variant="destructive">Busy</Badge>
              )}
            </dd>
          </dl>
        ) : (
          <div>Assigned Truck Not Found</div>
        )}
      </CardContent>
    </Card>
  );
}
