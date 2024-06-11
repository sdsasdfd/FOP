import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "/img/profileImg.webp";
import { CiLocationOn } from "react-icons/ci";
import EditProfile from "../../components/User/EditProfile";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [toggleModal, setToggleModal] = useState(false);
  // const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await fetch("/api/users/current-user");
  //     const data = await res.json();
  //     setUser(data);
  //     console.log(data);
  //   };
  //   fetchUser();
  // }, []);

  // const logoutHandler = async () => {
  //   const res = await fetch("/api/auth/logout");
  //   const data = await res.json();
  //   setUser(null);
  //   navigate("/");
  // };
  return (
    <div className=" container mx-auto auto md:px-10 px-6 bg-slate-100 mt-8">
      <h1 className=" text-3xl font-bold">Profile</h1>
      <div className="flex border lg:justify-between justify-normal flex-col lg:flex-row my-4 shadow-md p-4 md:pb-8  rounded-md bg-white relative ">
        <div className="flex md:justify-normal justify-around items-center mb-4 gap-6 mt-8">
          <img
            src={profileImg}
            className="md:w-32 md:h-32 w-28 h-28 object-cover rounded-full"
            alt=""
          />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div className="flex flex-col">
              <span className=" text-gray-500 text-md">Username</span>
              <span className=" font-semibold text-lg">
                {" "}
                {currentUser.username}{" "}
              </span>
            </div>
            <div className="flex flex-col">
              <span className=" text-gray-500 text-md">Email</span>
              <span className=" font-semibold text-lg">
                {currentUser.email}{" "}
              </span>
            </div>
            <div className="flex flex-col">
              <span className=" text-gray-500 text-md">Location</span>
              <span className=" font-semibold text-lg">
                {" "}
                {currentUser.location}{" "}
              </span>
            </div>
            <div>
              <button
                onClick={() => setToggleModal(true)}
                className=" bg-blue-500 hover:bg-blue-400 py-2 text-white px-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className=" mt-8 pb-4 md:mt-auto md:mr-6">
          <span className=" p-2 text-[16px] rounded-md">
            Account Balance:{" "}
            <span className=" font-medium text-lg">50,000$</span>
          </span>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-3xl font-bold">Transaction History</h2>
        <div className="mt-4">
          <table className="w-full text-left">
            <thead className=" bg-slate-200">
              <tr className="border-b">
                <th className=" p-3">Category Name</th>
                <th className="p-3">Date</th>
                <th className="w-24  p-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-semibold">Plumbing</td>

                <td className="p-3">23/2/2024</td>
                <td className="p-3">12,000</td>
              </tr>
              <tr className="p-3">
                <td className="p-3 font-semibold">Tv mounting</td>
                <td className="p-3">12/1/2023</td>
                <td className="p-3">1220</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {toggleModal && <EditProfile setToggleModal={setToggleModal} />}
    </div>
  );
};

export default UserProfile;
