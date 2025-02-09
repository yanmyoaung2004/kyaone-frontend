import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const increaseCount = (selectedId) => {
    setCartItems((prevData) =>
      prevData.map((item) =>
        item.id === selectedId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseCount = (selectedId) => {
    setCartItems((prevData) =>
      prevData
        .map((item) =>
          item.id === selectedId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.some((item) => item.id === product.id)
        ? prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }]
    );
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
