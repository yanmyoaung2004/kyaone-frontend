import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ShoppingCartModal } from "../components/ShoppingCartModal";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";
const CustomerLayout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Toaster />
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar setIsCartOpen={setIsCartOpen} />
      </div>

      <div className="">{children}</div>

      <ShoppingCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <Footer />
    </>
  );
};

export default CustomerLayout;
