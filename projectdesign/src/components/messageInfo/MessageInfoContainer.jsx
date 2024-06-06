import React from "react";
import { Link } from "react-router-dom";

const MessageInfoContainer = () => {
  return (
    <>
      <div className="hidden md:block mt-6">
        <table className="w-full text-left">
          <thead className="">
            <tr className="border-b">
              <th className="w-32 p-3">Name</th>
              <th className="p-3">Message</th>
              <th className="w-24  p-3">Time</th>
              <th className=" w-28  p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-3 font-semibold">Unas Mirza</td>
              <td className="p-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, recusandae!
              </td>
              <td className="p-3">12:20 am</td>
              <td className="p-3">
                <Link to={`conversation`}>
                  <button className=" bg-blue-500 py-3 rounded-lg w-[70px] text-white">
                    Read
                  </button>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="p-3">Unas Mirza</td>
              <td className="p-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus, recusandae!
              </td>
              <td className="p-3">12:20 am</td>
              <td className="p-3">
                <Link to={`conversation`}>
                  <button className=" bg-blue-500 py-3 rounded-lg w-[70px] text-white">
                    Read
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* // for small devices */}
      <div className="md:hidden mt-6 gap-4 grid grid-col-1 sm:grid-cols-2">
        <div className="flex flex-col p-4 rounded-lg shadow">
          <div className="flex justify-between mb-2 ">
            <span className="text-lg font-semibold">Mirza Unas</span>
            <span className="font-semibold">12:23 am</span>
          </div>
          <p>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
            tenetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Sint, hic!
          </p>
          <div>
            <Link to={`conversation`}>
              <button className=" bg-blue-500 py-2 w-[70px] rounded-lg text-white mt-4">
                Read
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-lg shadow">
          <div className="flex justify-between mb-2 ">
            <span className="text-lg font-semibold">Mirza Unas</span>
            <span className="font-semibold">12:23 am</span>
          </div>
          <p>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
            tenetur. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Sint, hic!
          </p>
          <div>
            <Link to={`conversation`}>
              <button className=" bg-blue-500 py-2 w-[70px] rounded-lg text-white mt-4">
                Read
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageInfoContainer;
