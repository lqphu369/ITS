import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { PaymentHistoryProvider } from "./contexts/PaymentHistoryContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Home } from "./pages/Home.jsx";
import { VehicleList } from "./pages/VehicleList.jsx";
import { VehicleDetail } from "./pages/VehicleDetail.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { PaymentHistoryPage } from "./pages/PaymentHistoryPage.jsx";
import { OrderTrackingPage } from "./pages/OrderTrackingPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={true}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requireAuth={true}>
                <VehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle/:id"
            element={
              <ProtectedRoute requireAuth={true}>
                <VehicleDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requireAuth={true}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-history"
            element={
              <ProtectedRoute requireAuth={true}>
                <PaymentHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requireAuth={true}>
                <OrderTrackingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth={true}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <PaymentHistoryProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<AppLayout />} />
              </Routes>
            </Router>
          </PaymentHistoryProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
