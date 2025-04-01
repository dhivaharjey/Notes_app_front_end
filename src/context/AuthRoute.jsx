import React from "react";
import { useAppContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Theme/Page Loading/PageLoader";

const AuthRoute = () => {
  const { userInfo, loading } = useAppContext();
  if (loading && !userInfo) {
    return (
      <div className="h-dvh w-[100vw] flex items-center justify-center dark:bg-slate-700 ">
        <PageLoader />
      </div>
    );
  }
  return !userInfo ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AuthRoute;
