import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckUserExistProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  let path;
  if (currentUser?.roles === "user") {
    path = "/user-home";
  } else {
    path = "/servicer-home";
  }
  return currentUser ? <Navigate to={path} /> : <Outlet />;
};

export default CheckUserExistProtectedRoute;
