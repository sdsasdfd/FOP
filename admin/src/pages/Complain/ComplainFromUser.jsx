import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
const ComplainFromUser = () => {
  const [complains, setComplains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeneralComplain = async () => {
      try {
        const res = await fetch("/api/complain/get-servicer-complains");

        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.log(data.message);
          return;
        }
        setComplains(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fetchGeneralComplain();
  }, []);
  return (
    <>
      {complains.length === 0 ? (
        <h1>No Complains available</h1>
      ) : (
        <div className=" bg-white shadow-lg  rounded-md  overflow-auto">
          <table className="  w-full   ">
            <thead className="border-b">
              <tr>
                <td className="font-semibold p-3 whitespace-nowrap ">No.</td>
                <td className="font-semibold p-3">Username</td>
                <td className="font-semibold p-3 whitespace-nowrap">
                  Complain
                </td>
                <td className="font-semibold p-3 whitespace-nowrap">
                  Servicer Name
                </td>
                <td className="font-semibold p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {complains.map((complain, index) => {
                return (
                  <tr
                    key={complain._id}
                    className=" border-b hover:bg-gray-100 whitespace-nowrap"
                  >
                    <td className=" p-3  whitespace-nowrap"> {index + 1} </td>
                    <td className=" p-3  ">{complain.userId.username}</td>
                    <td className=" p-3 ">{complain.complainDesc}</td>
                    <td className=" p-3 ">{complain.servicerId.username}</td>

                    <td className=" p-3 items-center gap-4 ">
                      <Link to={`/complain/${complain.servicerId._id}`}>
                        <button className=" text-blue-600 mr-4 flex items-center gap-2">
                          <FiEdit size={22} />{" "}
                          <span className=" text-[16px]">Email</span>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ComplainFromUser;
