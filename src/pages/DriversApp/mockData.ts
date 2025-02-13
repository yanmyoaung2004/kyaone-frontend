export const mockOrders = [
  {
    id: "O001",
    customerName: "ABC Corp",
    deliveryAddress: "123 Main St, City A",
    status: "In Transit",
    truckAssigned: "T001",
    eta: "12:30 PM",
  },
  {
    id: "O002",
    customerName: "XYZ Ltd.",
    deliveryAddress: "456 Oak Rd, City B",
    status: "Pending",
    truckAssigned: "T003",
    eta: "2:00 PM",
  },
  {
    id: "O003",
    customerName: "LMN Inc.",
    deliveryAddress: "789 Pine Ave, City C",
    status: "Delivered",
    truckAssigned: "T002",
    eta: "11:45 AM",
  },
]

export const mockTruckStatus = {
  id: "T001",
  type: "Small Van",
  status: "In Use",
  capacity: "1000 kg",
}

export const mockDriver = {
  name: "John Doe",
  status: "In Transit",
  profilePicture: "/placeholder.svg?height=40&width=40",
}

export const mockComplaints = [
  {
    id: "C001",
    type: "Wrong Item",
    status: "Pending",
    orderNumber: "ORD-001",
    customerName: "Alice Johnson",
    description: "Received a blue shirt instead of a red one.",
    pickupLocation: "123 Main St, City A",
  },
  {
    id: "C002",
    type: "Faulty",
    status: "In Progress",
    orderNumber: "ORD-002",
    customerName: "Bob Smith",
    description: "The electronic device is not turning on.",
  },
  {
    id: "C003",
    type: "Damaged",
    status: "Resolved",
    orderNumber: "ORD-003",
    customerName: "Charlie Brown",
    description: "Package arrived with visible damage.",
    pickupLocation: "456 Elm St, City B",
  },
]

