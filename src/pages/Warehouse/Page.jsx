import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  AlertCircle,
  BarChart2,
  RotateCcw,
  Truck,
  FileText,
} from "lucide-react";
import { Truck as TruckChart } from "../Truck";
import { Stock } from "../Stock";
import { LowStock } from "../LowStock";

export default function Page() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Complaints
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Returns
            </CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Truck className="h-4 w-4" />
            Assign Truck to Orders
          </Button>
          <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4" />
            Process Complaints
          </Button>
          <Button className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700">
            <BarChart2 className="h-4 w-4" />
            Check Stock Levels
          </Button>
          <Button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700">
            <RotateCcw className="h-4 w-4" />
            View Pending Returns
          </Button>
        </div>
      </div>
      <div className="space-y-6 h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-full gap-20  justify-between">
          <div>
            <Stock />
          </div>
          <div>
            <LowStock />
          </div>
          <div>
            <TruckChart />
          </div>
        </div>
      </div>
    </div>
  );
}
