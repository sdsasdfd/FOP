import React from "react";
import { Link } from "react-router-dom";

const img =
  "https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale,w_440,h_300,f_auto,q_auto,dpr_2.0/brontes/hero/searching-talent@2x.png";
const Hero = () => {
  return (
    <div className="flex gap-4     ">
      <div className=" sm:mt-20 ">
        <h4 className=" sm:text-[40px] text-[24px] font-semibold sm:font-bold  ">
          How work <br /> should work
        </h4>
        <p className="my-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, vel.
        </p>
        <Link to="/register">
          <button
            className="px-3 text-white bg-blue-600 py-1 rounded-lg

        "
          >
            Get Started
          </button>
        </Link>
      </div>
      <div className="hidden sm:flex">
        <img src={img} className=" h-[400px] " alt="" />
      </div>
    </div>
  );
};

export default Hero;
