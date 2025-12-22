import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      // Check if item already exists
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.vehicleId === item.vehicleId &&
          i.startDate === item.startDate &&
          i.endDate === item.endDate
      );

      if (existingIndex > -1) {
        // Update quantity or replace
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = item;
        return updatedItems;
      }

      return [...prevItems, item];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.length;
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
