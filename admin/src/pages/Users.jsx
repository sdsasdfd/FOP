import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import img from "../assets/profileImg.webp";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/get-users");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }
        setUsers(data.users);
        // console.log(users);
      } catch (error) {
        consol.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`/api/user/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }

      setUsers(users.filter((user) => user._id !== id));
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex-1 p-5 bg-slate-50 min-h-screen">
      <div className="p-4 bg-white flex-1 shadow-md rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Users</h1>
        <div className="overflow-auto">
          <table className=" rounded-lg w-full  ">
            <thead className="border-b">
              <tr className="text-left">
                <td className="font-semibold p-3">ID</td>
                <td className="font-semibold p-3">User</td>
                <td className="font-semibold p-3">Email</td>
                <td className="font-semibold p-3">Location</td>
                <td className="font-semibold p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className=" border-b hover:bg-gray-100">
                  <td className="w-32 p-3">{user._id}</td>
                  <td className=" p-3 flex items-center gap-3">
                    <img
                      className="w-9 object-cover rounded-full"
                      src={img}
                      alt=""
                    />
                    <span> {user.username} </span>
                  </td>
                  <td className=" p-3"> {user.email} </td>
                  <td className=" p-3"> {user.location} </td>
                  <td className=" p-3 flex gap-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
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

export default Users;
