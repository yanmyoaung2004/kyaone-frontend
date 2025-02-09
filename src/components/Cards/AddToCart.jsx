import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { addToCart, removeFromCart, setShowCart } from "../../redux/Slice/Item";
import CartItem from "./CartItem";

const AddToCart = () => {
  const itemDetail = {
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image,
    category: "Electronics",
  };
  const dispatch = useDispatch();
  const con = useSelector(state => console.log(state))
  const cartItems = useSelector((state) => state.cart.itemList) || [];
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.cart.showCart);

  const handleAddToCart = (item) => {
    dispatch(addToCart(itemDetail));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const toggleCart = () => {
    dispatch(setShowCart());
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
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AddToCart;
