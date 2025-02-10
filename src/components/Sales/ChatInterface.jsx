"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const initialMessages = [
  { id: 1, sender: "customer", content: "Hi, I have a question about my recent order.", timestamp: "10:00 AM" },
  {
    id: 2,
    sender: "agent",
    content: "Hello! I'd be happy to help. Can you please provide your order number?",
    timestamp: "10:02 AM",
  },
  { id: 3, sender: "customer", content: "Sure, it's order #12345.", timestamp: "10:05 AM" },
  {
    id: 4,
    sender: "agent",
    content:
      "Thank you. I can see that your order #12345 is currently in transit and is expected to be delivered tomorrow. Is there anything specific you'd like to know about it?",
    timestamp: "10:07 AM",
  },
  {
    id: 5,
    sender: "customer",
    content: "That's great, thanks! I just wanted to confirm the delivery date. Do you know what time it might arrive?",
    timestamp: "10:10 AM",
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "agent",
          content: newMessage.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg ${message.sender === "agent" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t p-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

