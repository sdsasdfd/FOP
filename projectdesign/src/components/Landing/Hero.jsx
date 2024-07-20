import React from "react";
import { Link } from "react-router-dom";
const bgImage = "/img/bg1.jpg";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="flex bg-cover h-[calc(100vh-4rem)] bg-center gap-4 px-4 sm:px-8 md:px-14 lg:px-24    "
    >
      <div className=" mt-28 sm:mt-24">
        <h4 className=" sm:text-[56px] text-[40px] font-bold sm:font-[700]  ">
          How work <br /> should work
        </h4>
        <p className="my-4 font-medium text-[17px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, vel.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, vero.
        </p>
        <Link to="/register">
          <button
            className="px-5 font-medium text-white bg-blue-600 hover:bg-blue-500 py-3 text-[17px] gap-3 rounded-md flex items-center

        "
          >
            <span>Get Started</span> <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
