import React, { useState, useMemo } from "react";
import { usePaymentHistory } from "../contexts/PaymentHistoryContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

export const OrderTrackingPage = () => {
  const { getPaymentHistory } = usePaymentHistory();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const userOrders = useMemo(() => {
    const payments = getPaymentHistory().filter((p) => p.userId === user?.id);

    // Transform payments into orders with tracking info
    return payments.map((payment) => ({
      ...payment,
      orderNumber: payment.id,
      trackingSteps: [
        {
          status: "confirmed",
          labelKey: "orderTracking.step.confirmed",
          timestamp: payment.paymentDate,
          completed: true,
        },
        {
          status: "preparing",
          labelKey: "orderTracking.step.preparing",
          timestamp: new Date(
            new Date(payment.paymentDate).getTime() + 3600000
          ).toISOString(),
          completed: payment.paymentStatus === "completed",
        },
        {
          status: "ready",
          labelKey: "orderTracking.step.ready",
          timestamp: new Date(
            new Date(payment.paymentDate).getTime() + 7200000
          ).toISOString(),
          completed: payment.paymentStatus === "completed",
        },
        {
          status: "in-progress",
          labelKey: "orderTracking.step.inProgress",
          timestamp: payment.cartItems[0]?.startDate || payment.paymentDate,
          completed: false,
        },
        {
          status: "completed",
          labelKey: "orderTracking.step.completed",
          timestamp: payment.cartItems[0]?.endDate || null,
          completed: false,
        },
      ],
    }));
  }, [user, getPaymentHistory]);

  const filteredOrders = useMemo(() => {
    return userOrders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.cartItems.some((item) =>
          item.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesStatus =
        filterStatus === "all" || order.paymentStatus === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [userOrders, searchQuery, filterStatus]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: t("paymentHistory.status.completed"),
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: t("paymentHistory.status.pending"),
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: t("paymentHistory.status.failed"),
      },
      refunded: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: t("paymentHistory.status.refunded"),
      },
    };
    return badges[status] || badges.pending;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("profile.loginRequired")}
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {t("profile.loginNow")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t("orderTracking.title")}
          </h1>
          <p className="text-gray-600">{t("orderTracking.subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t("orderTracking.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t("orderTracking.allStatus")}</option>
                <option value="completed">
                  {t("paymentHistory.status.completed")}
                </option>
                <option value="pending">
                  {t("paymentHistory.status.pending")}
                </option>
                <option value="failed">
                  {t("paymentHistory.status.failed")}
                </option>
                <option value="refunded">
                  {t("paymentHistory.status.refunded")}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("orderTracking.noOrders")}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== "all"
                ? t("orderTracking.changeFilter")
                : t("orderTracking.noOrdersYet")}
            </p>
            <button
              onClick={() => navigate("/search")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("orderTracking.rentNow")}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      {getStatusIcon(order.paymentStatus)}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.paymentDate).toLocaleDateString(
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
                    </div>
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        getStatusBadge(order.paymentStatus).bg
                      } ${getStatusBadge(order.paymentStatus).text}`}
                    >
                      {getStatusBadge(order.paymentStatus).label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.vehicleName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.vehicleName}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {item.days} {t("cart.days")}
                            </span>
                            {item.startDate && item.endDate && (
                              <span className="text-xs">
                                {new Date(item.startDate).toLocaleDateString(
                                  "vi-VN"
                                )}{" "}
                                -{" "}
                                {new Date(item.endDate).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            {item.totalPrice.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>
                        {t("orderTracking.total")}{" "}
                        <strong className="text-gray-900">
                          {order.totalAmount.toLocaleString("vi-VN")}đ
                        </strong>
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedOrder(
                          selectedOrder?.id === order.id ? null : order
                        )
                      }
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {selectedOrder?.id === order.id
                        ? t("orderTracking.hideDetails")
                        : t("orderTracking.showDetails")}
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          selectedOrder?.id === order.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Order Tracking Timeline */}
                {selectedOrder?.id === order.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h4 className="font-bold text-gray-900 mb-4">
                      {t("orderTracking.orderStatus")}
                    </h4>
                    <div className="space-y-4">
                      {order.trackingSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            {idx < order.trackingSteps.length - 1 && (
                              <div
                                className={`w-0.5 h-12 ${
                                  step.completed
                                    ? "bg-green-500"
                                    : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p
                              className={`font-semibold ${
                                step.completed
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {t(step.labelKey)}
                            </p>
                            {step.timestamp && (
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(step.timestamp).toLocaleString(
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
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {t("paymentHistory.paymentMethod")}
                          </p>
                          <p className="font-semibold text-gray-900">
                            {order.paymentMethod === "credit_card"
                              ? t("orderTracking.paymentMethod.creditCard")
                              : t("orderTracking.paymentMethod.bankTransfer")}
                          </p>
                        </div>
                        {order.notes && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              {t("orderTracking.notes")}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {order.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
