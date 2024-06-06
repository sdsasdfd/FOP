import React from "react";
import { BsSend } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";

const MessageInput = () => {
  return (
    <form className=" my-3">
      <div className="w-full gap-3 flex  border-t-2  items-center  py-2 relative">
        <button className="text-black">
          <CiSquarePlus className="text-3xl  font-bold  " />
        </button>
        <textarea
          className="border w-[80%] h-[100px] outline-none px-2"
          placeholder="write a message"
          cols="30"
          rows="10"
        />
        <button className=" bg-blue-500 text-white py-3 px-6 rounded-lg">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
