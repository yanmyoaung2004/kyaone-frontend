import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopBar() {
  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">Warehouse Management System</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </div>
    </header>
  )
}

