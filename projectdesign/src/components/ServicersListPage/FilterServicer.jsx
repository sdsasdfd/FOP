import React from "react";

const FilterServicer = () => {
  return (
    <div className="flex w-full border md:w-[230px] lg:w-[280px]  md:flex-col rounded-lg md:gap-2 gap-6 p-3 md:items-start items-center">
      <span className="font-semibold text-lg">Sorted by:</span>

      <select className="rounded-lg md:px-1 outline-none border py-2 ">
        <option>recommended options</option>
        <option>Price (Lowest to Highest)</option>
        <option>Price (Highest to lowest)</option>
      </select>
    </div>
  );
};

export default FilterServicer;
