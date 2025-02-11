import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function OrderDetailProfile({ selectedOrder }) {
  return (
    selectedOrder &&
    selectedOrder.products && (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-lg">Name</Label>
            <p>{selectedOrder.customer.user.name}</p>
          </div>
          <div>
            <Label className="text-lg">Email</Label>
            <p>{selectedOrder.customer.user.email}</p>
          </div>
          <div>
            <Label className="text-lg">Phone</Label>
            <p>{selectedOrder.customer.phone}</p>
          </div>
          <div>
            <Label className="text-lg">Address</Label>
            <p>
              {selectedOrder.location.address} , {selectedOrder.location.city},{" "}
              {selectedOrder.location.state}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Products Ordered</h3>
          <div className="w-4/6">
            {selectedOrder?.products.map((p) => (
              <div className="flex flex-col gap-2" key={p.id}>
                <ProductItem
                  name={p.name}
                  quantity={p.pivot.quantity}
                  price={p.unitprice?.price ? p.unitprice?.price : 1}
                  image="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

const ProductItem = ({ name, quantity, price, image }) => (
  <div className="flex justify-center items-center space-x-6 p-3">
    <img
      src={image || "/placeholder.svg"}
      alt={name}
      className="w-12 h-12 object-cover rounded"
    />
    <div className="flex-grow">
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-600">
        Qty: {quantity} x ${price}
      </p>
    </div>
    <p className="font-medium">${(quantity * price).toFixed(2)}</p>
  </div>
);
