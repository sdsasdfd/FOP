import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center h-[50px]  justify-center p-1  ">
      <Link to="." className="flex items-center gap-2">
        <img src={logo} width="64px" alt="" />
        <p className=" text-2xl font-semibold text-blue-600">
          Serve <span className=" text-blue-400">Ease</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
