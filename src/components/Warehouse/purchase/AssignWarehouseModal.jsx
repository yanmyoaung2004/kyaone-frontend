"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Plus, Minus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Save } from "lucide-react";
import axios from "axios";
import {
  handleSuccessToast,
  handleFailureToast,
} from "../../../helpers/ToastService";

export function AssignWarehouseModal({
  onClose,
  products,
  warehouses,
  getAssignedWarehouses,
  handleQuantityChange,
  getAssignedQuantity,
  expandedProduct,
  assignments,
  purchaseProduct,
  refuillStoredQuantity,
}) {
  const saveAssignments = async () => {
    try {
      const res = await axios.post("api/purchase/assign/warehouse", {
        assignments: assignments,
        purchaseProductId: purchaseProduct,
      });
      handleSuccessToast(res.data.message);
      const quantity = assignments.reduce(
        (sum, assignment) => sum + assignment.quantity,
        0
      );

      refuillStoredQuantity(quantity);
    } catch (error) {
      console.log(error);
      handleFailureToast("Error Occurs!");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-lg font-semibold">
              Assign {products.find((p) => p.id === expandedProduct)?.name}
            </p>
          </DialogTitle>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Add Warehouse</Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Search warehouse..." />
                  <CommandList>
                    <CommandEmpty>No warehouse found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72">
                        {warehouses.map((warehouse) => (
                          <CommandItem
                            key={warehouse.id}
                            onSelect={() => {
                              if (
                                getAssignedQuantity(
                                  expandedProduct,
                                  warehouse.id
                                ) === 0
                              ) {
                                handleQuantityChange(
                                  expandedProduct,
                                  warehouse.id,
                                  1
                                );
                              }
                            }}
                          >
                            {warehouse.name}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4">
            <ScrollArea className="h-72 border rounded-md">
              {getAssignedWarehouses(expandedProduct).map((warehouse) => (
                <div
                  key={warehouse.id}
                  className="flex items-center justify-between py-2"
                >
                  <span>{warehouse.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          expandedProduct,
                          warehouse.id,
                          Math.max(
                            0,
                            getAssignedQuantity(expandedProduct, warehouse.id) -
                              1
                          )
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={getAssignedQuantity(expandedProduct, warehouse.id)}
                      onChange={(e) =>
                        handleQuantityChange(
                          expandedProduct,
                          warehouse.id,
                          Math.max(0, Number.parseInt(e.target.value) || 0)
                        )
                      }
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          expandedProduct,
                          warehouse.id,
                          getAssignedQuantity(expandedProduct, warehouse.id) + 1
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(expandedProduct, warehouse.id, 0)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogDescription>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={saveAssignments}>
            <Save className="mr-2 h-4 w-4" />
            Save Assignments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
