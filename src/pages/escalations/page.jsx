import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EscalationList from "../../components/Sales/EscalationList";
import EscalationDetails from "../../components/Sales/EscalationDetails";
import { useState } from "react";
import { X } from "lucide-react";
import { Search } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

const escalations = [
  {
    id: 1,
    customer: "Alice Johnson",
    issue: "Late Delivery",
    priority: "High",
    status: "Open",
  },
  {
    id: 2,
    customer: "Bob Smith",
    issue: "Wrong Item",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    customer: "Charlie Brown",
    issue: "Damaged Package",
    priority: "High",
    status: "Open",
  },
  {
    id: 4,
    customer: "Diana Prince",
    issue: "Billing Dispute",
    priority: "Low",
    status: "Resolved",
  },
  {
    id: 5,
    customer: "Ethan Hunt",
    issue: "Missing Item",
    priority: "Medium",
    status: "In Progress",
  },
];

export default function EscalationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPriority, setSearchPriority] = useState("");
  // const [escalations, setEscalations] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setSearchPriority(value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const filterEscalations = escalations.filter((escalation) => {
    const customerMatch = escalation.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const prioritymatch =
      searchPriority === "all" ||
      escalation.priority.toLowerCase().includes(searchPriority.toLowerCase());

    return searchPriority === ""
      ? customerMatch
      : customerMatch && prioritymatch;
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("url");

  //       if (!res.ok) {
  //         console.error("Error fetching data");
  //       }

  //       const data = res.data;

  //       setEscalations(data.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Escalations</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="pl-8 pr-10 py-4 rounded-md"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>New Escalation</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Escalated Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <EscalationList escalations={filterEscalations} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Escalation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <EscalationDetails />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
