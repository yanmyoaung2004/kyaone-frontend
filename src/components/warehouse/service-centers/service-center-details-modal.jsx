"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Mock function to fetch service center details
const fetchServiceCenterDetails = (serviceCenter) => {
  // This would typically be an API call
  return {
    id: serviceCenter,
    name: "Service Center A",
    location: "City A",
    contact: "123-456-7890",
    orders: ["ORD-123", "ORD-456"],
  }
}

export function ServiceCenterDetailsModal({ serviceCenter, onClose }) {
  const serviceCenterDetails = fetchServiceCenterDetails(serviceCenter)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Service Center Details: {serviceCenter}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {serviceCenterDetails.name}
          </p>
          <p>
            <strong>Location:</strong> {serviceCenterDetails.location}
          </p>
          <p>
            <strong>Contact:</strong> {serviceCenterDetails.contact}
          </p>
          <h4 className="font-semibold mt-4 mb-2">Orders:</h4>
          <ul>
            {serviceCenterDetails.orders.map((order, index) => (
              <li key={index}>{order}</li>
            ))}
          </ul>
        </div>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}

