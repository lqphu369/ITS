import React, { useState } from "react";
import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { usePaymentHistory } from "../contexts/PaymentHistoryContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Payment } from "../types";

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { addPayment } = usePaymentHistory();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const payment: Payment = {
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
      alert("Thanh toán thành công! (Payment successful!)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {cartItems.length === 0
              ? "Giỏ hàng trống"
              : `Giỏ hàng (${cartItems.length} mục)`}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Chưa có xe nào trong giỏ hàng
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.vehicleName}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {item.vehicleName}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>
                          📅{" "}
                          {new Date(item.startDate).toLocaleDateString("vi-VN")}{" "}
                          - {new Date(item.endDate).toLocaleDateString("vi-VN")}
                        </p>
                        <p>⏱️ {item.days} ngày</p>
                        <p className="text-blue-600 font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.pricePerDay)}
                          /ngày
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa khỏi giỏ hàng"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Tổng cộng</p>
                        <p className="text-lg font-bold text-blue-600">
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
              <div className="bg-white rounded-lg shadow sticky top-20 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Số mục</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Tổng cộng</span>
                    <span className="text-blue-600">
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
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? "Đang xử lý..." : "Thanh toán"}
                </button>

                {!user && (
                  <p className="text-xs text-red-500 mt-3 text-center">
                    Vui lòng đăng nhập để thanh toán
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
