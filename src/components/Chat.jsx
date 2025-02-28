"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useSelector } from "react-redux";
import echo from "../echo";
import { handleFailureToast } from "../helpers/ToastService";

export default function Chat({ selectedComplaints }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser?.roles.some((role) => role.name === "sale")) return;
    if (currentUser?.roles.some) {
      echo.private(`role.${"sale"}`).listen("MessageSent", (e) => {
        setMessages((prevMessages) => {
          if (
            e.message.sender_id === selectedComplaints.customer.user_id &&
            !prevMessages.some((msg) => msg.id === e.message.id)
          ) {
            return [...prevMessages, e.message];
          }

          return [...prevMessages];
        });
      });
    }
  }, [selectedComplaints]);

  useEffect(() => {
    echo.private(`chat.${currentUser.id}`).listen("MessageSent", (e) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === e.message.id)) {
          return [...prevMessages, e.message];
        }

        return [...prevMessages];
      });
    });
  }, []);

  useEffect(() => {
    if (currentUser?.roles.some((role) => role.name === "sale")) return;
    axios
      .get(`/api/messages/${currentUser.id}`)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        handleFailureToast("Error fetching messages");
      });
  }, []);

  useEffect(() => {
    if (!currentUser?.roles.some((role) => role.name === "sale")) return;
    axios
      .get(`/api/messages/sale/${selectedComplaints.customer.user_id}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data.data);
      })
      .catch((err) => {
        handleFailureToast("Error fetching messages");
      });
  }, [selectedComplaints]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      role: !currentUser.roles.some((role) => role.name === "sale")
        ? "sale"
        : "customer",
      sender_id: currentUser.id,
      receiver_id: currentUser.roles.some((role) => role.name === "sale")
        ? selectedComplaints.customer.user_id
        : null,
      message: newMessage.trim(),
      created_at: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
    try {
      await axios.post("/api/messages", newMsg);
    } catch (error) {
      handleFailureToast("Message sending failed");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px]">
      <h3 className="ps-4 pb-2 text-xl border-b">
        {currentUser.roles.some((role) => role.name === "sale")
          ? selectedComplaints?.customer.user.name
          : "Sale"}
      </h3>
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              currentUser.roles.some((role) => role.name !== message.role)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                currentUser.roles.some((role) => role.name !== message.role)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
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
