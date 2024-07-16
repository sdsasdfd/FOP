import React, { useState } from "react";
import Logo from "./Logo";
import { IoMenu } from "react-icons/io5";

import { MdDashboard } from "react-icons/md";

import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus, TbH1 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../store/userSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      console.log(error.message);
    }
  };
  return (
    <div className=" md:hidden  px-6 flex items-center justify-between max-w-full border-b shadow-md sticky top-0 z-30 bg-white ">
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
        <div className="px-4">
          <Logo />
          <div className="pl-2 mt-4">
            <div className="cursor-pointer my-2">
              <span className=" text-[12px] text-gray-400">MAIN</span>
              <Link to="/" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <MdDashboard className=" text-lg" />
                  Dashboard
                </span>
              </Link>
            </div>
            <div className="cursor-pointer">
              <span className=" text-[12px] text-gray-400">LISTS</span>
              <Link to="users" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <HiMiniUsers className=" text-lg" />
                  Users
                </span>
              </Link>
              <Link to="servicers" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <GrUserWorker className=" text-lg" />
                  Servicers
                </span>
              </Link>
              <Link to="category" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <TbCategoryPlus className=" text-lg" />
                  Category
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
              <span className=" text-[12px] text-gray-400">USER</span>
              <Link to="profile" onClick={() => setToggle(false)}>
                <span className=" text-blue-500 hover:bg-blue-100 p-2 flex items-center gap-2">
                  <FaRegUserCircle className=" text-lg" />
                  Profile
                </span>
              </Link>
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

export default Navbar;
