import { Suspense } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DriverList } from "./driver-list"
import { DriverListSkeleton } from "./driver-list-skeleton"

export default function DriversPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Drivers</h1>
        <Button asChild className>
          <Link to="/drivers/new">Add New Driver</Link>
        </Button>
      </div>
      <Suspense fallback={<DriverListSkeleton />}>
        <DriverList />
      </Suspense>
    </div>
  )
}

