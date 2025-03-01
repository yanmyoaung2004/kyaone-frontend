import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ComplaintForm({ department, onSubmit, invoiceId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaintType: "delayed",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.complaintType) {
      newErrors.complaintType = "Please select a complaint type";
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      complaintType: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }

      await axios
        .post("/api/complaints", {
          customer_id: currentUser.id,
          order_id: invoiceId,
          description: formData.description,
          type: formData.complaintType,
          status: "open",
        })
        .then((res) => {
          if (res.status === 201) {
            navigate("/");
          }
        });
    } catch (error) {
      console.error("Error submitting complaint", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white text-black mt-10 shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit a Complaint</CardTitle>
        <CardDescription>
          {department === "sales"
            ? "Sales Department"
            : department === "warehouse"
            ? "Warehouse Department"
            : "Customer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              label="Name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              name="email"
              label="Email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <Select
              name="complaintType"
              value={formData.complaintType} // Bind value to formData.complaintType
              onValueChange={handleSelectChange} // Handle change via onValueChange
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Complaint type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delayed">Delivery delay</SelectItem>
                <SelectItem value="wrong">Wrong Order</SelectItem>
                <SelectItem value="faulty">Faulty Order</SelectItem>
                <SelectItem value="missing">Order miss</SelectItem>
              </SelectContent>
            </Select>
            {errors.complaintType && (
              <p className="text-red-500 text-sm">{errors.complaintType}</p>
            )}
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Please provide details about your complaint"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
