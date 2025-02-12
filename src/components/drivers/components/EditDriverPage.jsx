"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DriverForm } from "./DriverForm"
import { getDriver, updateDriver } from "../lib/drivers"

export default function EditDriverPage() {
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Driver</h1>
      <DriverForm driver={driver} onSubmit={(data) => updateDriver(id, data)} />
    </div>
  )
}

