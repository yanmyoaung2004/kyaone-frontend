import Link from "next/link"
import { Home, Package, AlertCircle, BarChart2, RotateCcw, Settings, Truck } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 bg-white text-gray-800 p-4 border-r">
      <nav className="space-y-2">
        <Link href="/warehouse-dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/warehouse-orders" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Package size={20} />
          <span>Orders</span>
        </Link>
        <Link href="/warehouse-complaints" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <AlertCircle size={20} />
          <span>Complaints</span>
        </Link>
        <Link href="/warehouse-stock" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <BarChart2 size={20} />
          <span>Stock Management</span>
        </Link>
        <Link href="/warehouse-returns" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <RotateCcw size={20} />
          <span>Returns</span>
        </Link>
        <Link href="/warehouse-trucks" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Truck size={20} />
          <span>Truck Management</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

