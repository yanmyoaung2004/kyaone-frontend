import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell } from "lucide-react"
import { useState } from "react"

export function PopoverDemo() {

  let [orderCreated, setOrderCreated] = useState(true);

  let [status, setStatus] = useState("pending");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Bell size={22} />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <div className="border-t-2 "></div>
            <div className="flex justify-between">
              { !!orderCreated && 
                <p className="text-sm text-muted-foreground">
                  Your order is complete!
                </p>  
              }  
              <p className="text-xs text-muted-foreground" >{status}</p>
            </div>
            <div className="border-b-2 border-dotted"></div>
            <Button variant="outline" className="rounded-lg">Mark all read</Button>
          </div>
          <div>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
