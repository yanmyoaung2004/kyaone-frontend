import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomerList({ complaints, changeOrder, selectedId }) {
  return (
    <div className="h-[600px] overflow-y-auto pr-2 scrollbar-hide scroll-smooth">
      <ul className="space-y-4">
        {complaints.map((complaint) => (
          <li
            key={complaint.id}
            onClick={() => changeOrder(complaint.id)}
            className={`flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all ${
              selectedId === complaint.id ? "bg-gray-200 hover:bg-gray-300" : ""
            }`}
          >
            <Avatar>
              <AvatarImage
                // src={complaint.customer.image || ""}
                alt={complaint.customer.user.name}
              />
              <AvatarFallback>
                {complaint.customer.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{complaint.customer.user.name}</p>
              <p className="mt-1 text-sm text-gray-500">
                {complaint.customer.user.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
