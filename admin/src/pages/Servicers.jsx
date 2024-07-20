import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import img from "../assets/profileImg.webp";
const Servicers = () => {
  const [servicers, setServicers] = useState([]);
  useEffect(() => {
    const fetchServicers = async () => {
      try {
        const res = await fetch("/api/user/get-servicers");
        const data = await res.json();

        if (data.success === false) {
          consol.log(data.message);
        }
        setServicers(data.servicers);
        // console.log(users);
      } catch (error) {
        consol.log(error.message);
      }
    };
    fetchServicers();
  }, []);

  const handleDeleteServicer = async (id) => {
    try {
      const res = await fetch(`/api/user/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }

      setServicers(servicers.filter((user) => user._id !== id));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex-1 p-5 bg-slate-50 min-h-screen">
      <div className="p-4 bg-white flex-1 shadow-md rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Servicers</h1>
        <div className=" overflow-auto">
          <table className=" rounded-lg w-full  ">
            <thead className="border-b">
              <tr className="text-left">
                <td className="font-semibold p-3">ID</td>
                <td className="font-semibold p-3">User</td>
                <td className="font-semibold p-3">Email</td>
                <td className="font-semibold p-3">Category</td>
                <td className="font-semibold p-3">Location</td>
                <td className="font-semibold p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {servicers.map((servicer) => (
                <tr key={servicer._id} className=" border-b hover:bg-gray-100">
                  <td className="w-32 p-3">{servicer._id}</td>
                  <td className=" p-3 flex items-center gap-3">
                    <img
                      className="w-9 h-9 object-cover rounded-full"
                      src={servicer.image || img}
                      alt=""
                    />
                    <span> {servicer.username} </span>
                  </td>
                  <td className=" p-3"> {servicer.email} </td>
                  <td className=" p-3"> {servicer.category} </td>
                  <td className=" p-3"> {servicer.location} </td>
                  <td className=" p-3 flex gap-2">
                    <button
                      onClick={() => handleDeleteServicer(servicer._id)}
                      className=" text-red-500 text-lg"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Servicers;
