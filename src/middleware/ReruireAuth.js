
import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";



export const RequireAuth = ({ children }) => {
  const token = sessionStorage.getItem("access-token")
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.Auth);


  // if (!token) {
  //   return <Navigate to="/login" state={{ path: location.pathname }} />;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};


export const RequireAuthLogout = ({ children }) => {
  const token = sessionStorage.getItem("access-token");
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.Auth);

  // if (token) {
  //   return <Navigate to="/" state={{ path: location.pathname }} />;
  // }

  if (isAuthenticated) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};



