import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, AlertCircle, CheckCircle, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ComplaintDetailsModal({ complaint, onClose, onStatusUpdate }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Complaint Details
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${complaint.customerName}`}
                />
                <AvatarFallback>
                  {complaint.customer?.user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {complaint.customer?.user?.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  {complaint.customer?.user?.email}
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Subject
              </h4>
              <p className="text-md font-medium">{complaint.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Description
              </h4>
              <p className="text-md whitespace-pre-wrap">
                {complaint.description}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <div className="flex ">
                <Badge
                  className={
                    complaint.status === "open"
                      ? "bg-blue-500"
                      : complaint.status === "in_progress"
                      ? "bg-yellow-500"
                      : complaint.status === "resolved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                >
                  {complaint.status === "open"
                    ? "Open"
                    : complaint.status === "in_progress"
                    ? "In Progress"
                    : complaint.status === "resolved"
                    ? "Resolved"
                    : "Closed"}
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <div className="flex justify-start items-center w-full">
            <span className="mr-2 text-sm font-medium">Update Status : </span>
            <div>
              <Select
                onValueChange={(value) => onStatusUpdate(value)}
                defaultValue={complaint.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
