import { Badge } from "@/components/ui/badge";

export default function EscalationList({
  escalations,
  changeIssue,
  selectedId,
}) {
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Open":
        return "outline";
      case "In Progress":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto pr-4 custom-scrollbar">
      <ul className="space-y-4">
        {escalations.map((escalation) => (
          <li
            onClick={() => {
              changeIssue(escalation.id);
            }}
            key={escalation.id}
            className={`flex justify-between items-center space-x-4 cursor-pointer hover:bg-gray-200 p-4 rounded-lg transition-all ${
              selectedId === escalation.id
                ? "bg-gray-200 hover:bg-gray-300"
                : ""
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">
                {escalation.driver.user.name}
              </p>
              {/* <p className="text-sm text-gray-600">
                {escalation.description.slice(0, 25)}
              </p> */}
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityVariant(escalation.priority)}>
                {escalation.priority}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
