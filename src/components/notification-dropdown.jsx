"use client";

import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatToSpecificDateTime } from "../helpers/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleNotiToast } from "../helpers/ToastService";

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const icons = {
    general: <span className="text-xl">🔔</span>,
    error: <span className="text-xl">🛑</span>,
    order: <span className="text-xl">📦</span>,
    warning: <span className="text-xl">⚠️</span>,
  };

  return (
    <div
      className={`flex items-start space-x-4 p-4 ${
        notification.read ? "opacity-70" : ""
      }`}
    >
      <div className="flex-shrink-0">{icons[notification.type]}</div>
      <div className="flex-grow">
        <p className={`flex items-center  gap-3 text-sm `}>
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatToSpecificDateTime(notification.created_at)}
        </p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {notification.read ? (
              <Button
                variant="ghost"
                size="sm"
                disabled={true}
                className="flex-shrink-0 hover:bg-slate-200"
              >
                <CheckCheck color="green" size={15} />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="flex-shrink-0 hover:bg-slate-200"
              >
                <Check color="green" size={15} />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as Read</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState([]);
  let userRole = "customer";
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser !== null) {
    userRole = currentUser.roles;
  }

  console.log(userRole);

  useEffect(() => {
    fetchNoti();
  }, []);

  useEffect(() => {
    window.Echo.channel("public-updates").listen(
      ".public.notification",
      (response) => {
        console.log(response);

        if (!userRole.some((role) => role.name === response.message.role))
          return;
        handleNotiToast(response.message.message);
        setNoti((prev) => {
          if (
            prev.some((existingNoti) => existingNoti.id === response.message.id)
          ) {
            return prev;
          }
          return [
            ...prev,
            { ...response.message, read: getReadStatus(response.message.id) },
          ];
        });
      }
    );
  }, []);

  const fetchNoti = () => {
    axios
      .get("/api/notifications")
      .then((response) => {
        console.log(response);
        const updatedNoti = response.data
          .filter((noti) => userRole.some((role) => role.name === noti.role))
          .map((n) => ({ ...n, read: getReadStatus(n.id) }));
        setNoti(updatedNoti);
      })
      .catch((error) => console.error(error));
  };

  const getReadStatus = (id) => {
    const readNotifications =
      JSON.parse(localStorage.getItem("readNotifications")) || [];
    return readNotifications.includes(id);
  };

  const handleMarkAsRead = (id) => {
    setNoti(
      noti.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    const readNotifications =
      JSON.parse(localStorage.getItem("readNotifications")) || [];
    if (!readNotifications.includes(id)) {
      localStorage.setItem(
        "readNotifications",
        JSON.stringify([...readNotifications, id])
      );
    }
  };

  const unreadCount = noti.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {unreadCount} unread notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {noti.length > 0 ? (
              <ScrollArea className="h-[300px]">
                {noti.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))}
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                <Bell className="h-12 w-12 text-muted-foreground" />
                <Check className="h-6 w-6 text-green-500 mb-2" />
                <p className="text-muted-foreground">
                  You have no new notifications
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
