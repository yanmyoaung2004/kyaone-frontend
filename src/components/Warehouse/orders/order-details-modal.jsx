import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock function to fetch order details
const fetchOrderDetails = (orderId) => {
  // This would typically be an API call
  return {
    id: orderId,
    customerName: "John Doe",
    status: "Processing",
    items: [
      { name: "Widget A", quantity: 2, price: 10.99 },
      { name: "Gadget B", quantity: 1, price: 24.99 },
    ],
    total: 46.97,
    shippingAddress: "123 Main St, Anytown, AN 12345",
  };
};

export function OrderDetailsModal({ orderId, onClose }) {
  const orderDetails = fetchOrderDetails(orderId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details: {orderId}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {orderDetails.customerName}
          </p>
          <p>
            <strong>Status:</strong> {orderDetails.status}
          </p>
          <p>
            <strong>Shipping Address:</strong> {orderDetails.shippingAddress}
          </p>
          <h4 className="font-semibold mt-4 mb-2">Items:</h4>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}, Price: $
                {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <strong>Total:</strong> ${orderDetails.total.toFixed(2)}
          </p>
        </div>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
