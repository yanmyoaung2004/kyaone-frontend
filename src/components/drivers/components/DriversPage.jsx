"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DriverList } from "./DriverList"
import { DriverListSkeleton } from "./DriverListSkeleton"
import { getDrivers } from "../lib/drivers"

export default function DriversPage() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDrivers().then((data) => {
      setDrivers(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Drivers</h1>
        <Button asChild>
          <Link to="/drivers/new">Add New Driver</Link>
        </Button>
      </div>
      {loading ? <DriverListSkeleton /> : <DriverList drivers={drivers} />}
    </div>
  )
}

