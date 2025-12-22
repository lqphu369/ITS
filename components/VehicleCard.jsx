import React from "react";
import { VehicleStatus } from "../types.js";
import { MapPin, Battery, Zap, Star } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const VehicleCard = ({ vehicle, onBook }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 sm:h-48 w-full">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex flex-col gap-1">
          {vehicle.isDynamicPricing && (
            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold shadow-sm flex items-center gap-0.5 sm:gap-1">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{" "}
              <span className="hidden sm:inline">
                {t("vehicleCard.highDemand")}
              </span>
            </span>
          )}
          <span
            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold shadow-sm ${
              vehicle.status === VehicleStatus.AVAILABLE
                ? "bg-green-500 text-white"
                : vehicle.status === VehicleStatus.RENTED
                ? "bg-gray-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {vehicle.status === VehicleStatus.AVAILABLE
              ? t("vehicleCard.available")
              : vehicle.status === VehicleStatus.RENTED
              ? t("vehicleCard.rented")
              : t("vehicleCard.maintenance")}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-1.5 sm:mb-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 min-w-0 pr-2">
            {vehicle.name}
          </h3>
          <div className="flex items-center gap-0.5 sm:gap-1 text-yellow-500 flex-shrink-0">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            <span className="text-xs sm:text-sm font-medium">
              {vehicle.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{vehicle.address}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800">
            {vehicle.type}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-3 sm:mt-4 border-t border-gray-50 pt-3">
          <button
            onClick={() => onBook(vehicle)}
            disabled={vehicle.status !== VehicleStatus.AVAILABLE}
            className={`w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors active:scale-95 ${
              vehicle.status === VehicleStatus.AVAILABLE
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {vehicle.status === VehicleStatus.AVAILABLE
              ? t("vehicleCard.book")
              : t("vehicleCard.rented")}
          </button>
        </div>
      </div>
    </div>
  );
};
