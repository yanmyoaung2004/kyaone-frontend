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

export default function EscalationsPage() {
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
            <EscalationList />
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
