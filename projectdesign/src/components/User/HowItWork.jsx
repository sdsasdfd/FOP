import React from "react";

const HowItWork = () => {
  return (
    <div className="px-6 sm:px-14  my-8">
      <h2 className="lg:px-16 text-4xl md:text-5xl mb-8 font-bold">
        How it Work
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-8 lg:px-20">
        <div className=" flex mb-8 lg:w-[420px] md:w-[350px] sm:w-[250px]   flex-col gap-3">
          <span className=" w-14 h-14 flex items-center justify-center text-white rounded-full text-2xl bg-blue-500 ">
            1
          </span>
          <h2 className=" font-semibold text-2xl">Choose a Category </h2>
          <p className=" font-medium text-gray-500">
            Choose a Service Provider by price, skills, and reviews.
          </p>
        </div>
        <div className=" flex mb-8 lg:w-[420px] md:w-[350px] sm:w-[250px]   flex-col gap-3">
          <span className=" w-14 h-14 flex items-center justify-center text-white rounded-full text-2xl bg-blue-500 ">
            2
          </span>
          <h2 className=" font-semibold text-2xl">Select Service Provider</h2>
          <p className=" font-medium text-gray-500">
            Make a service request to Service Provider.
          </p>
        </div>
        <div className=" flex mb-8 lg:w-[420px] md:w-[350px] sm:w-[250px]   flex-col gap-3">
          <span className=" w-14 h-14 flex items-center justify-center text-white rounded-full text-2xl bg-blue-500 ">
            3
          </span>
          <h2 className=" font-semibold text-2xl">
            Chat with Service Provider
          </h2>
          <p className=" font-medium text-gray-500">
            Chat with Service Provider to schedule the task.
          </p>
        </div>
        <div className=" flex mb-8 lg:w-[420px] md:w-[350px] sm:w-[250px]   flex-col gap-3">
          <span className=" w-14 h-14 flex items-center justify-center text-white rounded-full text-2xl bg-blue-500 ">
            4
          </span>
          <h2 className=" font-semibold text-2xl">Proceed to payment</h2>
          <p className=" font-medium text-gray-500">
            Pay and review the Provider after task
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
