import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const bgImage = "/img/bgImg.jpg";
const CategoryCard = ({ category }) => {
  return (
    <div className="flex w-[250px] sm:w-[300px]  border rounded-md p-3 mx-4 flex-col ">
      <img src={category.image} className="rounded-md " alt="" />
      <h4 className="font-semibold text-2xl mt-2"> {category.title} </h4>
      <p className=""> {category.description} </p>
      <div className="self-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-2xl">
          Select
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
