import React, { useState } from "react";
import Logo from "./Logo";
import { IoMenu } from "react-icons/io5";
import profileImg from "../assets/profileImg.webp";
import { MdDashboard } from "react-icons/md";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus, TbH1 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../store/userSlice";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

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
      <div className="flex items-center">
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
          {toggleProfile && (
            <div className=" absolute right-[-15px] top-14 w-[150px] h-[95px] bg-white shadow-lg flex flex-col items-center border pt-2 rounded-md ">
              {" "}
              <Link
                className=" font-semibold border px-2 py-1 rounded-md cursor-pointer bg-gray-100"
                onClick={() => setToggleProfile(false)}
                to={"profile"}
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
              <NavLink
                to="/"
                onClick={() => setToggle(false)}
                className={({ isActive }) => {
                  return ` text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2   ${
                    isActive ? "bg-blue-100 " : ""
                  }`;
                }}
              >
                <MdDashboard className=" text-lg" />
                Dashboard
              </NavLink>
            </div>
            <div className="cursor-pointer">
              <span className=" text-[12px] text-gray-400">LISTS</span>
              <NavLink
                to="users"
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
                onClick={() => setToggle(false)}
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
