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
      case "New":
        return <AlertCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  console.log(complaint);
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
                  {complaint.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {complaint.customerName}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  {complaint.email}
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Subject
              </h4>
              <p className="text-md font-medium">{complaint.subject}</p>
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
                  variant="secondary"
                  className={`${getStatusColor(
                    complaint.status
                  )} flex items-center space-x-1 text-xs px-2 py-1`}
                >
                  {getStatusIcon(complaint.status)}
                  <span>{complaint.status}</span>
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <div className="flex justify-between w-full">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
            <div className="space-x-2">
              <Button
                onClick={() => onStatusUpdate("In Progress")}
                variant={
                  complaint.status === "In Progress" ? "default" : "outline"
                }
              >
                In Progress
              </Button>
              <Button
                onClick={() => onStatusUpdate("Resolved")}
                variant={
                  complaint.status === "Resolved" ? "default" : "outline"
                }
              >
                Resolved
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
