import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireAuth = false,
}) => {
  const { isAdmin, isAuthenticated } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
