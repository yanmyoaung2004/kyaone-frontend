import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const complaintSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  orderNumber: z.string().min(1, "Order number is required"),
  complaintType: z.enum(["Delivery late", "Wrong order", "Faulty Order"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export function ComplaintForm({ department, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      name: "",
      email: "",
      orderNumber: "",
      complaintType: "Delivery late",
      description: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
      console.log("Success");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white text-black mt-10">
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input type="email" placeholder="Email" {...form.register("email")} />
          <Input
            name="name"
            label="Name"
            placeholder="Your full name"
            {...form.register("name")}
          />
          <Input
            name="email"
            label="Email"
            placeholder="your.email@example.com"
            {...form.register("email")}
          />
          <Input
            name="orderNumber"
            label="Order Number"
            placeholder="e.g., ORD-12345"
            {...form.register("orderNumber")}
          />
          <Select {...form.register("complaintType")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Complaint type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery_late">Delivery Late</SelectItem>
              <SelectItem value="wrong_order">Wrong Order</SelectItem>
              <SelectItem value="faulty_order">Faulty Order</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            name="description"
            label="Description"
            placeholder="Please provide details about your complaint"
            {...form.register("description")}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
