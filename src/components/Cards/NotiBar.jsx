import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleNotiToast } from "../../helpers/ToastService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useSelector } from "react-redux";

export function PopoverDemo() {
  const [noti, setNoti] = useState([]);
  const userRole =
    useSelector((state) => state.user.currentUser.role) ?? "customer";

  let [orderCreated, setOrderCreated] = useState(true);
  window.Echo.channel("public-updates").listen(
    ".public.notification",
    (response) => {
      if (response.message.role !== userRole) return;
      handleNotiToast(response.message.message);
      setNoti((prev) => {
        if (
          prev.some((existingNoti) => existingNoti.id === response.message.id)
        ) {
          return prev;
        }
        return [...prev, response.message]; // Otherwise, add the new notification
      });
    }
  );

  window.Echo.channel("public-updates").listen(".public.notification", (e) => {
    console.log("Notification received:", e);
  });

  window.Echo.channel("sent-message") // Public channel
    .listen(".message.sent", (event) => {
      console.log("New message:", event.message);
    });

  let [status, setStatus] = useState("pending");

  useEffect(() => {
    fetchNoti();
  }, []);

  const fetchNoti = () => {
    axios
      .get("/api/notificaitons")
      .then((response) => {
        console.log(response);
        setNoti(response.data.filter((noti) => noti.role === userRole));
        console.log(noti);
      })
      .catch((error) => console.error(error));
  };

  const getNoti = () => {
    fetchNoti();
  };

  return (
    <>
      {noti.length > 0 && (
        <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
          {noti.length}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild onClick={getNoti}>
          <Bell size={22} />
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Notifications</h4>
              <div className="border-t-2 "></div>
              <div className="">
                {noti.reverse().map((noti) => {
                  return (
                    <div
                      key={noti.id}
                      className="flex justify-between py-2 cursor-pointer hover:bg-gray-50 p-1 rounded pe-2"
                    >
                      <p className="text-sm text-muted-foreground flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>{noti.message}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {noti.type}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="border-b-2 border-dotted"></div>
              {/* <Button variant="outline" className="rounded-lg">
              Mark all read
            </Button> */}
            </div>
            <div></div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
