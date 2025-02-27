import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "../../components/Sales/CustomerList";
import CustomerProfile from "../../components/Sales/CustomerProfile";
import ChatInterface from "../../components/Sales/ChatInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import WrongOrderModal from "../../components/WrongOrderModal";
import { CloudCog, X } from "lucide-react";
import { Search } from "lucide-react";
import { ComplaintDetailsModal } from "../../components/Sales/Complaint-Detials-Modal";
import { handleSuccessToast } from "../../helpers/ToastService";

export default function CustomerInteractionPage() {
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedComplaint, setSelectedComplaint] = useState();
  const [search, setSearch] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const tab = query.get("tab");

  console.log(selectedComplaint);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/complaints");
      const complaintsData = res.data;
      const customerList = transformComplaintsData(complaintsData);
      setCustomerList(customerList);
      setSelectedCustomer(customerList[0]);
      setAllCustomers(customerList);
      const query = new URLSearchParams(window.location.search);
      const complaintId = query.get("complaintId");

      if (complaintId) {
        setSelectedCustomer(
          customerList.find((c) =>
            c.complaints.some((c) => c.id == complaintId)
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const changeOrder = (id) => {
    setSelectedCustomer(customerList.find((c) => c.customer_id === id));
  };

  const updateComplaintStatus = (id, newStatus) => {
    axios.put(`/api/complaints/${id}`, { status: newStatus }).then((resp) => {
      setRefresh(!refresh);
      handleSuccessToast("Complaint status updated successfully");
    });
  };
  useEffect(() => {
    const filteredCustomerList = allCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomerList(filteredCustomerList);
    console.log(filteredCustomerList);
  }, [search]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Interaction</h1>
      <div className="flex justify-between space-x-5 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="pl-8 pr-10 bg-white py-5 rounded-md"
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
        <WrongOrderModal
          selectedCustomer={selectedCustomer}
          selectedComplaint={selectedComplaint}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {customerList.length > 0 ? (
              <CustomerList
                customerList={customerList}
                changeOrder={changeOrder}
                selectedCustomer={selectedCustomer}
              />
            ) : (
              <>No Customer Complaints</>
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <Tabs defaultValue={tab || "profile"}>
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
                {selectedCustomer && (
                  <CustomerProfile
                    selectedCustomer={selectedCustomer}
                    customerList={customerList}
                    setSelectedComplaint={setSelectedComplaint}
                  />
                )}
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface selectedCustomer={selectedCustomer} />
              </TabsContent>
              {selectedComplaint && (
                <ComplaintDetailsModal
                  onStatusUpdate={(newStatus) =>
                    updateComplaintStatus(selectedComplaint.id, newStatus)
                  }
                  complaint={(() => {
                    selectedComplaint.customerName = selectedCustomer.name;
                    selectedComplaint.customer = {
                      user: {
                        name: selectedCustomer.name,
                        email: selectedCustomer.email,
                      },
                    };
                    return selectedComplaint;
                  })()}
                  onClose={() => setSelectedComplaint(null)}
                />
              )}
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

const transformComplaintsData = (complaintsData) => {
  const customerMap = {};

  complaintsData.forEach((complaint) => {
    const { customer, order } = complaint;

    if (!customerMap[customer.id]) {
      customerMap[customer.id] = {
        customer_id: customer.id,
        name: customer.user.name,
        email: customer.user.email,
        phone: customer.phone,
        address: customer.address,
        complaints: [],
      };
    }

    customerMap[customer.id].complaints.push({
      id: complaint.id,
      order_id: complaint.order_id,
      description: complaint.description,
      status: complaint.status,
      type: complaint.type,
      created_at: complaint.created_at,
      updated_at: complaint.updated_at,
      order: {
        id: order.id,
        status: order.status,
        total_price: order.total_price,
        eta: order.eta,
        invoice: {
          id: order.invoice.id,
          invoice_number: order.invoice.invoice_number,
          total_amount: order.invoice.total_amount,
        },
      },
    });
  });

  return Object.values(customerMap);
};
