import { PackageSearch } from "lucide-react";
import {
  Home,
  Package,
  AlertCircle,
  BarChart2,
  RotateCcw,
  Settings,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white text-black p-4">
      <nav className="space-y-2">
        <Link
          to="/warehouse-dashboard"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/warehouse-orders"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <Package size={20} />
          <span>Orders</span>
        </Link>
        <Link
          to="/warehouse-complaints"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <AlertCircle size={20} />
          <span>Complaints</span>
        </Link>
        <Link
          to="/warehouse-stock"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <BarChart2 size={20} />
          <span>Stock Management</span>
        </Link>
        <Link
          to="/product-management"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <PackageSearch size={20} />
          <span>Product Management</span>
        </Link>
        <Link
          to="/warehouse-returns"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <RotateCcw size={20} />
          <span>Returns</span>
        </Link>
        <Link
          to="/warehouse-trucks"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <Truck size={20} />
          <span>Truck Management</span>
        </Link>
        <Link
          to="/warehouse-setting"
          className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
