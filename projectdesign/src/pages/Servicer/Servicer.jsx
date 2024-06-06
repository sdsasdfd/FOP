import React from "react";
import NavbarPerson from "../../components/NavbarPerson";
import { Outlet } from "react-router-dom";

const Servicer = ({ user }) => {
  return (
    <div>
      <NavbarPerson />
      <Outlet />
    </div>
  );
};

export default Servicer;
