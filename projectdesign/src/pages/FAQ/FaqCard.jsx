import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const FaqCard = ({ answer, question }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className=" mt-8 border-[1px] rounded-md border-slate-300 shadow-lg p-4    cursor-pointer mb-4"
      onClick={() => setToggle(!toggle)}
    >
      <div className=" flex sm:items-center gap-6 justify-between ">
        <span className=" font-semibold text-slate-800 text-[24px]">
          {question}
        </span>
        {toggle ? (
          <button className=" hover:bg-blue-600 w-8 flex h-8 justify-center items-center rounded-md hover:text-white text-blue-600 ">
            <FaMinus size={20} />
          </button>
        ) : (
          <button className=" hover:bg-blue-600 w-8 flex h-8 justify-center items-center rounded-md hover:text-white text-blue-600  ">
            <FaPlus className="text-center" size={20} />
          </button>
        )}
      </div>
      {toggle && (
        <p className=" text-[18px] w-full mt-5 text-blue-600">{answer}</p>
      )}
    </div>
  );
};

export default FaqCard;
