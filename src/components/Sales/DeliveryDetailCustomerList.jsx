import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/avatars/bob.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/avatars/charlie.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "/avatars/diana.jpg",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    avatar: "/avatars/ethan.jpg",
  },
];

export default function DeliveryDetailCustomerList({
  orders,
  changeSelectedOrder,
}) {
  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li
          key={order.id}
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => {
            changeSelectedOrder(order.id);
          }}
        >
          <Avatar>
            <AvatarImage
              src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid"
              alt={order.customer.user.name}
            />
            <AvatarFallback>
              {order.customer.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{order.customer.user.name}</p>
            <p className="text-sm text-gray-500">{order.customer.user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
