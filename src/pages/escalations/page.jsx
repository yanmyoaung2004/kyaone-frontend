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

  const changeIssue = (id) => {
    setSelectedIssues(issues.find((c) => c.id === id));
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/escalated-issues`);
      setIssues(res.data);
      setSelectedIssues(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Escalations</h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Input placeholder="Search escalations..." className="w-[300px]" />
          <Select>
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
            {issues.length > 0 && (
              <EscalationList
                escalations={issues}
                changeIssue={changeIssue}
                selectedId={selectedIssues.id}
              />
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Escalation Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedIssues && (
              <EscalationDetails selectedIssues={selectedIssues} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
