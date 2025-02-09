import { X, Plus, Minus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export function ShoppingCartModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cartItems, increaseCount, decreaseCount } = useContext(DataContext);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Shopping Cart
            </DialogTitle>
            <DialogDescription />
          </div>
          <p className="text-sm text-muted-foreground">
            Review your items you've added to your cart and proceed to checkout
            when ready.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-4 px-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        decreaseCount(item.id);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        increaseCount(item.id);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <div className="w-20 text-right">
                    <p className="font-medium">
                      {item.price.toLocaleString()}Ks
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 mt-4 justify-end">
          <Button
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Process
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
