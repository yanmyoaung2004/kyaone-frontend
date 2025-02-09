import React from "react";

import { addToCart, removeFromCart } from "../../redux/Slice/Item";

const CartItem = ({ item }) => {
  const addAmountHandler = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const removeAmountHandler = () => {
    removeFromCart(item.id);
  };

  return (
    <div key={item.id}>
      <div>
        <Button className="mr-1" onClick={() => dispatch(addAmountHandler())}>
          +
        </Button>
        *{item.quantity}
        <Button onClick={() => dispatch(removeAmountHandler())}>-</Button>
      </div>
      <div>
        <img src={itemDetail.image} alt="" className="w-24" />
      </div>
    </div>
  );
};

export default CartItem;
