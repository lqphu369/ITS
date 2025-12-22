import React, { createContext, useContext, useState, useCallback } from "react";

const PaymentHistoryContext = createContext(undefined);

export const PaymentHistoryProvider = ({ children }) => {
  const [payments, setPayments] = useState([
    // Mock data
    {
      id: "PAY001",
      userId: "user1",
      cartItems: [],
      totalAmount: 750000,
      paymentMethod: "credit_card",
      paymentStatus: "completed",
      paymentDate: "2024-12-20T10:30:00",
      notes: "Honda Vision rental for 3 days",
    },
    {
      id: "PAY002",
      userId: "user1",
      cartItems: [],
      totalAmount: 500000,
      paymentMethod: "wallet",
      paymentStatus: "completed",
      paymentDate: "2024-12-19T15:45:00",
      notes: "Airblade 150 rental for 2 days",
    },
  ]);

  const addPayment = useCallback((payment) => {
    setPayments((prevPayments) => [...prevPayments, payment]);
  }, []);

  const getPaymentHistory = useCallback(() => {
    return payments.sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    );
  }, [payments]);

  const getPaymentById = useCallback(
    (id) => {
      return payments.find((payment) => payment.id === id);
    },
    [payments]
  );

  return (
    <PaymentHistoryContext.Provider
      value={{ payments, addPayment, getPaymentHistory, getPaymentById }}
    >
      {children}
    </PaymentHistoryContext.Provider>
  );
};

export const usePaymentHistory = () => {
  const context = useContext(PaymentHistoryContext);
  if (!context) {
    throw new Error(
      "usePaymentHistory must be used within PaymentHistoryProvider"
    );
  }
  return context;
};
