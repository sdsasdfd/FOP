import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center  min-h-[500px] bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Profile</h1>
        <form className="flex flex-col">
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Name</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Name..."
              value={currentUser.username}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Email</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Email..."
              value={currentUser.email}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
