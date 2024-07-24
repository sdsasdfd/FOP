import React, { useState } from "react";

import { Link, useNavigate, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

import logo from "../assets/logo.png";
import profileImg from "/img/profileImg.webp";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { logoutSuccess } from "../store/userSlice";
const NavbarPerson = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
      }

      if (res.ok) {
        dispatch(logoutSuccess());
        toast.success("logging out...");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2 z-30 sticky top-0 bg-slate-50 border-b-[2px]  ">
      <div className="container relative lg:mx-8 sm:mx-6 mx-auto  flex justify-between items-center ">
        <Link to="." className="flex items-center gap-2">
          <img src={logo} width="64px" alt="" />
          <p className=" text-2xl font-semibold text-blue-600">
            Serve <span className=" text-blue-400">Ease</span>
          </p>
        </Link>
        <div className=" flex items-center gap-4">
          <div className="hidden gap-5 mr-4 md:flex  items-center ">
            <NavLink
              to="/user-home"
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white   py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="services"
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
            >
              Services
            </NavLink>

            <NavLink
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              to="message-info"
            >
              Messages
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              to="request"
            >
              Requests
            </NavLink>
          </div>
          <div className="flex  items-center">
            <div className="flex items-center gap-3">
              <IoMdMenu
                className="md:hidden block text-lg  cursor-pointer "
                onClick={() => setToggle(!toggle)}
              />

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
                <div className="hidden  sm:flex flex-col">
                  <span className=" font-semibold text-lg">
                    {currentUser.username}
                  </span>
                  <span className=" text-sm">{currentUser.location}</span>
                </div>
                {toggleProfile && (
                  <div className=" absolute right-[-5px] top-14 w-[150px] h-[95px] bg-white shadow-lg flex flex-col items-center border pt-2 rounded-md ">
                    {" "}
                    <Link
                      className=" font-semibold border px-2 py-1 rounded-md cursor-pointer bg-gray-100"
                      onClick={() => setToggleProfile(false)}
                      to={"user-profile"}
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
          </div>
        </div>

        {/* Sidebar */}
        {toggle && (
          <div
            onClick={() => setToggle(false)}
            className="top-0 left-0 bg-black/10 absolute cursor-pointer w-full h-screen backdrop-blur-[1px]"
          ></div>
        )}
        <div
          className={` md:hidden absolute w-[250px] h-screen bg-slate-50 top-0 transition-all ${
            toggle ? "left-[-10px]" : "left-[-300px]"
          } text-white `}
        >
          <div className="flex flex-col gap-6 px-4 py-8 ">
            <NavLink
              onClick={() => setToggle(false)}
              to="/user-home"
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              end
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setToggle(false)}
              to="services"
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
            >
              Services
            </NavLink>

            <NavLink
              onClick={() => setToggle(false)}
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              to="message-info"
            >
              Messages
            </NavLink>
            <NavLink
              onClick={() => setToggle(false)}
              className={({ isActive }) => {
                return `text-blue-500 text-[18px]  font-medium ${
                  isActive
                    ? "bg-blue-500 text-white  py-[2px] px-[4px] rounded-md"
                    : ""
                }`;
              }}
              to="request"
            >
              Requests
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPerson;
