import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Widget = ({ bgColor, link, icon, values, see, text }) => {
  return (
    <div className=" flex flex-col border flex-1 p-3 rounded-md shadow-lg bg-white">
      <span className=" text-gray-400 ">{text}</span>
      <span className=" text-3xl">{values}</span>
      <div className="flex justify-between items-center">
        <Link className="hover:underline hover:text-blue-500" to={link}>
          {see}
        </Link>
        <span className={`${bgColor} rounded-md`}>{icon}</span>
      </div>
    </div>
  );
};

export default Widget;
