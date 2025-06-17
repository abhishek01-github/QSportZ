import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireAuth({ children, roles }) {
  const { token, user } = useAuth();
  const location = useLocation();

  // Not authenticated → send to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles prop is provided as an array, check inclusion
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}