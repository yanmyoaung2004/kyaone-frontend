import { useContext, useState } from "react";
import { Menu, X, Moon, Sun, ShoppingCart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataContext } from "../context/DataContext";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfileDropDown } from "./ProfileDropDown";
import { useSelector } from "react-redux";
import NotificationDropdown from "./notification-dropdown";
import CustomerChat from "./CustomerChat";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Navbar({ setIsCartOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(DataContext);
  const { theme, setTheme } = useTheme();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header className="flex bg-black h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className>
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="h-full gap-2 py-6 flex flex-col space-y-5 justify-center items-center">
            <Link
              to="/"
              className="flex items-center font-bold justify-center  hover:text-gray-400"
              prefetch={false}
            >
              Products
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/history"
                  className="flex items-center font-bold justify-center  hover:text-gray-400"
                  prefetch={false}
                >
                  Orders
                </Link>
                <Link
                  href="/history"
                  className="flex items-center justify-center hover:text-gray-200"
                  prefetch={false}
                >
                  <CustomerChat />
                </Link>
                <div className="relative  inline-block hover:cursor-pointer">
                  <ShoppingCart size={22} onClick={() => setIsCartOpen(true)} />
                  <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                    {cartItems.length}
                  </div>
                </div>

                <div className="text-black">
                  <NotificationDropdown />
                </div>
              </>
            )}
            <Button
              variant="outline"
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
            <div className="flex-1"></div>
            {currentUser ? (
              <ProfileDropDown />
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant="ghost" className="">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-10 px-5 items-center justify-center">
        <Link
          to="/"
          className="flex items-center justify-center font-bold text-white hover:text-gray-200"
          prefetch={false}
        >
          Products
        </Link>
        {currentUser && (
          <>
            <Link
              to="/history"
              className="flex items-center justify-center font-bold text-white hover:text-gray-200"
              prefetch={false}
            >
              Orders
            </Link>
            <Link
              href="/history"
              className="flex items-center justify-center text-white hover:text-gray-200"
              prefetch={false}
            >
              <CustomerChat />
            </Link>
            <div className="relative text-white inline-block hover:cursor-pointer">
              <ShoppingCart size={22} onClick={() => setIsCartOpen(true)} />
              <div className="absolute -top-2 -right-3.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                {cartItems.length}
              </div>
            </div>
            <div className="text-white">
              <NotificationDropdown />
            </div>
          </>
        )}
        <Button
          variant="outline"
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
        {currentUser ? (
          <ProfileDropDown />
        ) : (
          <>
            <Link to={"/login"}>
              <Button variant="ghost" className="">
                Login
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return <h1 className="text-white text-2xl font-semibold">MyanTech</h1>;
}
