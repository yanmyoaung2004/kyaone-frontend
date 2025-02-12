import { DriverForm } from "../driver-form"
import { createDriver } from "@/lib/drivers"

export default function NewDriverPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Driver</h1>
      <DriverForm onSubmit={createDriver} />
    </div>
  )
}

