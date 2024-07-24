import React from "react";
import Logo from "./Logo";
import { MdDashboard } from "react-icons/md";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import { logoutSuccess } from "../store/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(data.message);
    }
  };

  return (
    <>
      {/* larger Device */}
      <div className="hidden  bg-white md:block w-[280px] border-r min-h-screen">
        <Logo />
        <div className="pl-2 mt-4">
          <div className="cursor-pointer my-2">
            <span className=" text-[12px] text-gray-400">MAIN</span>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
              end
            >
              <MdDashboard className=" text-lg" />
              Dashboard
            </NavLink>
          </div>
          <div className="cursor-pointer">
            <span className=" text-[12px] text-gray-400">LISTS</span>
            <NavLink
              to="users"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <HiMiniUsers className=" text-lg" />
              Users
            </NavLink>
            <NavLink
              to="servicers"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <GrUserWorker className=" text-lg" />
              Servicers
            </NavLink>
            <NavLink
              to="services"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <TbCategoryPlus className=" text-lg" />
              Services
            </NavLink>
            <NavLink
              to="faq"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <BsFillQuestionCircleFill className=" text-lg" />
              FAQ
            </NavLink>
            <NavLink
              to="complain"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <BsClipboard2CheckFill className=" text-lg" />
              Complains
            </NavLink>
            <NavLink
              to="testimonial"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <BsBookmarkPlus className=" text-lg" />
              Testimonials
            </NavLink>
          </div>

          <div className="cursor-pointer my-2">
            <span className=" text-[12px] text-gray-400">ADMIN</span>
            <NavLink
              to="profile"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <FaRegUserCircle className=" text-lg" />
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2"
            >
              <TbLogout className=" text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
