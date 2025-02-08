import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import image from "./download.jpg";

const AddToCart = () => {
  const [count, setCount] = useState(0);
  const itemDetail = {
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image,
    category: "Electronics",
  };

  const increaseHandler = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseHandler = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <Card>
        <CardHeader>
          <CardTitle>{itemDetail.name}</CardTitle>
          <CardDescription>{itemDetail.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Button className="mr-1" onClick={increaseHandler}>+</Button>
              *{count}
              <Button onclick={decreaseHandler}>-</Button>
            </div>
            <div>
              <img src={itemDetail.image} alt="" className="w-24" />
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddToCart;
