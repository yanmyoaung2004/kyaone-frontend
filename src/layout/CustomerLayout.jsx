import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ShoppingCartModal } from "../components/ShoppingCartModal";
import Hero from "../components/Hero";

const CustomerLayout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar setIsCartOpen={setIsCartOpen} />
      </div>
      <div className="my-5">{children}</div>
      <ShoppingCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default CustomerLayout;
