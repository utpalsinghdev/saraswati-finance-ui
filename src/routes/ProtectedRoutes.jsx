import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import DashboardLayout from "../pages/dashboard";
import Cookie from "js-cookie";
const ProtectedRoute = () => {
  return !!Cookie.get("gafs_user") ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/page-not-found" />
  );
};

export default ProtectedRoute;
