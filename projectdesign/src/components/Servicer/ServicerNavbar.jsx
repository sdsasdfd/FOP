import React, { useState } from "react";

import { IoMenu } from "react-icons/io5";
import Logo from "../Logo/Logo";

import { MdDashboard } from "react-icons/md";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus, TbH1 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";

import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { logoutSuccess } from "../../store/userSlice";

const ServicerNavbar = () => {
  const [toggle, setToggle] = useState(false);
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
    <div className=" md:hidden px-6 flex items-center justify-between max-w-full border-b shadow-md sticky top-0 z-30 bg-white ">
      <Logo />
      <button onClick={() => setToggle(true)}>
        <IoMenu size={26} className=" text-blue-700" />
      </button>
      {toggle && (
        <div
          onClick={() => setToggle(false)}
          className="top-0 left-0 bg-black/10 absolute w-full h-screen backdrop-blur-[1px]"
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
              <Link to="/servicer-home">
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <FaRegUserCircle className=" text-lg" />
                  Profile
                </span>
              </Link>
            </div>
            <div className="cursor-pointer">
              <span className=" text-[12px] text-gray-400">LISTS</span>
              <Link to="message-info">
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <MdOutlineMessage className=" text-lg" />
                  Message
                </span>
              </Link>
              <Link to="edit-gig">
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <TbCategoryPlus className=" text-lg" />
                  Gig
                </span>
              </Link>
              <Link to="faq" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2">
                  <BsClipboard2CheckFill className=" text-lg" />
                  FAQ
                </span>
              </Link>
            </div>

            <div className="cursor-pointer my-2">
              <span className=" text-[12px] text-gray-400">ACTIONS</span>

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
