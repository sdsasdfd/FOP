import React, { useEffect, useState } from "react";
import moment from "moment";
const UserRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/request/get-requests-user");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }
        console.log(data);
        setRequests(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
      <h1 className="text-3xl font-semibold">Request</h1>
      <div className="w-full mt-6">
        <table className="w-full table text-left">
          <thead>
            <tr>
              <th className=" w-44 p-3">Servicer Name</th>
              <th className=" w-46 p-3">Status</th>
              <th className=" w-40 p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              let status;
              if (request.requestStatus === "accepted") {
                status = "bg-blue-200 text-blue-600";
              } else if (request.requestStatus === "rejected") {
                status = "bg-red-200 text-red-600";
              } else {
                status = "bg-purple-200 text-purple-600";
              }

              return (
                <tr key={request._id}>
                  <td className="p-3">{request.servicer.username} </td>
                  <td className="p-3 ">
                    <span
                      className={`${status} px-3 py-1 rounded-md font-medium text-[16px]`}
                    >
                      {request.requestStatus}
                    </span>
                  </td>
                  <td className="p-3">{moment(request.createdAt).fromNow()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequest;
