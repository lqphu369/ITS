export enum VehicleType {
  MOTORBIKE = "Motorbike",
  CAR_4_SEAT = "4-Seat Car",
  CAR_7_SEAT = "7-Seat Car",
  LUXURY = "Luxury",
}

export enum VehicleStatus {
  AVAILABLE = "Available",
  RENTED = "Rented",
  MAINTENANCE = "Maintenance",
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PricingTier {
  minDays: number;
  maxDays?: number;
  pricePerDay: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  pricePerDay: number;
  location: Coordinates;
  address: string;
  status: VehicleStatus;
  imageUrl: string;
  rating: number;
  isDynamicPricing?: boolean; // ITS Feature
  pricingTiers?: PricingTier[]; // Tiered pricing based on rental duration
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface ChartData {
  name: string;
  revenue: number;
  bookings: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

// Cart & Payment
export interface CartItem {
  id: string; // unique id for cart item
  vehicleId: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  imageUrl: string;
}

export interface Payment {
  id: string;
  userId: string;
  cartItems: CartItem[];
  totalAmount: number;
  paymentMethod: "credit_card" | "debit_card" | "wallet" | "bank_transfer";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentDate: string;
  notes?: string;
}
