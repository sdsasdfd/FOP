import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "/img/profileImg.webp";
import { CiLocationOn } from "react-icons/ci";
import ServicerEditProfile from "../../components/Servicer/ServicerEditProfile";
import { useSelector } from "react-redux";

const SerProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [accountDetails, setAccountDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await fetch("/api/account/get-account-details");
        const data = await res.json();
        setAccountDetails(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();

    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transaction/get-transaction-history");
        const data = await res.json();
        console.log(data);
        setTransactions(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction history: ", error);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" container mx-auto auto md:px-10 px-6 bg-slate-100 mt-8">
      <h1 className=" text-3xl font-bold">Profile</h1>
      <div className="flex border lg:justify-between justify-normal flex-col lg:flex-row my-4 shadow-md p-4 md:pb-8  rounded-md bg-white relative ">
        <div className="flex md:justify-normal justify-around items-center mb-4 gap-6 mt-8">
          <img
            src={currentUser.image || profileImg}
            className="md:w-32 md:h-32 w-28 h-28 object-cover rounded-full "
            alt=""
          />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div className="flex flex-col">
              <span className=" text-gray-500 text-md">Username</span>
              <span className=" font-semibold text-lg">
                {currentUser.username}
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
                {currentUser.location}
              </span>
            </div>
            <div className="flex gap-4">
              <ServicerEditProfile />
            </div>
          </div>
        </div>

        <div className=" mt-8 pb-4 md:mt-auto md:mr-6">
          <span className=" p-2 text-[16px] rounded-md">
            Account Balance:{" "}
            <span className=" font-medium text-lg">
              {accountDetails?.balance.toFixed(2)} Rs
            </span>
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
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="p-3 font-semibold">
                    {transaction.categoryName}
                  </td>
                  <td className="p-3">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">{transaction.netAmount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SerProfile;
