import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CustomerList({
  changeOrder,
  customerList,
  selectedCustomer,
}) {
  return (
    <div className="h-[600px] overflow-y-auto pr-2 scrollbar-hide scroll-smooth">
      <ul className="space-y-4">
        {customerList.map((customer) => (
          <li
            key={customer.customer_id}
            onClick={() => changeOrder(customer.customer_id)}
            className={`flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all ${
              selectedCustomer.customer_id === customer.customer_id
                ? "bg-gray-200 hover:bg-gray-300"
                : ""
            }`}
          >
            <Avatar>
              <AvatarImage
                // src={complaint.customer.image || ""}
                alt={customer.name}
              />
              <AvatarFallback>
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="mt-1 text-sm text-gray-500">{customer.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
