import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CategoryCard = ({ service }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex w-[350px] mb-4 border rounded-md p-3 mx-4 flex-col shadow-md ">
      <img src={service.image} className="rounded-md h-[150px]" alt="" />
      <h4 className="font-semibold text-2xl mt-2"> {service.title} </h4>
      <p className=""> {service.description} </p>
      <div className="self-end">
        {currentUser?._id && (
          <button className="bg-blue-600 text-white px-6 py-2 rounded-2xl">
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
