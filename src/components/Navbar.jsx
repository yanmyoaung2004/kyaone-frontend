import { useContext, useState } from "react";
import { Menu, X, Moon, Sun, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataContext } from "../context/DataContext";
import { useTheme } from "./theme-provider";
import { Link, useLocation } from "react-router-dom";
import { PopoverDemo } from "./Cards/NotiBar";
import { motion } from "framer-motion";

export default function Navbar({ setIsCartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(DataContext);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-black opacity-95 p-4 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-4/5 mx-auto"
      >
        <div className="container flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="text-white text-2xl font-semibold">Kyaone</h1>
          </Link>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <ul className="hidden md:flex space-x-6 text-white gap-3 items-center">
            <li className="w-16">
              <Link
                to={"/products"}
                className="hover:font-bold font-semibold text-sm"
              >
                Products
              </Link>
            </li>
            <li className="w-16">
              <Link
                to="/history"
                className="hover:font-bold font-semibold text-sm"
              >
                History
              </Link>
            </li>
            <li className="w-16">
              <Link href="#" className="hover:font-bold font-semibold text-sm">
                Setting
              </Link>
            </li>

            <li className="relative w-16 flex items-center">
              <div className="relative inline-block hover:cursor-pointer">
                <ShoppingCart size={22} onClick={() => setIsCartOpen(true)} />
                <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                  {cartItems.length}
                </div>
              </div>
            </li>
            <li className="relative w-16 flex items-center">
              <div className="relative inline-block hover:cursor-pointer">
                <PopoverDemo size={22} />
                <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                  2
                </div>
              </div>
            </li>

            <li className="w-16">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                <Moon className="h-5 w-5 transition-all dark:rotate-0 dark:scale-100 rotate-0 scale-100 dark:hidden" />
                <Sun className="h-5 w-5 transition-all -rotate-90 scale-0 dark:rotate-0 dark:scale-100 dark:block hidden" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-1 space-y-4 text-white py-5">
            <li className="w-16">
              <Link
                to={"/products"}
                className="hover:font-bold font-semibold text-sm"
              >
                Products
              </Link>
            </li>
            <li className="w-16">
              <Link href="#" className="hover:font-bold font-semibold text-sm">
                History
              </Link>
            </li>
            <li className="w-16">
              <Link href="#" className="hover:font-bold font-semibold text-sm">
                Setting
              </Link>
            </li>
            <li className="relative w-16">
              <div className="relative inline-block hover:cursor-pointer">
                <ShoppingCart size={22} onClick={() => setIsCartOpen(true)} />
                <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                  {cartItems.length}
                </div>
              </div>
            </li>
            <li className="relative w-16 flex items-center">
              <div className="relative inline-block hover:cursor-pointer">
                <Bell size={22} />
                <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                  2
                </div>
              </div>
            </li>

            <li className="w-16">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                <Moon className="h-5 w-5 transition-all dark:rotate-0 dark:scale-100 rotate-0 scale-100 dark:hidden" />
                <Sun className="h-5 w-5 transition-all -rotate-90 scale-0 dark:rotate-0 dark:scale-100 dark:block hidden" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        )}
      </motion.div>
    </nav>
  );
}
