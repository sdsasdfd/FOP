import React from "react";
import { Link } from "react-router-dom";
const bgImage = "/img/Bgimg1.jpg";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="flex px-4 md:px-14 h-[calc(100vh-30vh)] md:h-[calc(100vh-20vh)] ">
      <div className=" flex-1 mt-28 sm:mt-24">
        <h4 className=" sm:text-[56px] text-[40px] font-bold sm:font-[700]  ">
          Making Home <br /> Services Easy
        </h4>
        <p className="my-4 font-medium text-[17px]">
          Experience excellence and convenience with our expert home services,
          including cleaning, mounting, cooking, plumbing, painting and more.
          Our skilled professionals bring top-tier quality to your doorstep.
        </p>
        <Link to="/register">
          <button
            className="px-5 font-medium text-white bg-sky-800 hover:bg-sky-700 py-3 text-[17px] gap-3 rounded-md flex items-center

        "
          >
            <span>Get Started</span> <FaArrowRight />
          </button>
        </Link>
      </div>
      <div className=" md:block flex-1 hidden">
        <img
          className=" w-full object-cover h-full brightness-90 bg-cover"
          src={bgImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
