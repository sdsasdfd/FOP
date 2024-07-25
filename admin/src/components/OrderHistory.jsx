import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OrderHistory = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          "/api/transaction/get-transaction-history-for-admin"
        );
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        console.log(data);
        setRecords(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecords();
  }, []);
  return (
    <div className="w-full bg-slate-50 mt-6 ">
      <div className="p-4 bg-white flex-1 shadow-md rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Orders History</h1>
        <div className=" overflow-auto">
          <table className=" rounded-lg w-full  ">
            <thead className="border-b">
              <tr className="text-left">
                <td className="font-semibold p-3">No</td>
                <td className="font-semibold p-3">Username</td>
                <td className="font-semibold flex-1 p-3 ">Servicer Name</td>
                <td className="font-semibold p-3">Service</td>
                <td className="font-semibold p-3">Earn</td>
                <td className="font-semibold p-3">Amount</td>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                const username =
                  record.participantsFromChat?.participants[1].username;
                const servicerName =
                  record.participantsFromChat?.participants[0].username;
                return (
                  <tr key={record._id} className=" border-b hover:bg-gray-100">
                    <td className="w-32 p-3">{index + 1} </td>
                    <td className="w-32 p-3">{username}</td>

                    <td className=" p-3">{servicerName} </td>
                    <td className=" p-3">{record?.categoryName}</td>
                    <td className=" p-3">{record.feeAmount} Rs </td>
                    <td className=" p-3">{record.totalAmount} Rs </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
