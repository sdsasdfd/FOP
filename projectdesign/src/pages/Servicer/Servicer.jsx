import React from "react";
import NavbarPerson from "../../components/NavbarPerson";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Servicer/Sidebar";
import ServicerNavbar from "../../components/Servicer/ServicerNavbar";

const Servicer = ({ user }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <ServicerNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Servicer;
