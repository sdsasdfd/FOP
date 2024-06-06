import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

import logo from "../../assets/logo.jpeg";

const Navbar = ({ userExist }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="px-2 relative border-b-[2px]  ">
      <div className="container lg:px-8 sm:px-6 mx-auto p-2 flex justify-between items-center ">
        <img src={logo} width="64px" alt="" />

        <div className=" hidden sm:flex gap-3 mr-4">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link
            to="/sign-in-servicer"
            className="border border-white px-[8px] rounded-lg"
          >
            Become a Servicer
          </Link>
        </div>

        <IoMdMenu
          className="sm:hidden text-lg mr-4 cursor-pointer "
          onClick={() => setToggle(!toggle)}
        />
        {toggle && (
          <div
            onClick={() => setToggle(false)}
            className="top-0 left-0 bg-black/10 absolute w-full h-screen backdrop-blur-[1px]"
          ></div>
        )}
        <div
          className={`  sm:hidden absolute w-[250px] h-screen bg-slate-600 top-0 transition-all ${
            toggle ? "left-0" : "left-[-250px]"
          } text-white `}
        >
          <div className="flex flex-col p-8 ">
            <Link to="/sign-in-user">Sign up</Link>
            <Link to="/login">Login</Link>
            <Link to="/sign-in-servicer">Become a Servicer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
