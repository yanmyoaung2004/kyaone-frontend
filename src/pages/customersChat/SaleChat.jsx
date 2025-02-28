"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MessageCircleMore } from "lucide-react";
import Chat from "../../components/Chat";

function SaleChat({ id, name }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <span className="cursor-pointer">
          <MessageCircleMore />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <Chat
          selectedComplaints={{
            customer: {
              user_id: id,
              user: {
                name: name,
              },
            },
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default SaleChat;
