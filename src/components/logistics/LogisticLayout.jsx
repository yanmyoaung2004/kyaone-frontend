import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Header from "../../components/Sales/Header";
import { LogisticSidebar } from "./LogisticSidebar";

export const metadata = {
  title: "Logistic Management System",
  description: "Efficient management of warehouse operations",
};

export default function LogisticLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <LogisticSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
