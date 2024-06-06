import React, { useState } from "react";

import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

import logo from "../assets/logo.jpeg";
import profileImg from "/img/profileImg.webp";
const NavbarPerson = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  return (
    <div className="px-2 relative border-b-[2px]  ">
      <div className="container lg:px-8 sm:px-6 mx-auto p-2 flex justify-between items-center ">
        <Link to=".">
          <img src={logo} width="64px" alt="" />
        </Link>
        <div className="flex  items-center">
          <div className="hidden gap-3 mr-4 sm:flex ">
            <Link to="message-info">Messages</Link>
            <Link>Orders</Link>
          </div>

          <div className="flex items-center gap-3">
            <IoMdMenu
              className="sm:hidden block text-lg  cursor-pointer "
              onClick={() => setToggle(!toggle)}
            />
            <div className=" relative">
              {" "}
              <img
                src={profileImg}
                onClick={() => setToggleProfile(!toggleProfile)}
                className="w-8 cursor-pointer rounded-full h-8"
                alt=""
              />{" "}
              {/* sidebar */}{" "}
              {toggleProfile && (
                <div className=" absolute right-[-20px] top-9 w-[150px] h-[95px] bg-white shadow-lg flex flex-col items-center border pt-2 rounded-md ">
                  {" "}
                  <Link
                    className=" font-semibold border px-2 py-1 rounded-md cursor-pointer bg-gray-100"
                    onClick={() => setToggleProfile(false)}
                    to="user-profile"
                  >
                    View Profile
                  </Link>
                  <button className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md mt-3 ">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {toggle && (
          <div
            onClick={() => setToggle(false)}
            className="top-0 left-0 bg-black/10 absolute w-full h-screen backdrop-blur-[1px]"
          ></div>
        )}
        <div
          className={` sm:hidden absolute w-[250px] h-screen bg-slate-600 top-0 transition-all ${
            toggle ? "left-0" : "left-[-250px]"
          } text-white `}
        >
          <div className="flex flex-col p-8 ">
            <Link to="message-info">Messages</Link>
            <Link to="">Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPerson;
