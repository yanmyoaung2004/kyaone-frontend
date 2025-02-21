import React, { useContext } from "react";
import { CardComponent } from "../components/Cards";
import { SearchBar } from "../components/SearchBar";
import CustomerLayout from "../layout/CustomerLayout";
import { DataContext } from "../context/DataContext";
import { PaginationForItems } from "../components/PaginationForItems";

const itemList = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
  {
    id: 9,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    price: 249.99,
    image:
      "https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg",
    category: "Electronics",
  },
];
const ItemDetails = () => {
  const { cartItems, addToCart } = useContext(DataContext);
  console.log(cartItems);
  return (
    <>
      <CustomerLayout>
        <div className="w-5/6 mx-auto my-5">
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 mx-auto gap-6 my-5">
          {itemList.map((item) => (
            <CardComponent
              item={item}
              key={item.id}
              addToCart={addToCart}
              isAdded={cartItems.some((product) => product.id === item.id)}
            />
          ))}
        </div>
        <PaginationForItems />
      </CustomerLayout>
    </>
  );
};

export default ItemDetails;
