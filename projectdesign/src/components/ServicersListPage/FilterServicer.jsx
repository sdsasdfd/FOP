import React, { useEffect, useState } from "react";

const FilterServicer = ({ sortingOption, setSortingOption }) => {
  return (
    <div className="flex w-full border md:w-[230px] lg:w-[280px]  md:flex-col rounded-lg md:gap-2 gap-6 p-3 md:items-start items-center">
      <span className="font-semibold text-lg">Sorted by:</span>

      <select
        className="rounded-lg md:px-1 outline-none border py-2 "
        value={sortingOption}
        onChange={(e) => setSortingOption(e.target.value)}
      >
        <option value="">recommended options</option>
        <option value="asc">Price (Lowest to Highest)</option>
        <option value="desc">Price (Highest to lowest)</option>
      </select>
    </div>
  );
};

export default FilterServicer;
