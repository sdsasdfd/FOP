import React from "react";
import Logo from "../Logo/Logo";
import { MdDashboard } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus, TbH1 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import { BsClipboard2CheckFill } from "react-icons/bs";

import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/userSlice";

const ServicerSidebar = () => {
  const navigate = useNavigate();
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
      console.log(data.message);
    }
  };
  return (
    <div>
      <div className="hidden sticky top-0 md:block w-[220px] border-r min-h-full">
        <Logo />
        <div className="pl-2 mt-4">
          <div className="cursor-pointer my-2">
            <span className=" text-[12px] text-gray-400">MAIN</span>
            <NavLink
              to="/servicer-home"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
              end
            >
              <FaRegUserCircle className=" text-lg" />
              Profile
            </NavLink>
          </div>
          <div className="cursor-pointer">
            <span className=" text-[12px] text-gray-400">LISTS</span>
            <NavLink
              to="request"
              className={({ isActive }) => {
                return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                  isActive ? "bg-blue-100 " : ""
                }`;
              }}
            >
              <CiSquareQuestion className=" text-lg" />
              Request
            </NavLink>
            <NavLink
              to="message-info"
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
              className="w-full text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2"
            >
              <TbLogout className=" text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicerSidebar;
