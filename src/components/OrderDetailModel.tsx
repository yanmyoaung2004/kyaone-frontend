import type React from "react";
import { X, Truck, CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: object;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] max-h-[90vh] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-center flex-grow">
            Order Details
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <ScrollArea className="flex-grow overflow-scroll">
          <div className="p-6 space-y-6">
            <CustomerInfo />
            <Separator />
            <OrderInfo />
            <Separator />
            <ProductList />
            <Separator />
            <OrderSummary />
            <Separator />
            {order.status !== "pending" && (
              <>
                <OrderStatus />
                <Separator />
                <ShippingInfo />
                <Separator />
                <ReturnInfo />
              </>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;

// Sub-components
const CustomerInfo = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
    <p>John Doe</p>
    <p>john.doe@example.com</p>
    <p>+1 (555) 123-4567</p>
    <p>123 Main St, Anytown, AN 12345</p>
  </div>
);

const OrderInfo = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Order Information</h3>
    <p className="text-sm text-gray-600">Order ID: #12345</p>
    <p className="text-sm text-gray-600">Order Date: June 1, 2023</p>
  </div>
);

const ProductList = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Products Ordered</h3>
    <div className="space-y-2">
      <ProductItem
        name="Product 1"
        quantity={2}
        price={19.99}
        image="/placeholder.svg?height=50&width=50"
      />
      <ProductItem
        name="Product 2"
        quantity={1}
        price={29.99}
        image="/placeholder.svg?height=50&width=50"
      />
    </div>
  </div>
);

const ProductItem = ({ name, quantity, price, image }) => (
  <div className="flex items-center space-x-4">
    <img
      src={image || "/placeholder.svg"}
      alt={name}
      className="w-12 h-12 object-cover rounded"
    />
    <div className="flex-grow">
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-600">
        Qty: {quantity} x ${price.toFixed(2)}
      </p>
    </div>
    <p className="font-medium">${(quantity * price).toFixed(2)}</p>
  </div>
);

const OrderSummary = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>$69.97</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>$5.99</span>
      </div>
      <div className="flex justify-between">
        <span>Discount</span>
        <span>-$5.00</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>$70.96</span>
      </div>
    </div>
  </div>
);

const OrderStatus = () => (
  <div className="flex items-center space-x-2">
    <CheckCircle className="text-green-500 h-6 w-6" />
    <span className="font-semibold">Order Status: Shipped</span>
  </div>
);

const ShippingInfo = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Shipping Information</h3>
    <div className="flex items-center space-x-2 mb-2">
      <Truck className="text-blue-500 h-5 w-5" />
      <span>Standard Shipping</span>
    </div>
    <p className="text-sm">
      Tracking Number:{" "}
      <a href="#" className="text-blue-500 hover:underline">
        1Z999AA1123456784
      </a>
    </p>
  </div>
);

const ReturnInfo = () => (
  <div className="flex items-center space-x-2 text-sm text-gray-600">
    <Package className="h-5 w-5" />
    <span>30 Days Return Window</span>
  </div>
);
