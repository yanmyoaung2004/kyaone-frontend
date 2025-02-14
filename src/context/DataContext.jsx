import { createContext, useEffect, useState } from "react";
import { handleWarningToast } from "../helpers/ToastService";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const increaseCount = (selectedId) => {
    setCartItems((prevData) => {
      const existingProductIndex = prevData.findIndex(
        (item) => item.id === selectedId
      );

      if (existingProductIndex !== -1) {
        const updatedData = [...prevData];
        if (
          updatedData[existingProductIndex].quantity ===
            updatedData[existingProductIndex].available ||
          updatedData[existingProductIndex].quantity >
            updatedData[existingProductIndex].available
        ) {
          handleWarningToast(
            `${updatedData[existingProductIndex].name} is out of stock!`
          );
        } else {
          updatedData[existingProductIndex].quantity += 1;
        }
        return updatedData;
      }
      return prevData;
    });
  };

  const decreaseCount = (selectedId) => {
    setCartItems(
      (prevData) =>
        prevData
          .map((item) =>
            item.id === selectedId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= existingItem.available) {
          handleWarningToast(`${product.name} is out of stock!`);
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      if (product.available <= 0) {
        handleWarningToast(`${product.name} is out of stock!`);
        return prevItems;
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <DataContext.Provider
      value={{
        cartItems,
        setCartItems,
        increaseCount,
        decreaseCount,
        addToCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
