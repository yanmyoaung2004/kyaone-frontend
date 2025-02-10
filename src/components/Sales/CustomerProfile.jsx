import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const customerData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  joinDate: "January 15, 2023",
  totalOrders: 7,
  totalSpent: "$1,234.56",
  lastOrder: {
    id: "12345",
    date: "March 1, 2023",
    status: "Delivered",
  },
}

export default function CustomerProfile() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <p className="text-lg font-medium">{customerData.name}</p>
        </div>
        <div>
          <Label>Email</Label>
          <p className="text-lg">{customerData.email}</p>
        </div>
        <div>
          <Label>Phone</Label>
          <p className="text-lg">{customerData.phone}</p>
        </div>
        <div>
          <Label>Address</Label>
          <p className="text-lg">{customerData.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customerData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customerData.totalSpent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Join Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{customerData.joinDate}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Last Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Order ID</Label>
              <p className="text-lg font-medium">{customerData.lastOrder.id}</p>
            </div>
            <div>
              <Label>Date</Label>
              <p className="text-lg">{customerData.lastOrder.date}</p>
            </div>
            <div>
              <Label>Status</Label>
              <p className="text-lg">{customerData.lastOrder.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

