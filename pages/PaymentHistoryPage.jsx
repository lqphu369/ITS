import React from "react";
import { History, Download } from "lucide-react";
import { usePaymentHistory } from "../contexts/PaymentHistoryContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const PaymentHistoryPage = () => {
  const { getPaymentHistory } = usePaymentHistory();
  const { user } = useAuth();
  const { t } = useLanguage();

  const userPayments = getPaymentHistory().filter((p) => p.userId === user?.id);

  const getStatusBadge = (status) => {
    const badges = {
      completed: { bg: "bg-green-100", text: "text-green-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      failed: { bg: "bg-red-100", text: "text-red-800" },
      refunded: { bg: "bg-blue-100", text: "text-blue-800" },
    };
    const badge = badges[status] || badges.pending;
    return badge;
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: "Đã hoàn thành",
      pending: "Đang chờ",
      failed: "Thất bại",
      refunded: "Đã hoàn tiền",
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <History className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Lịch sử thanh toán
          </h1>
        </div>

        {!user ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">
              Vui lòng đăng nhập để xem lịch sử thanh toán
            </p>
          </div>
        ) : userPayments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Chưa có lịch sử thanh toán nào
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      #{payment.id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📅{" "}
                      {new Date(payment.paymentDate).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusBadge(payment.paymentStatus).bg
                      } ${getStatusBadge(payment.paymentStatus).text}`}
                    >
                      {getStatusLabel(payment.paymentStatus)}
                    </span>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Phương thức thanh toán
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                      {payment.paymentMethod.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Số xe</p>
                    <p className="font-medium text-gray-900">
                      {payment.cartItems.length} xe
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tổng cộng</p>
                    <p className="font-bold text-lg text-blue-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(payment.totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                {payment.cartItems.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Chi tiết:
                    </p>
                    <div className="space-y-2 bg-gray-50 p-3 rounded">
                      {payment.cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.vehicleName} ({item.days} ngày)
                          </span>
                          <span className="font-medium text-gray-900">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.totalPrice)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {payment.notes && (
                  <p className="text-sm text-gray-600 italic mb-4">
                    📝 {payment.notes}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải hóa đơn
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
