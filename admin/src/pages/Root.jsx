import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
