import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import img from "../assets/profileImg.webp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hiddenSidebar, showSidebar } from "../store/toggleSidebar";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  return (
    <div className="border-b h-[50px] flex p-1 flex-1 justify-between items-center px-6">
      <CiMenuFries className="sm:hidden block" />

      {/* <IoCloseSharp className="" /> */}

      <Link to="profile" className="flex gap-2">
        <img src={img} className="sm:self-end h-9 w-9 rounded-full" alt="" />
        <span> {currentUser.username} </span>
      </Link>
    </div>
  );
};

export default Navbar;
