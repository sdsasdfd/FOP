import React from "react";

import { Outlet } from "react-router-dom";
import ServicerSidebar from "../../components/Servicer/ServicerSidebar";
import ServicerNavbar from "../../components/Servicer/ServicerNavbar";

const Servicer = ({ user }) => {
  return (
    <div className="flex">
      <ServicerSidebar />
      <div className="w-full">
        <ServicerNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Servicer;
