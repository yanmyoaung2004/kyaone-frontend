import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { formatToSpecificDateTime } from "../../helpers/services";

const OrderDetails = ({ isOpen, onClose, orderId, callBackOnSuccess }) => {
  const [order, setOrder] = useState();
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/orders/getorderbyid/${orderId}`);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [orderId]);

  const acceptOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/accept/${orderId}`);
      if (res.status === 200) {
        callBackOnSuccess(orderId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-center flex-grow">
            Order Details
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <ScrollArea className="flex-grow overflow-scroll overflow-x-hidden">
          <div className="p-6 space-y-6">
            {order && (
              <>
                <CustomerInfo customer={order.customer} />
                <Separator />
                <OrderInfo orderId={order?.id} date={order?.created_at} />
                <Separator />
                <ProductList products={order?.products} />
                <Separator />
                <OrderSummary products={order?.products} />
                <Separator />
              </>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button
            className="w-full"
            onClick={() => {
              acceptOrder();
              onClose();
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

const CustomerInfo = ({ customer }) => {
  if (!customer) return null;
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Customer Information</h3>
      <p>{customer.user?.name}</p>
      <p>{customer.user?.email}</p>
      <p>{customer.phone}</p>
      <p>{customer.address}</p>
    </div>
  );
};

const OrderInfo = ({ orderId, date }) => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Order Information</h3>
    <p className="text-sm text-gray-600">Order ID: {orderId}</p>
    <p className="text-sm text-gray-600">
      Order Date: {formatToSpecificDateTime(date)}
    </p>
  </div>
);

const ProductList = ({ products }) => {
  if (!products) return null;
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Products Ordered</h3>
      <div className="space-y-2">
        {products.map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            quantity={p.pivot.quantity}
            price={p.unitprice.price}
            image="https://th.bing.com/th/id/OIP.wMftsrP6USIHg4aMEpwnPQHaHa?rs=1&pid=ImgDetMain"
          />
        ))}
      </div>
    </div>
  );
};

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
        Qty: {quantity} x ${(price * 1).toFixed(2)}
      </p>
    </div>
    <p className="font-medium">${(quantity * price).toFixed(2)}</p>
  </div>
);

const OrderSummary = ({ products }) => {
  if (!products) return null;
  const subtotal = products.reduce(
    (acc, p) => acc + p.pivot.quantity * p.unitprice.price,
    0
  );

  const shipping = 0.0;
  const discount = 0.0;

  const total = subtotal + shipping - discount;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
