"use client";
import { Link, useLocation } from "react-router-dom";
import { Package, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Building } from "lucide-react";

const navItems = [
  { icon: Package, label: "Orders", href: "/logistic-orders" },
  { icon: Building, label: "City", href: "/logistic-cities" },
  {
    icon: Building2,
    label: "Service Centers",
    href: "/logistic-service-centers",
  },
  {
    icon: Truck,
    label: "Truck & Driver Management",
    href: "/logistic-trucks",
  },
];

export function LogisticSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <div className="border-b px-4 py-2">
          <h1 className="text-xl font-bold text-primary">Logistic Dashboard</h1>
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
                    pathname === item.href &&
                      "bg-muted font-semibold text-primary"
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
  );
}
