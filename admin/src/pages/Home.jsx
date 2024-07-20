import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { GrUserWorker } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { SiFuturelearn } from "react-icons/si";

import Widget from "../components/Widget";

const Home = () => {
  const [categoriesNumbers, setCategoriesNumbers] = useState(0);
  const [usersNumbers, setUsersNumbers] = useState(0);
  const [servicersNumbers, setServicersNumbers] = useState(0);
  const [accountDetails, setAccountDetails] = useState(null);
  const [earning, setEarning] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/service/all-services");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setCategoriesNumbers(data.categoryNumber);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();

    const fetchAccountDetails = async () => {
      try {
        const res = await fetch("/api/account/get-account-details");
        const data = await res.json();
        setAccountDetails(data);
        setEarning(data.earning);
        console.log(data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/get-users");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setUsersNumbers(data.usersLength);
      } catch (error) {
        consol.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/get-servicers");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setServicersNumbers(data.servicersLength);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const num = 3.4544;
  console.log(num.toFixed(2));

  return (
    <div className="pt-4 px-4 flex-1 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ">
        <Widget
          bgColor="bg-red-200"
          icon={<FaUser className="text-red-800 m-2 text-lg" />}
          values={usersNumbers}
          text="Users"
          see="see all users"
          link="/users"
        />
        <Widget
          bgColor="bg-yellow-200"
          icon={<GrServices className="text-yellow-800 m-2 text-lg" />}
          values={categoriesNumbers}
          text="Services"
          see="see all category"
          link="/services"
        />
        <Widget
          bgColor="bg-green-200"
          icon={<GrUserWorker className="text-green-800 m-2 text-lg" />}
          values={servicersNumbers}
          text="Servicer"
          see="see all servicer"
          link="/servicers"
        />

        <div className="flex flex-col border h-[120px] flex-1 p-3 rounded-md shadow-lg bg-white">
          <span className=" text-gray-400 ">Earning</span>
          <div className="flex items-center justify-between mt-auto">
            <span className=" rounded-md bg-purple-300">
              <SiFuturelearn className="text-purple-500 text-lg  m-2" />
            </span>
            <span className=" text-2xl mt-auto"> {earning?.toFixed(2)} </span>
          </div>
        </div>
        <div className="flex flex-col  border flex-1 h-[120px] p-3 rounded-md shadow-lg bg-white">
          <span className=" text-gray-400 ">Balance</span>
          <div className="flex items-center justify-between mt-auto">
            <span className=" rounded-md bg-blue-300">
              <IoWalletOutline className="text-blue-500 text-lg  m-2" />
            </span>
            <span className=" text-2xl mt-auto">
              Rs {accountDetails?.balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
