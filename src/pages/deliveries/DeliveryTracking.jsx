import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";

const DeliveryTracking = ({ isOpen, onClose, delivery }) => {
  const [details, setDetails] = useState(null);
  console.log("hello");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/orders/getorderbyInvoiceId/${delivery?.id}`
      );
      console.log(res.data);
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [delivery?.id]);

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[500px] max-h-[90vh] flex flex-col">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-3xl font-semibold text-center flex-grow">
            Tracking Delivery
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-200 p-2 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600" />
          </Button>
        </div>

        <ScrollArea className="flex-grow overflow-auto">
          <div className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center">
                Customer Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {details?.name || "Loading..."}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {details?.customer?.user?.email || "Loading..."}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {details?.phone || "Loading..."}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {details?.location?.address || "Loading..."}
                </p>
              </div>
            </div>

            <Separator />

            {/* Order Information */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center">
                Order Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Order ID:</span>{" "}
                  {details?.id || "Loading..."}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {details?.created_at || "Loading..."}
                </p>
              </div>
            </div>

            <Separator />

            {/* Truck Details */}
            <div>
              <h3 className="font-semibold text-xl mb-4 text-center">
                Truck Details
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Driver:</span>{" "}
                  {details?.order_assign_truck?.driver.name || "Loading..."}
                </p>
                <p>
                  <span className="font-semibold">License Plate:</span>{" "}
                  {details?.order_assign_truck?.truck?.license_plate || "XYZ"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {details?.order_assign_truck?.driver.phone ||
                    "+1 (555) 123-4567"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Product List */}
            <ProductList products={details?.products} />

            <Separator />
          </div>
        </ScrollArea>

        {/* Close Button */}
        <div className="p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            className="w-full py-3 text-lg"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;

const ProductList = ({ products }) => (
  <div>
    <h3 className="font-semibold text-xl mb-4 text-center">Products Ordered</h3>
    <div className="space-y-4">
      {products?.map((product, index) => (
        <ProductItem
          key={index}
          name={product.name}
          quantity={product.pivot.quantity}
          price={product.unitprice.price}
          image={product.media[0].original_url}
        />
      ))}
    </div>
  </div>
);

const ProductItem = ({ name, quantity, price, image }) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition duration-300">
    <img
      src={image || "/placeholder.svg"}
      alt={name}
      className="w-16 h-16 object-cover rounded-lg"
    />
    <div className="flex-grow">
      <p className="font-medium text-lg">{name}</p>
      <p className="text-sm text-gray-500">
        Qty: {quantity} x ${price}
      </p>
    </div>
    <p className="font-medium text-lg">${(quantity * price).toFixed(2)}</p>
  </div>
);
