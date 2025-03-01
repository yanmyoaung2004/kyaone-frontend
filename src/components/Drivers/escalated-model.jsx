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
import SideBar from "../../pages/DriversApp/SideBar";
import Header from "../../pages/DriversApp/Header";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleSuccessToast } from "../../helpers/ToastService";

export default function EscalatedIssues() {
  const [issues, setIssues] = useState([]);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [routes, setRoutes] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [newIssue, setNewIssue] = useState({
    description: "",
    priority: "",
    route_key: "",
    driver_id: currentUser.id,
  });

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `api/orders/truck/assigned/${currentUser.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(
        `api/orders/truck/assigned/${currentUser.id}`
      );
      setRoutes(res.data);
      // sert
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchOrder();
  }, []);

  useEffect(() => {
    axios
      .get(`api/orders`)
      .then((resp) => {
        setOrders(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/escalated-issues")
      .then((resp) => {
        setIssues(resp.data);
      })
      .catch((err) => console.log(err));
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
    axios
      .post("/api/escalated-issues", newIssue)
      .then((res) => {
        setIssues([...issues, res.data.data]);
        handleSuccessToast("Issue created successfully");
      })
      .catch((err) => console.error(err));

    setIsModalOpen(false);
    setNewIssue({ description: "", priority: "", route_key: "" });
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
                    <Label htmlFor="route_key" className="text-right">
                      Routes
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewIssue({ ...newIssue, route_key: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select order" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes &&
                          Object.entries(routes).map(
                            ([groupKey, orderList]) => {
                              return (
                                <SelectItem key={groupKey} value={groupKey}>
                                  {groupKey.slice(0, 9)}
                                </SelectItem>
                              );
                            }
                          )}
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
                  <TableHead>Route </TableHead>

                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.id}</TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>{issue.city}</TableCell>
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
