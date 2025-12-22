import React, { useState } from "react";
import { VehicleStatus } from "../types.js";
import { X, Calendar, CreditCard, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";

export const BookingModal = ({ vehicle, onClose, onConfirm }) => {
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  if (!vehicle) return null;

  // Calculate price based on pricing tiers if available
  const calculatePricePerDay = (days) => {
    if (vehicle.pricingTiers && vehicle.pricingTiers.length > 0) {
      // Sort tiers by minDays descending to prioritize longer durations
      const sortedTiers = [...vehicle.pricingTiers].sort(
        (a, b) => (b.minDays || 0) - (a.minDays || 0)
      );

      // Check tiers from longest duration first
      for (const tier of sortedTiers) {
        if (days >= tier.minDays) {
          if (tier.maxDays === undefined) {
            // No max limit (e.g., "over 15 days" or "1 month")
            return tier.pricePerDay;
          } else if (days <= tier.maxDays) {
            // Within range
            return tier.pricePerDay;
          }
        }
      }

      // Fallback to first tier (shortest duration)
      return sortedTiers[sortedTiers.length - 1].pricePerDay;
    }
    return vehicle.pricePerDay;
  };

  const pricePerDay = calculatePricePerDay(days);
  const total = pricePerDay * days;

  const handleBook = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 1500);
  };

  const handleAddToCart = () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + days);

    const cartItem = {
      id: `${vehicle.id}_${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      days: days,
      pricePerDay: pricePerDay,
      totalPrice: total,
      imageUrl: vehicle.imageUrl,
    };

    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => {
      onClose();
      setAddedToCart(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col animate-fade-in-up">
        <div className="p-3 sm:p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h3 className="font-bold text-base sm:text-lg text-gray-800">
            Confirm Booking
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                {vehicle.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500">{vehicle.type}</p>
              <p className="text-blue-600 font-medium mt-1 text-sm sm:text-base">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(pricePerDay)}{" "}
                / day
                {vehicle.pricingTiers && days > 0 && (
                  <span className="text-xs text-gray-500 block mt-0.5">
                    ({days} {days === 1 ? "day" : "days"})
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Duration (Days)
              </label>
              <div className="flex items-center border rounded-lg p-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full outline-none text-gray-900 text-sm sm:text-base"
                />
              </div>
              {vehicle.pricingTiers && vehicle.pricingTiers.length > 0 && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  <p className="font-medium mb-1">Bảng giá:</p>
                  {vehicle.pricingTiers.map((tier, index) => (
                    <p key={index} className="text-xs">
                      {tier.minDays === 30
                        ? "30 ngày"
                        : tier.maxDays
                        ? `Từ ${tier.minDays} đến ${tier.maxDays} ngày`
                        : `Từ ${tier.minDays} ngày`}
                      :{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(tier.pricePerDay)}
                      /ngày
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm text-gray-600">
                  Price per day
                </span>
                <span className="font-medium text-xs sm:text-sm">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(pricePerDay)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm text-gray-600">Days</span>
                <span className="font-medium text-xs sm:text-sm">{days}</span>
              </div>
              <div className="flex justify-between items-center mb-1 mt-2 pt-2 border-t border-blue-100">
                <span className="text-xs sm:text-sm text-gray-600">
                  Subtotal
                </span>
                <span className="font-medium text-xs sm:text-sm">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm text-gray-600">
                  Service Fee
                </span>
                <span className="font-medium text-xs sm:text-sm">0 ₫</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-100">
                <span className="font-bold text-sm sm:text-base text-blue-900">
                  Total
                </span>
                <span className="font-bold text-lg sm:text-xl text-blue-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 px-4 sm:px-6 pb-4 sm:pb-6">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base active:scale-95 min-h-[44px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              {addedToCart ? (
                <span className="animate-pulse whitespace-nowrap">
                  Thêm vào giỏ...
                </span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Thêm giỏ hàng</span>
                </>
              )}
            </button>

            <button
              onClick={handleBook}
              disabled={loading}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base active:scale-95 min-h-[44px] bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? (
                <span className="animate-pulse whitespace-nowrap">
                  Đang xử lý...
                </span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Thanh toán</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
