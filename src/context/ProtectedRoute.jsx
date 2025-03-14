import React from "react";
import { useAppContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAppContext();

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
