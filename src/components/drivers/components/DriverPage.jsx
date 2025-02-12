"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { getDriver, deleteDriver } from "../lib/drivers"

export default function DriverPage() {
  const [driver, setDriver] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getDriver(id).then((data) => {
      if (data) {
        setDriver(data)
      } else {
        navigate("/drivers", { replace: true })
      }
    })
  }, [id, navigate])

  if (!driver) {
    return <div>Loading...</div>
  }

  const handleDelete = async () => {
    await deleteDriver(id)
    navigate("/drivers", { replace: true })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Driver Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{driver.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Driver personal details and information.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">License Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{driver.licenseNumber}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{driver.status}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <Button asChild>
          <Link to={`/drivers/${driver.id}/edit`}>Edit</Link>
        </Button>
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  )
}

