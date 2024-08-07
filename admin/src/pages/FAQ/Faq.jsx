import React from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

import FaqForUser from "./FAQForUser/FaqForUser";
import FaqForServicer from "./FAQForServicer/FaqForServicer";

const Faq = () => {
  return (
    <>
      {/* FAQ FOR User */}
      <div className="w-full p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">FAQ for User</h1>
            <Link to="new/user">
              <IoMdAddCircle className="text-blue-600 text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>
        <FaqForUser />
      </div>

      {/* FAQ FOR SERVICER */}
      <div className="w-full p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">FAQ for Servicer</h1>
            <Link to="new/servicer">
              <IoMdAddCircle className="text-blue-600 text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>
        <FaqForServicer />
      </div>
    </>
  );
};

export default Faq;
