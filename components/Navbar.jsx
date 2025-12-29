import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Map,
  LayoutDashboard,
  Home,
  LogOut,
  Shield,
  UserCircle,
  ShoppingCart,
  History,
} from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { LanguageSwitcher } from "./LanguageSwitcher.jsx";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { getTotalItems } = useCart();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 bg-blue-50"
      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center min-w-0">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2"
            >
              <img
                src="/images/mixiride.png"
                alt="MixiRide Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-contain"
              />
              <span className="font-bold text-base sm:text-xl text-gray-900 tracking-tight hidden xs:inline">
                MixiRide
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive(
                      "/admin"
                    )}`}
                  >
                    <LayoutDashboard className="w-4 h-4" /> {t("nav.dashboard")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                      "/"
                    )}`}
                  >
                    <Home className="w-4 h-4 inline mr-1" /> {t("nav.home")}
                  </Link>
                  <Link
                    to="/search"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${isActive(
                      "/search"
                    )}`}
                  >
                    <Map className="w-4 h-4" /> {t("nav.findVehicle")}
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {isAuthenticated ? (
              <>
                {/* Cart Icon */}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Giỏ hàng"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>

                {/* Payment History Icon */}
                <Link
                  to="/payment-history"
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Lịch sử thanh toán"
                >
                  <History className="w-5 h-5" />
                </Link>

                {/* Profile Icon */}
                <Link
                  to="/profile"
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Hồ sơ"
                >
                  <UserCircle className="w-5 h-5" />
                </Link>

                <div className="hidden md:flex items-center gap-2 px-2 md:px-3 py-1.5 bg-gray-50 rounded-lg">
                  <span className="text-xs md:text-sm font-medium text-gray-700 truncate max-w-[100px] lg:max-w-none">
                    {user?.name}
                  </span>
                </div>
                {isAdmin && (
                  <span className="hidden lg:flex items-center gap-1 px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-medium">
                    <Shield className="w-3 h-3 md:w-4 md:h-4" />{" "}
                    {t("nav.admin")}
                  </span>
                )}
                <LanguageSwitcher />
                <button
                  onClick={handleLogout}
                  className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  title={t("common.logout")}
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            ) : (
              <>
                <LanguageSwitcher />
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  {t("common.login")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-100 bg-white">
        <div className="flex justify-around items-center py-2">
          {isAdmin ? (
            <Link
              to="/admin"
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive(
                "/admin"
              )}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs">{t("nav.dashboard")}</span>
            </Link>
          ) : (
            <>
              <Link
                to="/"
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive(
                  "/"
                )}`}
              >
                <Home className="w-5 h-5" />
                <span className="text-xs">{t("nav.home")}</span>
              </Link>
              <Link
                to="/search"
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive(
                  "/search"
                )}`}
              >
                <Map className="w-5 h-5" />
                <span className="text-xs">{t("nav.findVehicle")}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
