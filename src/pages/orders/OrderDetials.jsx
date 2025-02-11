import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { Truck } from "lucide-react";
import { Package } from "lucide-react";

const OrderDetails = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[90vh] flex flex-col">
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
            <OrderStatus />
            <Separator />
            <ShippingInfo />
            <Separator />
            <ReturnInfo />
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

export default OrderDetails;

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
        image="data:image/jpeg;base64,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"
      />
      <ProductItem
        name="Product 2"
        quantity={1}
        price={29.99}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTriarVFvdFWUe9t-hiAS8h7EvjWIjFn_NFw&s "
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
