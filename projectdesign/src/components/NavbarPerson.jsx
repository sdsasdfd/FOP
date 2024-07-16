import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

import logo from "../assets/logo.jpeg";
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
      <div className="container relative lg:px-8 sm:px-6 mx-auto p-2 flex justify-between items-center ">
        <Link to="." className="flex items-center gap-2">
          <img src={logo} width="64px" alt="" />
          <p className=" text-2xl font-semibold text-blue-600">
            Serve <span className=" text-blue-400">Ease</span>
          </p>
        </Link>
        <div className="flex  items-center">
          <div className="hidden gap-3 mr-4 sm:flex items-center ">
            <Link
              to="/user-home"
              className=" text-slate-600 text-[18px] font-[400]"
            >
              Home
            </Link>
            <Link
              to="services"
              className=" text-slate-600 text-[18px] font-[400]"
            >
              Services
            </Link>
            <Link to="faq" className=" text-slate-600 text-[18px] font-[400]">
              FAQ
            </Link>
            <Link
              className=" text-slate-600 text-[18px] font-[400]"
              to="message-info"
            >
              Messages
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <IoMdMenu
              className="sm:hidden block text-lg  cursor-pointer "
              onClick={() => setToggle(!toggle)}
            />
            <div className=" relative">
              {" "}
              <img
                src={currentUser.image || profileImg}
                onClick={() => setToggleProfile(!toggleProfile)}
                className="w-10 cursor-pointer object-cover rounded-full h-10"
                alt=""
              />{" "}
              {/* sidebar */}{" "}
              {toggleProfile && (
                <div className=" absolute right-[-20px] top-9 w-[150px] h-[95px] bg-white shadow-lg flex flex-col items-center border pt-2 rounded-md ">
                  {" "}
                  <Link
                    className=" font-semibold border px-2 py-1 rounded-md cursor-pointer bg-gray-100"
                    onClick={() => setToggleProfile(false)}
                    to={
                      currentUser.roles === "servicer"
                        ? "ser-profile"
                        : "user-profile"
                    }
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

        {toggle && (
          <div
            onClick={() => setToggle(false)}
            className="top-0 left-0 bg-black/10 absolute w-full h-screen backdrop-blur-[1px]"
          ></div>
        )}
        <div
          className={` sm:hidden absolute w-[250px] h-screen bg-blue-600 top-0 transition-all ${
            toggle ? "left-[-10px]" : "left-[-280px]"
          } text-white `}
        >
          <div className="flex flex-col p-8 ">
            <Link
              onClick={() => setToggle(false)}
              to="/user-home"
              className="   font-[400]"
            >
              Home
            </Link>
            <Link
              onClick={() => setToggle(false)}
              to="services"
              className="   font-[400]"
            >
              Services
            </Link>
            <Link
              onClick={() => setToggle(false)}
              to="faq"
              className="   font-[400]"
            >
              FAQ
            </Link>
            <Link
              onClick={() => setToggle(false)}
              className="   font-[400]"
              to="message-info"
            >
              Messages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPerson;
