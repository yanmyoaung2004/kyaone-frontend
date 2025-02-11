import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "../../components/Sales/CustomerList";
import CustomerProfile from "../../components/Sales/CustomerProfile";
import ChatInterface from "../../components/Sales/ChatInterface";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/avatars/bob.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/avatars/charlie.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "/avatars/diana.jpg",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    avatar: "/avatars/ethan.jpg",
  },
];

export default function CustomerInteractionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [customers, setCustomers] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const filterCustomers = customers.filter((customer) => {
    const customerMatch = customer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const emailMatch = customer.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return customerMatch || emailMatch;
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("url");

  //       if (!res.ok) {
  //         console.error("Error fetching data");
  //       }

  //       const data = res.data;

  //       setCustomres(data.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Interaction</h1>
      <div className="flex justify-between items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-8 pr-10 py-4 rounded-md"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button className="ml-2">New Interaction</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerList customers={filterCustomers} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <Tabs defaultValue="profile">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Details</CardTitle>
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="profile">
                <CustomerProfile />
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
