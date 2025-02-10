import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "../../components/Sales/CustomerList";
import CustomerProfile from "../../components/Sales/CustomerProfile";
import ChatInterface from "../../components/Sales/ChatInterface";

export default function CustomerInteractionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Interaction</h1>
      <div className="flex justify-between items-center">
        <Input placeholder="Search customers..." className="w-[300px]" />
        <Button>New Interaction</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerList />
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
