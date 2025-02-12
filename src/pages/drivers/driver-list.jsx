import { Link } from "react-router-dom"
import { getDrivers } from "@/lib/drivers"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export async function DriverList() {
  const drivers = await getDrivers()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>License Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.licenseNumber}</TableCell>
            <TableCell>{driver.status}</TableCell>
            <TableCell>
              <Button asChild variant="ghost" className="mr-2">
                <Link href={`/drivers/${driver.id}`}>View</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={`/drivers/${driver.id}/edit`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
