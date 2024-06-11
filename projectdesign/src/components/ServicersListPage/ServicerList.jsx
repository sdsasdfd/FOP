import React from "react";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const ServicerList = ({ servicerList }) => {
  const description = servicerList?.gigs[0]?.description;
  const id = servicerList?.gigs[0]?._id;
  const price = servicerList?.gigs[0]?.price;
  // console.log(id);
  // console.log(servicerList);
  return (
    <div className="mb-8 flex  flex-col gap-3 rounded-lg border p-6  shadow-lg">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-400 sm:h-16 sm:w-16 md:h-20 md:w-20 "></div>
        <div className="w-[80%]">
          <div className="flex items-center justify-between">
            <h3 className="mb-1 pl-1 text-xl sm:text-3xl font-semibold">
              {servicerList.username}
            </h3>
            <span className="rounded-md text-sm bg-yellow-300 sm:p-1 p-[2px] sm:text-lg text-yellow-900">
              {price} rs/Hour
            </span>
          </div>
          <div className="mt-3  flex items-center gap-4">
            <span className="rounded-md bg-blue-100 p-[2px] sm:p-1 sm:text-md text-sm text-blue-900">
              {servicerList.category}
            </span>
            <span className="rounded-md flex  sm:text-md sm:p-1 text-sm items-center gap-1 bg-green-100 p-1 text-green-900">
              4.5 <FaStar />
            </span>
            <span className="rounded-md sm:p-1 text-sm bg-indigo-50 p-1 sm:text-md text-indigo-900">
              reviews (1,200)
            </span>
          </div>
        </div>
      </div>
      <div>
        <p className="sm:text-md ml-2 text-slate-600">{description}</p>
      </div>
      <Link to={`${id}`}>
        <button className=" w-full rounded-2xl bg-blue-500 py-1 text-white">
          Visit
        </button>
      </Link>
    </div>
  );
};

export default ServicerList;
