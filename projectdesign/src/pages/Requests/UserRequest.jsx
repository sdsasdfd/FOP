import React, { useEffect, useState } from "react";
import moment from "moment";
const UserRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/request/get-all-requests");
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
        <table className="w-full  text-left">
          <thead>
            <tr>
              <th className=" w-44 p-3">Servicer Name</th>
              <th className=" w-46 p-3">Status</th>
              <th className=" w-32 p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="p-3">{request.servicer.username} </td>
                <td className="p-3">{request.requestStatus}</td>
                <td className="p-3">{moment(request.createdAt).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequest;
