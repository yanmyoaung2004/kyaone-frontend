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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const complaintSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  complaintType: z.enum(["delayed", "faulty", "wrong", "missing"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export function ComplaintForm({ department, onSubmit, invoiceId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      complaintType: "delayed",
      complain: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // await onSubmit(data);
      form.reset();

      await axios
        .post("/api/complaints", {
          customer_id: currentUser.id,
          order_id: invoiceId,
          description: data.description,
          type: data.complaintType,
          status: "open",
        })
        .then((res) => {
          if (res.status === 201) {
            navigate("/");
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.error(error);
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Input
              name="name"
              label="Name"
              placeholder="Your full name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              name="email"
              label="Email"
              placeholder="your.email@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <Select {...form.register("complaintType")}>
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
            {form.formState.errors.complaintType && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.complaintType.message}
              </p>
            )}
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Please provide details about your complaint"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </p>
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
