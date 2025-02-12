import { notFound } from "next/navigation"
import { DriverForm } from "../../driver-form"
import { getDriver, updateDriver } from "@/lib/drivers"

export default async function EditDriverPage({ params }: { params: { id: string } }) {
  const driver = await getDriver(params.id)

  if (!driver) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Driver</h1>
      <DriverForm driver={driver} onSubmit={(data) => updateDriver(params.id, data)} />
    </div>
  )
}

