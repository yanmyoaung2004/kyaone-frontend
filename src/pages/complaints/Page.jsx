import { useState } from "react";
import { Complaints } from "../../components/Sales/Complaint";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("all");
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-black font-bold mb-5">
        Customer Complaints
      </h1>

      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by customer name..."
          className="w-[300px] bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          defaultValue="all"
          className="ml-2"
          onValueChange={(value) => setFilteredStatus(value)}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Complaints searchQuery={searchQuery} filteredStatus={filteredStatus} />
    </div>
  );
}
