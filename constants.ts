import { Vehicle, VehicleType, VehicleStatus, ChartData } from "./types";

// Centered around a mock location (e.g., Da Nang or Ho Chi Minh City coordinates approx)
export const CENTER_LAT = 10.7769;
export const CENTER_LNG = 106.7009;

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "1",
    name: "Honda Vision",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 150000,
    location: { lat: 10.777, lng: 106.701 },
    address: "District 1, HCMC",
    status: VehicleStatus.AVAILABLE,
    imageUrl: "/images/vision.jpg",
    rating: 4.8,
    isDynamicPricing: false,
    pricingTiers: [
      { minDays: 1, maxDays: 4, pricePerDay: 300000 }, // Từ 1 đến 4 ngày: 300.000/ngày
      { minDays: 5, maxDays: 14, pricePerDay: 250000 }, // Từ 5 đến 14 ngày: 250.000/ngày
      { minDays: 15, maxDays: 29, pricePerDay: 200000 }, // Từ 15 đến 29 ngày: 200.000/ngày
      { minDays: 30, pricePerDay: 130000 }, // Thuê tháng: 130.000/ngày
    ],
  },
  {
    id: "2",
    name: "Airblade 150",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 250000,
    location: { lat: 10.78, lng: 106.698 },
    address: "District 3, HCMC",
    status: VehicleStatus.AVAILABLE,
    imageUrl: "/images/airblade150.jpg",
    rating: 4.9,
    isDynamicPricing: true,
    pricingTiers: [
      { minDays: 1, maxDays: 4, pricePerDay: 300000 }, // Từ 1 đến 4 ngày: 300.000/ngày
      { minDays: 5, maxDays: 14, pricePerDay: 250000 }, // Từ 5 đến 14 ngày: 250.000/ngày
      { minDays: 15, maxDays: 29, pricePerDay: 200000 }, // Từ 15 đến 29 ngày: 200.000/ngày
      { minDays: 30, pricePerDay: 130000 }, // Thuê tháng trở lên: 130.000/ngày
    ],
  },
  {
    id: "3",
    name: "Vario 150",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 300000,
    location: { lat: 10.772, lng: 106.705 },
    address: "District 4, HCMC",
    status: VehicleStatus.RENTED,
    imageUrl: "/images/vario150.jpg",
    rating: 4.9,
    isDynamicPricing: true,
    pricingTiers: [
      { minDays: 1, maxDays: 2, pricePerDay: 350000 }, // Từ 1 đến 2 ngày: 350.000/ngày
      { minDays: 3, maxDays: 14, pricePerDay: 300000 }, // Từ 3 đến 14 ngày: 300.000/ngày
      { minDays: 15, maxDays: 29, pricePerDay: 250000 }, // Từ 15 đến 29 ngày: 250.000/ngày
      { minDays: 30, pricePerDay: 180000 }, // 30 ngày trở lên: 180.000/ngày
    ],
  },
  {
    id: "4",
    name: "Winner X",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 250000,
    location: { lat: 10.765, lng: 106.69 },
    address: "District 5, HCMC",
    status: VehicleStatus.AVAILABLE,
    imageUrl: "/images/winnerx.jpg",
    rating: 5.0,
    isDynamicPricing: false,
    pricingTiers: [
      { minDays: 1, maxDays: 2, pricePerDay: 300000 }, // Từ 1 đến 2 ngày: 300.000/ngày
      { minDays: 3, maxDays: 14, pricePerDay: 250000 }, // Từ 3 đến 14 ngày: 250.000/ngày
      { minDays: 15, maxDays: 29, pricePerDay: 200000 }, // Từ 15 đến 29 ngày: 200.000/ngày
      { minDays: 30, pricePerDay: 100000 }, // 30 ngày trở lên: 100.000/ngày
    ],
  },
  {
    id: "5",
    name: "SH 150i",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 450000,
    location: { lat: 10.79, lng: 106.71 },
    address: "Binh Thanh, HCMC",
    status: VehicleStatus.MAINTENANCE,
    imageUrl: "/images/sh150i.jpg",
    rating: 4.8,
    pricingTiers: [
      { minDays: 1, maxDays: 2, pricePerDay: 500000 }, // Từ 1 đến 2 ngày: 500.000/ngày
      { minDays: 3, maxDays: 14, pricePerDay: 450000 }, // Từ 3 đến 14 ngày: 450.000/ngày
      { minDays: 15, maxDays: 29, pricePerDay: 400000 }, // Từ 15 đến 29 ngày: 400.000/ngày
      { minDays: 30, pricePerDay: 300000 }, // 30 ngày trở lên: 300.000/ngày
    ],
  },
  {
    id: "6",
    name: "Honda Cub 50",
    type: VehicleType.MOTORBIKE,
    pricePerDay: 100000, // Base price (1-2 days)
    location: { lat: 10.8417, lng: 106.8097 }, // District 9, HCMC
    address: "District 9, Ho Chi Minh City",
    status: VehicleStatus.AVAILABLE,
    imageUrl: "/images/cub50.jpg",
    rating: 4.7,
    isDynamicPricing: false,
    pricingTiers: [
      { minDays: 1, maxDays: 2, pricePerDay: 100000 }, // Từ 1 đến 2 ngày: 100.000/ngày
      { minDays: 3, maxDays: 15, pricePerDay: 80000 }, // Từ 3 đến 15 ngày: 80.000/ngày
      { minDays: 16, maxDays: 29, pricePerDay: 70000 }, // Từ 16 đến 29 ngày: 70.000/ngày
      { minDays: 30, pricePerDay: 50000 }, // 30 ngày trở lên: 50.000/ngày
    ],
  },
];

export const REVENUE_DATA: ChartData[] = [
  { name: "Mon", revenue: 4000000, bookings: 12 },
  { name: "Tue", revenue: 3000000, bookings: 8 },
  { name: "Wed", revenue: 2000000, bookings: 6 },
  { name: "Thu", revenue: 2780000, bookings: 10 },
  { name: "Fri", revenue: 5890000, bookings: 18 },
  { name: "Sat", revenue: 8390000, bookings: 25 },
  { name: "Sun", revenue: 7490000, bookings: 22 },
];

export const VEHICLE_DISTRIBUTION_DATA = [
  { name: "Motorbike", value: 40 },
  { name: "4-Seat", value: 30 },
  { name: "7-Seat", value: 20 },
  { name: "Luxury", value: 10 },
];
