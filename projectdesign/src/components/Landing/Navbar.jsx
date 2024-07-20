import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import Logo from "../Logo";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="  py-2 px-4 sm:px-8 md:px-14 lg:px-16 flex items-center justify-between max-w-full border-b shadow-md sticky top-0 z-30 bg-white  ">
      <Logo />
      <div className=" lg:px-8 sm:px-6  p-2 flex  items-center ">
        <div className=" hidden sm:flex gap-3 mr-4">
          <Link
            className="text-blue-500 text-[18px]  font-medium"
            to="/register"
          >
            Register
          </Link>
          <Link className="text-blue-500 text-[18px]  font-medium" to="/login">
            Login
          </Link>
          <Link
            className="text-blue-500 text-[18px]  font-medium"
            to="/services"
          >
            Services
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
          className={`  sm:hidden absolute w-[250px] h-screen bg-slate-50 top-0 transition-all ${
            toggle ? "left-0" : "left-[-250px]"
          } text-white `}
        >
          <div className="flex flex-col p-6 ">
            <Link
              className="bg-blue-500 text-white  py-[2px] px-[6px] hover:bg-blue-400 rounded-md text-[18px] mt-4"
              to="/sign-in-user"
            >
              Sign up
            </Link>
            <Link
              className="bg-blue-500 text-white  py-[2px] px-[6px] hover:bg-blue-400 rounded-md text-[18px] mt-4 "
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-blue-500 text-white  py-[2px] px-[6px] hover:bg-blue-400 rounded-md text-[18px] mt-4 "
              to="/services"
            >
              Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
