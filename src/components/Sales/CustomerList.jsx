import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "/avatars/alice.jpg" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.jpg" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", avatar: "/avatars/charlie.jpg" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", avatar: "/avatars/diana.jpg" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", avatar: "/avatars/ethan.jpg" },
]

export default function CustomerList() {
  return (
    <ul className="space-y-4">
      {customers.map((customer) => (
        <li key={customer.id} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
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
  )
}

