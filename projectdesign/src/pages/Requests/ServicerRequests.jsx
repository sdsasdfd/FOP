import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);

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

  const handleRequestStatus = async (status, id) => {
    try {
      const res = await fetch(`/api/request/send-response/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestStatus: status }),
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      console.log(data);
      toast.success("Response Sent!");
      setDisabledButton(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendRequest = async (id) => {
    try {
      const res = await fetch(`/api/message/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await res.json();
      toast.success("Request message send!");
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
      <h1 className="text-3xl font-semibold">Request</h1>
      <div className="w-full mt-6">
        <table className="w-full  text-left">
          <thead>
            <tr>
              <th className=" w-32 p-3">Username</th>
              <th className=" w-46 p-3">Messages</th>
              <th className=" w-32 p-3">Time</th>
              <th className=" w-32 p-3">Status</th>
              <th className=" w-32 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="p-3">{request.user.username} </td>
                <td className="p-3">{request.message}</td>
                <td className="p-3">{moment(request.createdAt).fromNow()}</td>
                <td className="p-3">{request.requestStatus}</td>
                <td className="p-3 flex items-center gap-3">
                  <button
                    disabled={disabledButton}
                    onClick={() => handleRequestStatus("rejected", request._id)}
                    className=" bg-red-500 btn text-white hover:bg-red-400"
                  >
                    Reject
                  </button>
                  <button
                    disabled={disabledButton}
                    onClick={() => {
                      handleRequestStatus("accepted", request._id);
                      handleSendRequest(request.user._id);
                    }}
                    className=" bg-blue-500 btn text-white hover:bg-blue-400"
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
