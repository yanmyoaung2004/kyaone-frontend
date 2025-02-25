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
import { useEffect, useState } from "react";
import axios from "axios";

export default function EscalationsPage() {
  const [issues, setIssues] = useState([]);
  const [allSelectedIssues, setAllSelectedIssues] = useState();
  const [selectedIssues, setSelectedIssues] = useState();
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [truck, setTruck] = useState();
  const changeIssue = (id) => {
    setSelectedIssues(issues.find((c) => c.id === id));
  };

  useEffect(() => {
    axios
      .get(`/api/orders/${selectedIssues?.order_id}/truck-driver`)
      .then((res) => {
        setTruck(res.data.order_assign_truck.truck);
      });
  }, [selectedIssues]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/escalated-issues`);
      setIssues(res.data);
      setSelectedIssues(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIssues = issues.filter(
    (issue) =>
      issue.priority === filterPriority ||
      (filterPriority === "all" &&
        issue.driver.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Escalations</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search escalations..."
            className="w-[300px] bg-white"
          />
          <Select
            onValueChange={setFilterPriority}
            defaultValue={filterPriority}
          >
            <SelectTrigger className="w-[180px] bg-white">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Escalated Issues</CardTitle>
          </CardHeader>
          <CardContent>
            {issues.length > 0 && (
              <EscalationList
                escalations={filteredIssues}
                changeIssue={changeIssue}
                selectedId={selectedIssues.id}
              />
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl font-bold text-gray-900">
                Escalation Details
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedIssues && (
              <EscalationDetails
                selectedIssues={selectedIssues}
                truck={truck}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
