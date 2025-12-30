import React, { useState } from "react";
import { VehicleStatus } from "../types.js";
import {
  X,
  Calendar,
  CreditCard,
  ShoppingCart,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";

export const BookingModal = ({ vehicle, onClose, onConfirm }) => {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  const [pickupLocation, setPickupLocation] = useState(vehicle?.address || "");
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState("");
  const { addToCart, checkBookingConflict } = useCart();

  if (!vehicle) return null;

  // Calculate days between dates
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // At least 1 day
  };

  const days = calculateDays();

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
    // Check for booking conflicts
    const conflict = checkBookingConflict(vehicle.id, startDate, endDate);
    if (conflict.hasConflict) {
      setError(conflict.message);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 1500);
  };

  const handleAddToCart = () => {
    // Check for booking conflicts
    const conflict = checkBookingConflict(vehicle.id, startDate, endDate);
    if (conflict.hasConflict) {
      setError(conflict.message);
      return;
    }

    const cartItem = {
      id: `${vehicle.id}_${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      pickupLocation: pickupLocation,
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
            Xác nhận đặt xe
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                {vehicle.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {vehicle.address}
              </p>
            </div>
          </div>

          {/* Date & Time Selection */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Ngày nhận xe
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setError(""); // Clear error when date changes
                    // Ensure end date is after start date
                    if (e.target.value > endDate) {
                      const nextDay = new Date(e.target.value);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setEndDate(nextDay.toISOString().split("T")[0]);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Giờ nhận xe
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Ngày trả xe
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setError(""); // Clear error when date changes
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Giờ trả xe
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Địa điểm nhận xe
              </label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Nhập địa điểm nhận xe..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Duration Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Thời gian thuê
              </span>
              <span className="text-lg font-bold text-blue-600">
                {days} ngày
              </span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                📅 Từ: {new Date(startDate).toLocaleDateString("vi-VN")} -{" "}
                {startTime}
              </p>
              <p>
                📅 Đến: {new Date(endDate).toLocaleDateString("vi-VN")} -{" "}
                {endTime}
              </p>
            </div>
          </div>

          {/* Pricing Tiers Info */}
          {vehicle.pricingTiers && vehicle.pricingTiers.length > 0 && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-sm text-gray-700 mb-2">
                Bảng giá:
              </p>
              <div className="space-y-1">
                {vehicle.pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-600 flex justify-between"
                  >
                    <span>
                      {tier.minDays === 30
                        ? "Từ 1 tháng"
                        : tier.maxDays
                        ? `${tier.minDays}-${tier.maxDays} ngày`
                        : `Từ ${tier.minDays} ngày`}
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(tier.pricePerDay)}
                      /ngày
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Giá mỗi ngày</span>
              <span className="font-medium text-sm">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(pricePerDay)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Số ngày</span>
              <span className="font-medium text-sm">{days}</span>
            </div>
            <div className="flex justify-between items-center mb-2 mt-3 pt-3 border-t border-blue-100">
              <span className="text-sm text-gray-600">Tạm tính</span>
              <span className="font-medium text-sm">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Phí dịch vụ</span>
              <span className="font-medium text-sm">0 ₫</span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-100">
              <span className="font-bold text-base text-blue-900">
                Tổng cộng
              </span>
              <span className="font-bold text-xl text-blue-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-4 sm:px-6 pb-4 sm:pb-6 border-t pt-4">
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className="flex-1 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-sm active:scale-95 min-h-[44px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            {addedToCart ? (
              <span className="animate-pulse whitespace-nowrap">Đã thêm ✓</span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                <span>Thêm giỏ hàng</span>
              </>
            )}
          </button>

          <button
            onClick={handleBook}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-sm active:scale-95 min-h-[44px] bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? (
              <span className="animate-pulse whitespace-nowrap">
                Đang xử lý...
              </span>
            ) : (
              <>
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span>Thanh toán</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
