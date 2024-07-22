import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const StatusRequests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/request/get-all-requests-for-admin");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }
        setRequests(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStatus();
  }, []);
  return (
    <div className="w-full bg-slate-50 mt-6 ">
      <div className="p-4 bg-white flex-1 shadow-md rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Status Request</h1>
        <div className=" overflow-auto">
          <table className=" rounded-lg w-full  ">
            <thead className="border-b">
              <tr className="text-left">
                <td className="font-semibold p-3">No</td>
                <td className="font-semibold p-3">Username</td>
                <td className="font-semibold flex-1 p-3 ">Servicer Name</td>
                <td className="font-semibold p-3">Status</td>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                let status;
                if (request.requestStatus === "accepted") {
                  status = "bg-blue-200 text-blue-600";
                } else if (request.requestStatus === "rejected") {
                  status = "bg-red-200 text-red-600";
                } else {
                  status = "bg-purple-200 text-purple-600";
                }
                return (
                  <tr key={request._id} className=" border-b hover:bg-gray-100">
                    <td className="w-32 p-3">{index + 1}</td>
                    <td className="w-32 p-3">{request.user.username} </td>

                    <td className=" p-3">{request.servicer.username} </td>
                    <td className=" p-3">
                      <span
                        className={`${status} px-3 py-1 rounded-md font-medium text-[16px]`}
                      >
                        {request.requestStatus}
                      </span>
                    </td>
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

export default StatusRequests;
