"use client";

import DriverDashboard from "./dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DriversPage() {
  return (
    <SidebarProvider>
      <DriverDashboard />
    </SidebarProvider>
  );
}
