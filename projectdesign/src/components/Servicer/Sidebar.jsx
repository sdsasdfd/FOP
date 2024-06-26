import React from "react";
import Logo from "../Logo";
import { MdDashboard } from "react-icons/md";

import { HiMiniUsers } from "react-icons/hi2";
import { TbCategoryPlus, TbH1 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";

import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const toggle = useSelector((state) => state.toggle);
  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("/api/auth/logout", { method: "POST" });
  //     const data = res.json();
  //     if (data.success === false) {
  //       console.log(data.message);
  //     }
  //     dispatch(logoutSuccess());
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(data.message);
  //   }
  // };
  return (
    <div>
      <div className="hidden md:block w-[220px] border-r h-screen">
        <Logo />
        <div className="pl-2 mt-4">
          <div className="cursor-pointer my-2">
            <span className=" text-[12px] text-gray-400">MAIN</span>
            <Link to="/servicer-home">
              <span className=" text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2">
                <FaRegUserCircle className=" text-lg" />
                Profile
              </span>
            </Link>
          </div>
          <div className="cursor-pointer">
            <span className=" text-[12px] text-gray-400">LISTS</span>
            <Link to="message-info">
              <span className=" text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2">
                <MdOutlineMessage className=" text-lg" />
                Message
              </span>
            </Link>
            <Link to="edit-gig">
              <span className=" text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2">
                <TbCategoryPlus className=" text-lg" />
                Gig
              </span>
            </Link>
          </div>

          <div className="cursor-pointer my-2">
            <span className=" text-[12px] text-gray-400">USER</span>
            <Link to="profile">
              <span className=" text-blue-500 hover:bg-blue-100 p-1 flex items-center gap-2">
                <FaRegUserCircle className=" text-lg" />
                Profile
              </span>
            </Link>
            <button
              // onClick={handleLogout}
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

export default Sidebar;
