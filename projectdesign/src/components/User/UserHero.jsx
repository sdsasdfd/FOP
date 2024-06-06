import React from "react";
const bgImage = "/img/bgImg.jpg";
import { CiSearch } from "react-icons/ci";
const UserHero = () => {
  return (
    <div
      className="bg-cover bg-center h-[calc(100vh-4.5rem)] flex justify-start items-center dark:bg-neutral-700 px-4 sm:pl-14"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex  flex-col">
        <h1 className="text-white text-2xl sm:text-4xl mb-6 font-bold">
          Home Servicer made easy
        </h1>
        <p className="text-white text-[16px] sm:text-[18px] mb-4">
          book top-rates professional for all your home needs
        </p>
        <div className="bg-slate-100 rounded-md flex items-center py-2 px-2 gap-4 sm:w-[400px] md:w-[550px] lg:w-[680px]">
          <CiSearch className="text-2xl" />
          <input
            type="text"
            className="bg-transparent w-[80%] outline-none "
            placeholder="Search..."
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHero;
