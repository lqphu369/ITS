import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Car, User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        // Import để lấy thông tin user vừa đăng nhập
        const { findUserByUsername } = await import("../constants/users.js");
        const loggedInUser = findUserByUsername(username);

        // Điều hướng dựa trên role
        if (loggedInUser?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(result.error || t("login.error"));
      }
    } catch (err) {
      setError(t("login.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-3 sm:mb-4">
            <Car className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
            {t("app.name")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {t("login.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2"
            >
              {t("login.username")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t("login.usernamePlaceholder")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              {t("login.password")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder={t("login.passwordPlaceholder")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base active:scale-95"
          >
            {isLoading ? t("login.submitting") : t("login.submit")}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Hoặc đăng nhập với
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() =>
            alert("Tính năng đăng nhập Google sẽ được tích hợp sớm!")
          }
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition-colors group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-medium text-gray-700 group-hover:text-blue-600">
            Đăng nhập với Google
          </span>
        </button>

        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              {t("login.noAccount")}{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                {t("login.registerNow")}
              </Link>
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 text-center">
              {t("login.demoAccounts")}
            </p>
            <div className="space-y-1.5 sm:space-y-2 text-xs text-gray-500">
              <div className="bg-gray-50 p-2 rounded text-xs">
                <strong>User:</strong> user1 / user123
              </div>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <strong>Admin:</strong> admin / admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
