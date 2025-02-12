"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

// Mock notifications for demonstration
const mockNotifications = [
  { id: 1, message: "Driver John Doe has completed delivery for Order #5678" },
  { id: 2, message: "Driver Jane Smith has started delivery for Order #9012" },
  { id: 3, message: "Driver Bob Johnson is now available" },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New notification at ${new Date().toLocaleTimeString()}`,
      }
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 30000) // Add a new notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="bg-muted p-2 rounded-md text-sm">
              {notification.message}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

