import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const products = [
  { name: "Product A", quantity: 2, price: 29.99, status: "Delivered" },
  { name: "Product B", quantity: 1, price: 49.99, status: "Issue Reported" },
  { name: "Product C", quantity: 3, price: 19.99, status: "Delivered" },
];

export default function ProductsTable({ products, order }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Price</TableHead> */}
              <TableHead>Total Price</TableHead>
              {/* <TableHead>Delivery Status</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.pivot?.quantity}</TableCell>
                {/* <TableCell>$ {product?.unitprice?.price}</TableCell> */}
                <TableCell>$ {order?.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
