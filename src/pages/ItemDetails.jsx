import React from "react";
import { ShoppingCart } from 'lucide-react';
import { CardComponent } from "../components/Cards";

const ItemDetails = () => {
  return (
    <div className="m-10">
      <CardComponent />
      <ShoppingCart />
    </div>
  );
};

export default ItemDetails;
