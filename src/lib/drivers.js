"use server"

// import { revalidatePath } from "next/cache"

// This is a mock database. In a real application, you would use a proper database.
let drivers = [
  { id: "1", name: "John Doe", licenseNumber: "DL12345", status: "active" },
  { id: "2", name: "Jane Smith", licenseNumber: "DL67890", status: "inactive" },
]

export async function getDrivers() {
  // In a real app, this would be a database query
  return drivers
}

export async function getDriver(id) {
  // In a real app, this would be a database query
  return drivers.find((driver) => driver.id === id)
}

export async function createDriver(data) {
  // In a real app, this would be a database insert
  const newDriver = { ...data, id: String(drivers.length + 1) }
  drivers.push(newDriver)
  revalidatePath("/drivers")
}

export async function updateDriver(id, data) {
  // In a real app, this would be a database update
  drivers = drivers.map((driver) => (driver.id === id ? { ...data, id } : driver))
  revalidatePath("/drivers")
}

export async function deleteDriver(id) {
  // In a real app, this would be a database delete
  drivers = drivers.filter((driver) => driver.id !== id)
  revalidatePath("/drivers")
}

