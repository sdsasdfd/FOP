import React from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center h-[50px]  justify-center p-1 border-b ">
      <Link to="/" className="flex items-center gap-1">
        <img className=" w-16  " src={logo} alt="" />
        <span className="text-xl text-blue-600 ">
          Serve <span className=" text-gray-500"> Ease </span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
