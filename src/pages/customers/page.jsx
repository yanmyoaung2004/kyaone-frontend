import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "../../components/Sales/CustomerList";
import CustomerProfile from "../../components/Sales/CustomerProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import WrongOrderModal from "../../components/WrongOrderModal";
import { X } from "lucide-react";
import { Search } from "lucide-react";
import Chat from "../../components/Chat";
import { ComplaintDetailsModal } from "../../components/Sales/Complaint-Detials-Modal";

export default function CustomerInteractionPage() {
  const [allComplaints, setAllComplaints] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaints, setSelectedComplaints] = useState();
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customerList, setCustomerList] = useState([]);
  const query = new URLSearchParams(window.location.search);
  const tab = query.get("tab");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/complaints");
      setComplaints(res.data);
      setCustomerList(transformComplaintsData(res.data));
      setAllComplaints(res.data);
      setSelectedCustomer(transformComplaintsData(res.data)[0]);
      setSelectedComplaints(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeOrder = (id) => {
    setSelectedCustomer(customerList.find((c) => c.customer_id === id));
  };

  useEffect(() => {
    if (search.trim() === "") {
      setComplaints(allComplaints);
    } else {
      setComplaints(
        allComplaints.filter((c) =>
          c.customer.user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, allComplaints]);

  const updateComplaintStatus = (id, newStatus) => {
    axios.put(`/api/complaints/${id}`, { status: newStatus }).then((resp) => {
      handleSuccessToast("Complaint status updated successfully");
    });
  };

  useEffect(() => {
    setSelectedComplaints(
      allComplaints.find((c) => c.customer_id === selectedCustomer.customer_id)
    );
  }, [selectedCustomer]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Interaction</h1>
      <div className="flex justify-between items-center">
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
        {selectedComplaints && (
          <WrongOrderModal selectComplaint={selectedComplaints} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {complaints.length > 0 ? (
              <CustomerList
                customerList={customerList}
                complaints={complaints}
                changeOrder={changeOrder}
                selectedId={selectedCustomer.customer_id}
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
                {selectedComplaints && (
                  <CustomerProfile
                    selectedComplaints={selectedComplaints}
                    selectedCustomer={selectedCustomer}
                    setSelected={setSelected}
                  />
                )}
              </TabsContent>
              <TabsContent value="chat">
                {selectedComplaints && (
                  <Chat selectedComplaints={selectedComplaints} />
                )}
              </TabsContent>
              {selected && (
                <ComplaintDetailsModal
                  onStatusUpdate={(newStatus) =>
                    updateComplaintStatus(selected.id, newStatus)
                  }
                  complaint={(() => {
                    selected.customerName = selectedCustomer.name;
                    selected.customer = {
                      user: {
                        name: selectedCustomer.name,
                        email: selectedCustomer.email,
                      },
                    };
                    return selected;
                  })()}
                  onClose={() => setSelected(null)}
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
