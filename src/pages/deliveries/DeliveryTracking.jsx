import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { Truck } from "lucide-react";
import { Package } from "lucide-react";

const DeliveryTracking = ({ isOpen, onClose, delivery }) => {
  if (!isOpen) return null;

  console.log(delivery);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[90vh] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-center flex-grow">
            Tracking Delivery
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <ScrollArea className="flex-grow overflow-scroll">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">
                Customer Information
              </h3>
              <p>
                {" "}
                <span className="font-semibold">Name:</span>John Doe
              </p>
              <p>
                {" "}
                <span className="font-semibold">Email:</span>
                john.doe@example.com
              </p>
              <p>
                {" "}
                <span className="font-semibold">Phone:</span>+1 (555) 123-4567
              </p>
              <p>
                {" "}
                <span className="font-semibold">Address:</span>123 Main St,
                Anytown, AN 12345
              </p>
            </div>
            <Separator />
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Order Information</h3>
              <p className="text-sm">
                <span className="font-semibold">Order ID:</span> #12345
              </p>
              <p className="text-sm">
                <span className="font-semibold">Order Date:</span> June 1, 2023
              </p>
            </div>
            <Separator />
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Truck Details</h3>
              <p>
                <span className="font-semibold">Driver: </span>
                {delivery.driver}
              </p>
              <p>
                <span className="font-semibold">License Plate:</span>
                {delivery.licensePlate || "XYZ"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {delivery.phone || "+1 (555) 123-4567"}
              </p>
            </div>
            <Separator />
            <ProductList />
            <Separator />
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

export default DeliveryTracking;

const ProductList = () => (
  <div className="text-center">
    <h3 className="font-semibold text-lg mb-2">Products Ordered</h3>
    <div className="space-y-2">
      <ProductItem
        name="Product 1"
        quantity={2}
        price={19.99}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTriarVFvdFWUe9t-hiAS8h7EvjWIjFn_NFw&s"
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
  <div className="flex items-center space-x-4 p-2">
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
