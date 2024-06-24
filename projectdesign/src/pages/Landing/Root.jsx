import React, { useEffect } from "react";
import Navbar from "../../components/Landing/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Root = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (currentUser) {
  //     if (currentUser.roles === "user") {
  //       return navigate("user-home");
  //     } else {
  //       return navigate("servicer-home");
  //     }
  //   } else {
  //     return navigate("/");
  //   }
  // }, [currentUser, navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
