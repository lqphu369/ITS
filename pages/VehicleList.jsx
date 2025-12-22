import React, { useState, useMemo } from "react";
import { VehicleCard } from "../components/VehicleCard.jsx";
import { MapComponent } from "../components/MapComponent.jsx";
import { BookingModal } from "../components/BookingModal.jsx";
import { MOCK_VEHICLES } from "../constants.js";
import { Search, Filter, AlertCircle, ShieldCheck, Map } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const VehicleList = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((v) => {
      const matchesType = selectedType === "All" || v.type === selectedType;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  const handleBook = (vehicle) => {
    setBookingVehicle(vehicle);
  };

  const handleConfirmBooking = () => {
    setBookingVehicle(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-hidden">
      {/* Filters Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t("vehicleList.searchPlaceholder")}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Mobile Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="lg:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title={showMap ? "Hide Map" : "Show Map"}
            >
              <Map className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <button
              onClick={() => {
                setSelectedType("All");
                setSearchQuery("");
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                searchQuery === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setSelectedType("All");
                setSearchQuery("vario");
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                searchQuery === "vario"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Vario
            </button>
            <button
              onClick={() => {
                setSelectedType("All");
                setSearchQuery("airblade");
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                searchQuery === "airblade"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Airblade
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Scrollable List */}
        <div
          className={`${
            showMap ? "hidden" : "flex"
          } lg:flex w-full lg:w-1/2 xl:w-2/5 flex-col overflow-y-auto p-3 sm:p-4 bg-gray-50 pb-20`}
        >
          <div className="max-w-2xl mx-auto w-full space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">
                {t("vehicleList.title")}
              </h2>
              <span className="text-xs sm:text-sm text-gray-500">
                {filteredVehicles.length} {t("vehicleList.results")}
              </span>
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>{t("vehicleList.noResults")}</p>
              </div>
            ) : (
              filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`transition-all duration-300 ${
                    selectedVehicleId === vehicle.id
                      ? "ring-2 ring-blue-500 rounded-xl transform scale-[1.02]"
                      : ""
                  }`}
                  onMouseEnter={() => setSelectedVehicleId(vehicle.id)}
                >
                  <VehicleCard vehicle={vehicle} onBook={handleBook} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Map */}
        <div
          className={`${
            showMap ? "flex" : "hidden"
          } lg:flex lg:w-1/2 xl:w-3/5 h-full bg-gray-200 relative`}
        >
          <MapComponent
            vehicles={filteredVehicles}
            selectedVehicleId={selectedVehicleId}
            onSelectVehicle={setSelectedVehicleId}
          />
          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white p-2 sm:p-3 rounded-lg shadow-lg z-10 text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600 block"></span>
              <span className="text-xs">
                {t("vehicleList.mapLegend.available")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400 block"></span>
              <span className="text-xs">
                {t("vehicleList.mapLegend.unavailable")}
              </span>
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

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <div className="bg-white bg-opacity-20 p-1 rounded-full">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold">{t("booking.success")}</h4>
            <p className="text-sm text-green-100">{t("booking.successDesc")}</p>
          </div>
        </div>
      )}
    </div>
  );
};
