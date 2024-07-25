import React from "react";
import logo from "../../assets/01.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center h-[50px]  justify-center p-1  ">
      <Link to="." className="flex items-center gap-2">
        <img src={logo} width="40px" height="40px" alt="" />
        <p className=" text-2xl font-semibold text-sky-800">
          Serve <span className=" text-customColor-blue">Ease</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
