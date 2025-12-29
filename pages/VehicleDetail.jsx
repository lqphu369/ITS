import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_VEHICLES } from "../constants.js";
import { BookingModal } from "../components/BookingModal.jsx";
import { ChatModal } from "../components/ChatModal.jsx";
import {
  ArrowLeft,
  Star,
  MapPin,
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  Calendar,
  DollarSign,
  User,
  Info,
} from "lucide-react";
import { VehicleStatus } from "../types.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const vehicle = MOCK_VEHICLES.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy xe
          </h2>
          <button
            onClick={() => navigate("/search")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  // Mock multiple images (in real app, vehicle would have an images array)
  const images = [
    vehicle.imageUrl,
    vehicle.imageUrl,
    vehicle.imageUrl,
    vehicle.imageUrl,
  ];

  const handleBook = () => {
    setBookingVehicle(vehicle);
  };

  const handleConfirmBooking = () => {
    setBookingVehicle(null);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại danh sách</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Info */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={images[selectedImageIndex]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                {vehicle.status !== VehicleStatus.AVAILABLE && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold text-lg">
                      {vehicle.status === VehicleStatus.RENTED
                        ? "Đang được thuê"
                        : "Đang bảo trì"}
                    </span>
                  </div>
                )}
                {vehicle.isDynamicPricing && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    🔥 Nhu cầu cao
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? "ring-4 ring-blue-500"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                Mô tả xe
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-3">
                <p>
                  <strong>{vehicle.name}</strong> là một trong những dòng xe máy
                  phổ biến và được ưa chuộng nhất tại Việt Nam. Xe có thiết kế
                  hiện đại, vận hành êm ái và tiết kiệm nhiên liệu.
                </p>
                <p>
                  Phù hợp cho cả di chuyển trong thành phố và các chuyến đi
                  đường dài. Xe được bảo dưỡng định kỳ và luôn trong tình trạng
                  tốt nhất.
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Động cơ mạnh mẽ, tiết kiệm nhiên liệu</li>
                  <li>Phanh ABS an toàn</li>
                  <li>Cốp xe rộng rãi</li>
                  <li>Đèn LED sáng rõ</li>
                  <li>Yên xe êm ái</li>
                </ul>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thông số kỹ thuật
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Loại xe</p>
                    <p className="font-semibold text-gray-900">
                      {vehicle.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Động cơ</p>
                    <p className="font-semibold text-gray-900">125cc - 150cc</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Nhiên liệu</p>
                    <p className="font-semibold text-gray-900">Xăng</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Số chỗ</p>
                    <p className="font-semibold text-gray-900">2 người</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Điều khoản & Điều kiện
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Giấy tờ cần thiết:</strong> CMND/CCCD, Bằng lái xe
                    A1 hoặc A2
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Đặt cọc:</strong> 2.000.000 VNĐ (hoàn trả khi trả
                    xe)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Nhiên liệu:</strong> Trả xe với mức nhiên liệu như
                    khi nhận
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Bảo hiểm:</strong> Bảo hiểm xe máy bắt buộc đã bao
                    gồm
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Huỷ đặt:</strong> Huỷ miễn phí trước 24h, sau đó mất
                    phí 50%
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong>Lưu ý:</strong> Không sử dụng xe khi có sử dụng rượu
                    bia. Vi phạm sẽ mất toàn bộ tiền cọc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {vehicle.name}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{vehicle.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">128 đánh giá</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vehicle.address}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {vehicle.pricePerDay.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-gray-600">/ngày</span>
                </div>
                {vehicle.pricingTiers && vehicle.pricingTiers.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Giá theo số ngày thuê:
                    </p>
                    {vehicle.pricingTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {tier.minDays >= 30
                            ? "Từ 1 tháng"
                            : tier.maxDays
                            ? `${tier.minDays}-${tier.maxDays} ngày`
                            : `Từ ${tier.minDays} ngày`}
                        </span>
                        <span className="font-medium text-gray-900">
                          {tier.pricePerDay.toLocaleString("vi-VN")}đ/ngày
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm ${
                    vehicle.status === VehicleStatus.AVAILABLE
                      ? "bg-green-100 text-green-800"
                      : vehicle.status === VehicleStatus.RENTED
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {vehicle.status === VehicleStatus.AVAILABLE
                    ? "✓ Có sẵn"
                    : vehicle.status === VehicleStatus.RENTED
                    ? "✕ Đang được thuê"
                    : "⚠ Đang bảo trì"}
                </span>
              </div>

              {/* Booking Button */}
              <button
                onClick={handleBook}
                disabled={vehicle.status !== VehicleStatus.AVAILABLE}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  vehicle.status === VehicleStatus.AVAILABLE
                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {vehicle.status === VehicleStatus.AVAILABLE
                  ? "Đặt xe ngay"
                  : "Không khả dụng"}
              </button>

              {/* Contact Owner */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Chủ xe</p>
                    <p className="text-sm text-gray-600">Đã xác minh</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => alert("Gọi điện: +84 901 234 567")}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">Gọi</span>
                  </button>
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">Chat</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Bảo hiểm toàn diện</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Huỷ miễn phí trước 24h</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Xe được bảo dưỡng định kỳ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingVehicle && (
        <BookingModal
          vehicle={bookingVehicle}
          onClose={() => setBookingVehicle(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* Chat Modal */}
      {showChat && (
        <ChatModal vehicle={vehicle} onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};
