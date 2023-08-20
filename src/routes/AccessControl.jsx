import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
const AccessControl = ({ allowedRoles }) => {
  const user = JSON?.parse(Cookie.get("gafs_user"))?.user;


  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/page-not-found" />
  );
};

export default AccessControl;
