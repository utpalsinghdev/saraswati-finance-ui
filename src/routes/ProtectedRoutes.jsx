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
    <Navigate
      to={!!Cookie.get("gafs_agent") ? "/agent/login/" : "/admin/login"}
    />
  );
};

export default ProtectedRoute;
