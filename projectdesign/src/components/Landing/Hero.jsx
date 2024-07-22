import React from "react";
import { Link } from "react-router-dom";
const bgImage = "/img/bg1.jpg";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="flex px-4 md:px-14 h-[calc(100vh-30vh)] md:h-[calc(100vh-20vh)] ">
      <div className=" flex-1 mt-28 sm:mt-24">
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
      <div className=" md:block flex-1 hidden">
        <img
          className=" w-full blur-[2px] h-full brightness-90 bg-cover"
          src={bgImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
