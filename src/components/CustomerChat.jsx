"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
// import ChatDrawer from '@/components/chat-drawer'
import ChatInterface from "./Sales/ChatInterface";
import { MessageCircleMore } from "lucide-react";

function CustomerChat() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <span className="text-white cursor-pointer">
          <MessageCircleMore />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        {/* <ChatDrawer setOpen={setOpen} />
         */}
        <ChatInterface />
      </DrawerContent>
    </Drawer>
  );
}

export default CustomerChat;
