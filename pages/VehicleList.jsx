import React, { useState, useMemo } from "react";
import { VehicleCard } from "../components/VehicleCard.jsx";
import { MapComponent } from "../components/MapComponent.jsx";
import { BookingModal } from "../components/BookingModal.jsx";
import { MOCK_VEHICLES } from "../constants.js";
import {
  Search,
  Filter,
  AlertCircle,
  ShieldCheck,
  Map,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export const VehicleList = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Get unique values for filters
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(MOCK_VEHICLES.map((v) => v.brand))];
    return ["All", ...uniqueBrands];
  }, []);

  const areas = useMemo(() => {
    const uniqueAreas = [...new Set(MOCK_VEHICLES.map((v) => v.area))];
    return ["All", ...uniqueAreas];
  }, []);

  const seats = useMemo(() => {
    const uniqueSeats = [...new Set(MOCK_VEHICLES.map((v) => v.seats))];
    return ["All", ...uniqueSeats.sort((a, b) => a - b)];
  }, []);

  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((v) => {
      const matchesType = selectedType === "All" || v.type === selectedType;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === "All" || v.brand === selectedBrand;
      const matchesSeats = selectedSeats === "All" || v.seats === selectedSeats;
      const matchesArea = selectedArea === "All" || v.area === selectedArea;
      const matchesPrice =
        v.pricePerDay >= priceRange[0] && v.pricePerDay <= priceRange[1];

      return (
        matchesType &&
        matchesSearch &&
        matchesBrand &&
        matchesSeats &&
        matchesArea &&
        matchesPrice
      );
    });
  }, [
    selectedType,
    searchQuery,
    selectedBrand,
    selectedSeats,
    selectedArea,
    priceRange,
  ]);

  const handleBook = (vehicle) => {
    setBookingVehicle(vehicle);
  };

  const handleConfirmBooking = () => {
    setBookingVehicle(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const clearAllFilters = () => {
    setSelectedType("All");
    setSearchQuery("");
    setSelectedBrand("All");
    setSelectedSeats("All");
    setSelectedArea("All");
    setPriceRange([0, 1000000]);
  };

  const hasActiveFilters =
    selectedBrand !== "All" ||
    selectedSeats !== "All" ||
    selectedArea !== "All" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 1000000;

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-hidden">
      {/* Filters Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 sm:p-4 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4">
          {/* Search Bar */}
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

            {/* Advanced Filter Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
                showAdvancedFilters || hasActiveFilters
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              {hasActiveFilters && (
                <span className="hidden sm:inline text-sm font-medium">
                  Lọc (
                  {(selectedBrand !== "All" ? 1 : 0) +
                    (selectedSeats !== "All" ? 1 : 0) +
                    (selectedArea !== "All" ? 1 : 0)}
                  )
                </span>
              )}
            </button>

            {/* Mobile Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className="lg:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title={showMap ? "Hide Map" : "Show Map"}
            >
              <Map className="w-5 h-5" />
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">Bộ lọc nâng cao</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Xóa bộ lọc
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hãng xe
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand === "All" ? "Tất cả" : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seats Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số chỗ
                  </label>
                  <select
                    value={selectedSeats}
                    onChange={(e) =>
                      setSelectedSeats(
                        e.target.value === "All"
                          ? "All"
                          : Number(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {seats.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat === "All" ? "Tất cả" : `${seat} chỗ`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khu vực
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area === "All" ? "Tất cả" : area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá (VNĐ/ngày)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Filter Buttons */}
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
              Tất cả
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
