"use client"
import { Link, useLocation } from "react-router-dom"
import { Home, Package, Truck, MessageSquare, AlertTriangle, BarChart2, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Package, label: "Orders", href: "/orders" },
  { icon: Truck, label: "Deliveries", href: "/deliveries" },
  { icon: MessageSquare, label: "Customer Interaction", href: "/customers" },
  { icon: AlertTriangle, label: "Escalations", href: "/escalations" },
  { icon: BarChart2, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader/>
      <SidebarContent>
        <div className="border-b px-4 py-2" >
          <h1 className="text-xl font-bold text-primary">Sales Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 p-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-muted font-semibold text-primary",
                  )}
                >
                  <Link to={item.href} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}

