import React, { useState } from "react";
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { usePaymentHistory } from "../contexts/PaymentHistoryContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { addPayment } = usePaymentHistory();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const payment = {
        id: `PAY${Date.now()}`,
        userId: user.id,
        cartItems: cartItems,
        totalAmount: getTotalPrice(),
        paymentMethod: "credit_card",
        paymentStatus: "completed",
        paymentDate: new Date().toISOString(),
        notes: `Payment for ${cartItems.length} vehicle rental(s)`,
      };

      addPayment(payment);
      clearCart();
      setIsProcessing(false);
      alert(t("cart.paymentSuccess"));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {cartItems.length === 0
              ? t("cart.empty")
              : `${t("cart.title")} (${cartItems.length} ${t("cart.items")})`}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("cart.emptyMessage")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.vehicleName}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        {item.vehicleName}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>
                          📅{" "}
                          {new Date(item.startDate).toLocaleDateString("vi-VN")}{" "}
                          - {new Date(item.endDate).toLocaleDateString("vi-VN")}
                        </p>
                        <p>
                          ⏱️ {item.days} {t("cart.days")}
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.pricePerDay)}
                          {t("cart.perDay")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title={t("cart.remove")}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t("cart.total")}
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow sticky top-20 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("cart.summary")}
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {t("cart.itemCount")}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {cartItems.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">
                      {t("cart.total")}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || !user}
                  className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    isProcessing || !user
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? t("cart.processing") : t("cart.checkout")}
                </button>

                {!user && (
                  <p className="text-xs text-red-500 dark:text-red-400 mt-3 text-center">
                    {t("cart.loginRequired")}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
