import React, { useState } from "react";

import { IoMenu } from "react-icons/io5";
import profileImg from "/img/profileImg.webp";
import Logo from "../Logo/Logo";

import { BsClipboard2CheckFill } from "react-icons/bs";

import { TbCategoryPlus, TbH1 } from "react-icons/tb";

import { MdOutlineMessage } from "react-icons/md";

import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { logoutSuccess } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

const ServicerNavbar = () => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" md:hidden py-2 px-6 flex items-center justify-between max-w-full border-b shadow-md sticky top-0 z-30 bg-white ">
      <Logo />
      <div className=" flex items-center gap-1">
        <button onClick={() => setToggle(true)}>
          <IoMenu size={26} className=" text-blue-700" />
        </button>
        <div
          className="hover:bg-blue-100 px-2 rounded-md py-[1px]   cursor-pointer relative flex items-center gap-3"
          onClick={() => setToggleProfile(!toggleProfile)}
        >
          {" "}
          <img
            src={currentUser.image || profileImg}
            className="w-12 cursor-pointer object-cover rounded-full h-12"
            alt=""
          />
          <div className="hidden sm:flex flex-col">
            <span className=" font-semibold text-lg">
              {currentUser.username}
            </span>
            <span className=" text-sm">{currentUser.location}</span>
          </div>
          {toggleProfile && (
            <div className=" absolute right-[-15px] top-14 w-[150px] h-[95px] bg-white shadow-lg flex flex-col items-center border pt-2 rounded-md ">
              {" "}
              <Link
                className=" font-semibold border px-2 py-1 rounded-md cursor-pointer bg-gray-100"
                onClick={() => setToggleProfile(false)}
                to={"/"}
              >
                View Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md mt-3 "
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      {toggle && (
        <div
          onClick={() => setToggle(false)}
          className="top-0 left-0 cursor-pointer bg-black/10 absolute w-full h-screen backdrop-blur-[1px]"
        ></div>
      )}
      <div
        className={` md:hidden absolute w-[250px] h-screen z-20 bg-white top-0 transition-all ${
          toggle ? "left-[-10px]" : "left-[-280px]"
        } text-white `}
      >
        <div className="px-2">
          <Logo />
          <div className="pl-2 mt-4">
            <div className="cursor-pointer my-2">
              <span className=" text-[12px] text-gray-400">MAIN</span>
              <NavLink
                to="/servicer-home"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
                end
              >
                {/* <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2"> */}
                <FaRegUserCircle className=" text-lg" />
                Profile
                {/* </span> */}
              </NavLink>
            </div>
            <div className="cursor-pointer">
              <span className=" text-[12px] text-gray-400">LISTS</span>
              <NavLink
                to="request"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
              >
                <MdOutlineMessage className=" text-lg" />
                Requests
              </NavLink>
              <NavLink
                to="message-info"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
              >
                <MdOutlineMessage className=" text-lg" />
                Message
              </NavLink>
              <NavLink
                to="edit-gig"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
              >
                <TbCategoryPlus className=" text-lg" />
                Gig
              </NavLink>
            </div>

            <div className="cursor-pointer my-2">
              <span className=" text-[12px] text-gray-400">ACTIONS</span>
              <NavLink
                to="faq"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
              >
                <BsClipboard2CheckFill className=" text-lg" />
                FAQ
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2"
              >
                <TbLogout className=" text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicerNavbar;
