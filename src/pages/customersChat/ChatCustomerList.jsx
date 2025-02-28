import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import { Users } from "lucide-react";
import SaleChat from "./SaleChat";

export default function ChatCustomerList() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/customers`);
      console.log(res);
      setCustomers(res.data);
      setAllCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fuzzySearch = (query) => {
    if (!query.trim()) return allCustomers;
    const lowerQuery = query.toLowerCase();
    return allCustomers.filter((item) =>
      item.user.name.toLowerCase().includes(lowerQuery)
    );
  };

  useEffect(() => {
    setCustomers(fuzzySearch(search));
  }, [search]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
      <div className="grid grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Customer
            </CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allCustomers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="pl-8 pr-10 py-5 rounded-md"
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setSearch("")}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-md border flex-grow overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      CS-{customer.id}
                    </TableCell>

                    <TableCell>{customer.user.name}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.user.email}</TableCell>
                    <TableCell className="text-center">
                      <SaleChat
                        id={customer.user.id}
                        name={customer.user.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
