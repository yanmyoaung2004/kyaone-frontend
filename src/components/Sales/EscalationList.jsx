import { Badge } from "@/components/ui/badge"

const escalations = [
  { id: 1, customer: "Alice Johnson", issue: "Late Delivery", priority: "High", status: "Open" },
  { id: 2, customer: "Bob Smith", issue: "Wrong Item", priority: "Medium", status: "In Progress" },
  { id: 3, customer: "Charlie Brown", issue: "Damaged Package", priority: "High", status: "Open" },
  { id: 4, customer: "Diana Prince", issue: "Billing Dispute", priority: "Low", status: "Resolved" },
  { id: 5, customer: "Ethan Hunt", issue: "Missing Item", priority: "Medium", status: "In Progress" },
]

export default function EscalationList() {
  return (
    <ul className="space-y-4">
      {escalations.map((escalation) => (
        <li
          key={escalation.id}
          className="flex items-center justify-between space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <div>
            <p className="font-medium">{escalation.customer}</p>
            <p className="text-sm text-gray-500">{escalation.issue}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                escalation.priority === "High"
                  ? "destructive"
                  : escalation.priority === "Medium"
                    ? "default"
                    : "secondary"
              }
            >
              {escalation.priority}
            </Badge>
            <Badge
              variant={
                escalation.status === "Open" ? "outline" : escalation.status === "In Progress" ? "default" : "secondary"
              }
            >
              {escalation.status}
            </Badge>
          </div>
        </li>
      ))}
    </ul>
  )
}

