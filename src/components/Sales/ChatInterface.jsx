"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleFailureToast } from "../../helpers/ToastService";

// const initialMessages = [
//   { id: 1, sender: "customer", content: "Hi, I have a question about my recent order.", timestamp: "10:00 AM" },
//   { id: 2, sender: "agent", content: "Hello! I'd be happy to help. Can you please provide your order number?", timestamp: "10:02 AM" },
//   { id: 3, sender: "customer", content: "Sure, it's order #12345.", timestamp: "10:05 AM" },
//   { id: 4, sender: "agent", content: "Thank you. I can see that your order #12345 is currently in transit and is expected to be delivered tomorrow.", timestamp: "10:07 AM" },
// ];

export default function ChatInterface({ selectedCustomer, isCustomer }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedReceiverId = selectedCustomer?.customer_id;

  // console.log(selectedCustomer);

  const fetchCustomer = (customer_id) => {
    axios
      .get(`/api/messages/${customer_id}`)
      .then((res) => {
        const messages = res.data.data; // Expecting an array of messages
        setMessages((prevMessages) => [
          ...prevMessages,
          ...messages.map((msg) => ({
            id: msg.id,
            sender: msg.sender_id === currentUser.id ? "agent" : "customer",
            content: msg.message,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        ]);
      })
      .catch((err) => console.error("Error fetching customer messages:", err));
  };

  const fetchSale = () => {
    if (!selectedReceiverId) {
      console.warn("selectedReceiverId is undefined.");
      return;
    }
    console.log(selectedReceiverId);

    axios
      .get(`/api/messages/sale/${selectedReceiverId}`)
      .then((res) => {
        const messages = res.data.data;

        const filteredMessages = messages.filter(
          (msg) =>
            msg.sender_id === selectedReceiverId || msg.role === "customer"
        );

        setMessages((prevMessages) => [
          // ...prevMessages,
          ...filteredMessages.map((msg) => ({
            id: msg.id,
            sender: msg.sender_id === selectedReceiverId ? "customer" : "agent",
            content: msg.message,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        ]);
      })
      .catch((err) => console.error("Error fetching customer messages:", err));
  };

  useEffect(() => {
    if (!currentUser.roles.some((role) => role.name === "sale")) return;
    console.log("sale listen");
    fetchSale();
    const channel = window.Echo.channel(`sent-message.sale`);

    channel.listen(".message.sent", (data) => {
      console.log("New message received:", data);
      if (data.sender_id === selectedCustomer?.customer_id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: data.id,
            sender: data.sender_id === currentUser.id ? "agent" : "customer",
            content: data.message,
            timestamp: new Date(data.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    });

    return () => {
      channel.stopListening(".message.sent");
    };
  }, [selectedCustomer]);

  useEffect(() => {
    if (!currentUser.roles.some((role) => role.name === "customer")) return;
    console.log("customer listen");
    fetchCustomer(currentUser.id);
    const channel = window.Echo.channel(
      `customer-sent-message.${currentUser.id}`
    );

    channel.listen(".customer.message.sent", (data) => {
      console.log("New message received:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.id,
          sender: data.sender_id === currentUser.id ? "agent" : "customer",
          content: data.message,
          timestamp: new Date(data.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      channel.stopListening(".customer.message.sent");
    };
  }, [currentUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "agent",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
    // console.log(currentUser);

    try {
      await axios
        .post("/api/messages", {
          sender_id: currentUser.id,
          receiver_id: !isCustomer && selectedReceiverId,
          role: !currentUser.roles.some((role) => role.name === "sale")
            ? "sale"
            : "customer", ///receiver role
          message: newMessage.trim(),
        })
        .then((res) => console.log(res));
    } catch (error) {
      console.error("Error sending message:", error);
      handleFailureToast("Message sending failed");
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <h3 className="ps-4 pb-2 text-xl border-b">Sale</h3>
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              message.sender === "agent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "agent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </ScrollArea>
      <div className="border-t p-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
