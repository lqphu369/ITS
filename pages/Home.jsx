import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Map, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-blue-700 overflow-hidden h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/banner1.png"
            alt="MixiRide Banner"
          />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-800 mb-3 sm:mb-4 md:mb-6 leading-tight text-left">
            MOTORBIKE RENTAL <br className="block" /> MIXIRIDE
          </h1>
          <p className="mt-4 sm:mt-5 md:mt-6 text-base xs:text-lg sm:text-2xl md:text-3xl text-gray-800 max-w-2xl leading-relaxed text-left font-semibold">
            Chuẩn bị cho những chuyến đi cùng MixiRide
          </p>
          <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10">
            <Link
              to="/search"
              className="inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border border-transparent text-xs sm:text-sm md:text-base font-bold rounded bg-gray-800 text-white hover:bg-gray-700 shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              BOOK NOW!
            </Link>
          </div>
          <div className="mt-8 sm:mt-9 md:mt-10 lg:mt-12 space-y-3 sm:space-y-4 text-gray-800 text-left">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl">📞</span>
              <p className="text-sm sm:text-lg md:text-xl font-semibold">
                +123-456-7890
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl">📧</span>
              <p className="text-sm sm:text-lg md:text-xl font-semibold">
                mixiride@gmail.com
              </p>
            </div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0 mt-0.5">
                📍
              </span>
              <p className="text-sm sm:text-lg md:text-xl font-semibold">
                2 Võ Oanh, p. Thạnh Mỹ Tây, Bình Thạnh, TPHCM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm md:text-base text-blue-600 font-semibold tracking-wide uppercase">
            {t("home.features.title")}
          </h2>
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl leading-8 font-extrabold tracking-tight text-gray-900 px-4">
            {t("home.features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Map className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {t("home.features.realTimeTracking")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("home.features.realTimeTrackingDesc")}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {t("home.features.smartBooking")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("home.features.smartBookingDesc")}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              {t("home.features.verifiedFleet")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("home.features.verifiedFleetDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Project Context Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>{t("home.footer")}</p>
          <p className="text-sm mt-2">{t("home.footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
};
