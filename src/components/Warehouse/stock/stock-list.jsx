import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToSpecificDateTime } from "../../../helpers/services";

export function StockList({ stock, onProductSelect }) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Reorder Level</TableHead>
            <TableHead>Last Restock Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onProductSelect(item)}
              className={`cursor-pointer ${
                item.currentStock < item.reorderLevel ? "bg-red-100" : ""
              }`}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.currentStock}</TableCell>
              <TableCell>{item.reorderLevel}</TableCell>
              <TableCell>
                {formatToSpecificDateTime(item.lastRestockDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
