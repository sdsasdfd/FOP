import React from "react";
import NavbarPerson from "../../components/NavbarPerson";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Servicer/Sidebar";

const Servicer = ({ user }) => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Servicer;
