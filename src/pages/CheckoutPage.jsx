"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerLayout from "../layout/CustomerLayout";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [total, setTotal] = useState(1);

  let [orders, setOrders] = useState([
    {
      name : "Premium Wireless Headphones",
      price : "$249.99",
      id : 1,
      total
    },
    {
      name : "Apple",
      price : "$200",
      id : 2,
      total
    }
  ])

  const removeOrder = (id) => {
    setOrders(prev => prev.filter(r => r.id !== id))
  }

  const addOrder = () => {
    console.log(total)
    setTotal(prev => prev+1)
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 pb-12 w-5/6 mx-auto">
        <div className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              { !!orders && ( orders.map( order => (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EGoUBVmYOALYumdqsUsOMdhyjfxBV8.png"
                              alt="Premium Wireless Headphones"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h5>{order.name}</h5>
                                <p className="ml-4">$249.99</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Black</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <span>{order.total}</span>
                              </div>
                              <button onClick={() => removeOrder(order.id)} className="text-red-600 hover:text-red-500">
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Order Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">
                        $249.99
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Shipping</p>
                      <p className="text-sm font-medium text-gray-900">$9.99</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Tax</p>
                      <p className="text-sm font-medium text-gray-900">
                        $25.00
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <p className="text-base font-medium text-gray-900">
                        Order total
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        $284.98
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

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="credit"
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-4 rounded-lg border p-4">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex-1">
                        Credit Card
                      </Label>
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-12 rounded bg-gray-200" />
                        <div className="h-8 w-12 rounded bg-gray-200" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-lg border p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1">
                        PayPal
                      </Label>
                      <div className="h-8 w-12 rounded bg-gray-200" />
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input id="cardNumber" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="expiration">Expiration date</Label>
                          <Input
                            id="expiration"
                            placeholder="MM / YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
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
