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

  // Check if a vehicle is already booked during a specific time period
  const checkBookingConflict = useCallback(
    (vehicleId, startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check cart items for conflicts
      const hasConflict = cartItems.some((item) => {
        if (item.vehicleId !== vehicleId) return false;

        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);

        // Check if dates overlap
        return (
          (start >= itemStart && start <= itemEnd) ||
          (end >= itemStart && end <= itemEnd) ||
          (start <= itemStart && end >= itemEnd)
        );
      });

      if (hasConflict) {
        return {
          hasConflict: true,
          message:
            "Xe này đã được đặt trong khoảng thời gian bạn chọn. Vui lòng chọn thời gian khác.",
        };
      }

      return { hasConflict: false };
    },
    [cartItems]
  );

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
        checkBookingConflict,
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
