import React from "react";
import GeneralComplain from "./GeneralComplain";
import ComplainFromUser from "./ComplainFromUser";

const Complain = () => {
  return (
    <>
      <div className=" md:mx-8  p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">General Complain</h1>
          </div>
        </div>
        <GeneralComplain />
      </div>
      <div className=" md:mx-8  p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">Complain from User</h1>
          </div>
        </div>
        <ComplainFromUser />
      </div>
    </>
  );
};

export default Complain;
