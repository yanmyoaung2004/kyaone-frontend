// This is a mock database. In a real application, you would use a proper API or database.
let drivers = [
  { id: "1", name: "John Doe", licenseNumber: "DL12345", status: "active" },
  { id: "2", name: "Jane Smith", licenseNumber: "DL67890", status: "inactive" },
]

export async function getDrivers() {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(drivers), 500) // Simulate network delay
  })
}

export async function getDriver(id) {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const driver = drivers.find((driver) => driver.id === id)
      resolve(driver)
    }, 500) // Simulate network delay
  })
}

export async function createDriver(data) {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDriver = { ...data, id: String(drivers.length + 1) }
      drivers.push(newDriver)
      resolve(newDriver)
    }, 500) // Simulate network delay
  })
}

export async function updateDriver(id, data) {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      drivers = drivers.map((driver) => (driver.id === id ? { ...data, id } : driver))
      resolve(drivers.find((driver) => driver.id === id))
    }, 500) // Simulate network delay
  })
}

export async function deleteDriver(id) {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      drivers = drivers.filter((driver) => driver.id !== id)
      resolve()
    }, 500) // Simulate network delay
  })
}

