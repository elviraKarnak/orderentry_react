
import { Navigate, useLocation } from "react-router-dom";
import React from "react";



export const RequireAuth = ({ children }) => {
  const token = sessionStorage.getItem("access-token")
  const location = useLocation();


  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};


export const RequireAuthLogout = ({ children }) => {
  const token = sessionStorage.getItem("access-token");
  const location = useLocation();

  if (token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
};