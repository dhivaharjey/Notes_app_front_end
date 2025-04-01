import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login/Login";
import SignUp from "./pages/Home/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/Cards/NotFound";

import ProtectedRoute from "./context/ProtectedRoute";
import PageLoader from "./components/Theme/Page Loading/PageLoader";
import AuthRoute from "./context/AuthRoute";

// import Navbar from "./components/Navbar/Navbar";
const Home = lazy(() => import("./pages/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));

const App = () => {
  return (
    <div className="dark:bg-slate-600">
      <ToastContainer />
      <Navbar />
      <Suspense
        fallback={
          <span className="flex justify-center">
            <PageLoader />
          </span>
        }
      >
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
