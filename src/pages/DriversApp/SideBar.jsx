import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { MailWarning } from "lucide-react";
import { Link, useLocation } from "react-router";

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <div className="border-b px-4 py-2">
          <h1 className="text-xl font-bold text-primary">Driver Dashboard</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 p-2">
            <Button
              variant="ghost"
              className={`w-full justify-start px-4 py-2 text-left ${
                pathname === "/driver-dashboard" &&
                "bg-muted font-semibold text-primary"
              }`}
            >
              <Link
                to={"/driver-dashboard"}
                className="flex items-center gap-3"
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
          </ul>
          <ul className="space-y-1 p-2">
            <Button
              variant="ghost"
              className={`w-full justify-start px-4 py-2 text-left ${
                pathname === "/driver-escalated" &&
                "bg-muted font-semibold text-primary"
              }`}
            >
              <Link
                to={"/driver-escalated"}
                className="flex items-center gap-3"
              >
                <MailWarning className="mr-2 h-5 w-5" />
                Escalated Issues
              </Link>
            </Button>
          </ul>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
