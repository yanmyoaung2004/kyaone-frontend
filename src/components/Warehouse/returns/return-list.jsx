import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ReturnList({ returns, onReturnClick }) {
  return (
    <div className="rounded-md border flex-grow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Return ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.map((returnItem) => (
            <TableRow key={returnItem.id} onClick={() => onReturnClick(returnItem)} className="cursor-pointer">
              <TableCell>{returnItem.id}</TableCell>
              <TableCell>{returnItem.orderId}</TableCell>
              <TableCell>{returnItem.productName}</TableCell>
              <TableCell>{returnItem.customerName}</TableCell>
              <TableCell>{returnItem.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

