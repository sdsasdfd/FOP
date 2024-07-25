import React, { useState, useEffect } from "react";
import CategoryCard from "../User/CategoryCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const OurServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/service/all-services");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setServices(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);
  return (
    <div className=" bg-slate-50 my-14 px-1 sm:px-8 md:px-14 lg:px-24">
      <div className=" flex flex-col gap-1 text-center">
        <span className=" font-[400] text-lg text-sky-500">
          AREA WHAT WE SERVE
        </span>
        <span className=" text-5xl font-bold">Our Services</span>
      </div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  mt-10">
        {services?.slice(0, 3)?.map((service) => (
          <div key={service._id}>
            <CategoryCard service={service} />
          </div>
        ))}
      </div>

      <div className=" grid place-items-center my-10">
        <Link
          to={"services"}
          className=" px-5 font-medium text-white bg-sky-800 hover:bg-sky-700 py-3 text-[17px] gap-3 rounded-md flex items-center"
        >
          <span>See All Services</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OurServices;
