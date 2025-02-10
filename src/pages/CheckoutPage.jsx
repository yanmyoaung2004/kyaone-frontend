"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerLayout from "../layout/CustomerLayout";
import { DataContext } from "../context/DataContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems } = useContext(DataContext);
  const [shipmentCost, setShipmentCost] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const { pathname } = useLocation();

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setTotal(subTotal + shipmentCost);
  }, [shipmentCost]);

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pb-12 w-5/6 mx-auto">
        <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li className="flex py-6" key={item.id}>
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EGoUBVmYOALYumdqsUsOMdhyjfxBV8.png"
                              alt="Premium Wireless Headphones"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col items-start gap-2">
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="font-semibold">${item.price}</p>
                            <p>{item.quantity}x</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${subTotal}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Shipping</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${shipmentCost}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Tax</p>
                      <p className="text-sm font-medium text-gray-900">$0.00</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <p className="text-base font-medium text-gray-900">
                        Order total
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        ${total}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                    <Input id="apartment" className="mt-1" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" className="mt-1" />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" className="mt-1" />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="zip">ZIP</Label>
                      <Input id="zip" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full">
                Complete Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
