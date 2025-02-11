import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function CustomerList({ customers }) {
  return (
    <ul className="space-y-4">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <Avatar>
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
