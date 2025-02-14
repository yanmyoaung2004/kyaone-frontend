"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router";
import { BadgeAlert } from "lucide-react";
import SideBar from "../../pages/DriversApp/SideBar";
import Header from "../../pages/DriversApp/Header";
import { useEffect } from "react";

// Mock data for the table
const mockIssues = [
  {
    id: 1,
    description: "Late delivery",
    orderId: 1001,
    driverId: 5001,
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    description: "Wrong item received",
    orderId: 1002,
    driverId: 5002,
    priority: "medium",
    status: "inprogress",
  },
  {
    id: 3,
    description: "Driver was rude",
    orderId: 1003,
    driverId: 5003,
    priority: "low",
    status: "resolved",
  },
  // Add more mock data as needed
];

// Mock data for orders
const mockOrders = [
  { id: 1001, display: "Order #1001" },
  { id: 1002, display: "Order #1002" },
  { id: 1003, display: "Order #1003" },
  // Add more mock orders as needed
];

export default function EscalatedIssues() {
  const [issues, setIssues] = useState(mockIssues);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [newIssue, setNewIssue] = useState({
    description: "",
    priority: "",
    status: "",
    orderId: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedIssues = issues
    .filter(
      (issue) =>
        (filterPriority === "all" || issue.priority === filterPriority) &&
        (filterStatus === "all" || issue.status === filterStatus)
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleCreateIssue = () => {
    const newId = Math.max(...issues.map((issue) => issue.id)) + 1;
    const createdIssue = {
      ...newIssue,
      id: newId,
      driverId: Math.floor(5000 + Math.random() * 1000), // Random driver ID for this example
      orderId: Number.parseInt(newIssue.orderId),
    };
    setIssues([...issues, createdIssue]);
    setIsModalOpen(false);
    setNewIssue({ description: "", priority: "", status: "", orderId: "" });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "inprogress":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <SideBar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <Header currentTime={currentTime} />
        <div className="container mx-auto p-4 bg-white mt-6 max-w-6xl rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Escalated Issues</h1>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Issue
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Escalated Issue</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      value={newIssue.description}
                      onChange={(e) =>
                        setNewIssue({
                          ...newIssue,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select
                      value={newIssue.priority}
                      onValueChange={(value) =>
                        setNewIssue({ ...newIssue, priority: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newIssue.status}
                      onValueChange={(value) =>
                        setNewIssue({ ...newIssue, status: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="orderId" className="text-right">
                      Order ID
                    </Label>
                    <Select
                      value={newIssue.orderId}
                      onValueChange={(value) =>
                        setNewIssue({ ...newIssue, orderId: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select order" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockOrders.map((order) => (
                          <SelectItem
                            key={order.id}
                            value={order.id.toString()}
                          >
                            {order.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateIssue}>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4 mb-4">
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort("id")}>
                      ID{" "}
                      {sortColumn === "id" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-2 h-4 w-4" />
                        ))}
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Driver ID</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.id}</TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>{issue.orderId}</TableCell>
                    <TableCell>{issue.driverId}</TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
