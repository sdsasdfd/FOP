// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { toast } from "react-toastify";
// import useListenRequests from "../../hooks/useListenRequests";
// const ServicerRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [disabledButton, setDisabledButton] = useState({});
//   const [newRequest, setNewRequest] = useState({});

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch("/api/request/get-requests-servicer");
//         const data = await res.json();

//         if (data.success === false) {
//           console.log(data.message);
//           return;
//         }
//         console.log(data);
//         setRequests(data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     fetchRequests();
//   }, []);

//   useListenRequests({ newRequest, setNewRequest });
//   useEffect(() => {
//     setRequests([...requests, newRequest]);
//   }, [newRequest]);

//   const handleRequestStatus = async (status, id) => {
//     try {
//       const res = await fetch(`/api/request/send-response/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ requestStatus: status }),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         console.log(data.message);
//       }
//       console.log(data);
//       toast.success("Response Sent!");
//       setDisabledButton((prev) => ({ ...prev, [id]: true }));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleSendRequest = async (id) => {
//     try {
//       const res = await fetch(`/api/message/create/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(),
//       });
//       const data = await res.json();
//       toast.success("Request message send!");
//       console.log(data);
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error.message);
//     }
//   };
//   return (
//     <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
//       <h1 className="text-3xl font-semibold">Request</h1>
//       <div className="w-full mt-6">
//         <table className="w-full  text-left">
//           <thead>
//             <tr>
//               <th className=" w-32 p-3">Username</th>

//               <th className=" w-32 p-3">Time</th>
//               <th className=" w-32 p-3">Status</th>
//               <th className=" w-32 p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests?.map((request, index) => {
//               let status;
//               if (request.requestStatus === "accepted") {
//                 status = "bg-blue-200 text-blue-600";
//               } else if (request.requestStatus === "rejected") {
//                 status = "bg-red-200 text-red-600";
//               } else {
//                 status = "bg-purple-100 text-purple-600";
//               }

//               return (
//                 <tr key={request._id}>
//                   <td className="p-3">{request.user?.username} </td>

//                   <td className="p-3">{moment(request.createdAt).fromNow()}</td>
//                   <td className="p-3">
//                     <span
//                       className={`${status} px-3 py-1 rounded-md font-medium text-[16px]`}
//                     >
//                       {request.requestStatus}
//                     </span>
//                   </td>
//                   <td className="p-3 flex items-center gap-3">
//                     <button
//                       disabled={disabledButton[request._id]}
//                       onClick={() =>
//                         handleRequestStatus("rejected", request._id)
//                       }
//                       className=" bg-red-500 btn text-white hover:bg-red-400"
//                     >
//                       Reject
//                     </button>
//                     <button
//                       disabled={disabledButton[request._id]}
//                       onClick={() => {
//                         handleRequestStatus("accepted", request._id);
//                         handleSendRequest(request.user._id);
//                       }}
//                       className=" bg-blue-500 btn text-white hover:bg-blue-400"
//                     >
//                       Accept
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServicerRequests;

// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { toast } from "react-toastify";
// import useListenRequests from "../../hooks/useListenRequests";
// const Requests = () => {
//   const [requests, setRequests] = useState([]);
//   const [disabledButton, setDisabledButton] = useState({});
//   const [newRequest, setNewRequest] = useState({});

//   const [isDisabled, setIsDisabled] = useState({});

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch("/api/request/get-requests-servicer");
//         const data = await res.json();

//         if (data.success === false) {
//           console.log(data.message);
//           return;
//         }
//         console.log(data);
//         setRequests(data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     fetchRequests();
//   }, []);

//   useListenRequests({ newRequest, setNewRequest });
//   useEffect(() => {
//     console.log("Request username: ", newRequest);
//     setRequests((prevRequests) => [...prevRequests, newRequest]);
//   }, [newRequest]);

//   const handleRequestStatus = async (status, id) => {
//     try {
//       const res = await fetch(`/api/request/send-response/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ requestStatus: status }),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         console.log(data.message);
//       }
//       console.log(data);
//       toast.success("Response Sent!");
//       setDisabledButton((prev) => ({ ...prev, [id]: true }));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleSendRequest = async (id) => {
//     try {
//       const res = await fetch(`/api/message/create/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(),
//       });
//       const data = await res.json();
//       toast.success("Request message send!");
//       console.log(data);
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error.message);
//     }
//   };

//   const getCurrentStatus = async (id) => {
//     try {
//       const res = await fetch(`/api/request/status/${id}`);
//       const data = await res.json();

//       if (data.success === false) {
//         console.log(data.message);
//       }
//       if (data.requestStatus !== "pending") {
//         setIsDisabled((prev) => ({ ...prev, [id]: true }));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     requests.map((request) => {
//       getCurrentStatus(request._id);
//     });
//   }, [requests]);
//   return (
//     <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
//       <h1 className="text-3xl font-semibold">Request</h1>
//       <div className="w-full mt-6">
//         <table className="w-full  text-left">
//           <thead>
//             <tr>
//               <th className=" w-32 p-3">Username</th>
//               <th className=" w-32 p-3">Time</th>
//               <th className=" w-32 p-3">Status</th>
//               <th className=" w-32 p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests?.map((Res) => {
//               return (
//                 <tr key={Res._id}>
//                   <td> {} </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Requests;

import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import useListenRequests from "../../hooks/useListenRequests";
const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [disabledButton, setDisabledButton] = useState({});
  const [newRequest, setNewRequest] = useState({});

  const [isDisabled, setIsDisabled] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/request/get-requests-servicer");
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

  useListenRequests({ newRequest, setNewRequest });
  useEffect(() => {
    console.log("Request username: ", newRequest);
    setRequests([...requests, newRequest]);
  }, [newRequest]);

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
      setDisabledButton((prev) => ({ ...prev, [id]: true }));
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

  const [requestStatus, setRequestStatus] = useState({});

  const getCurrentStatus = async (id) => {
    try {
      const res = await fetch(`/api/request/status/${id}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      if (data.requestStatus !== "pending") {
        setIsDisabled((prev) => ({ ...prev, [id]: true }));
      }

      setRequestStatus((prev) => ({ ...prev, [id]: data.requestStatus }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requests.map((request) => {
      getCurrentStatus(request._id);
    });
  }, [requests]);
  return (
    <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
      <h1 className="text-3xl font-semibold">Request</h1>
      <div className="w-full mt-6">
        <table className="w-full  text-left">
          <thead>
            <tr>
              <th className=" w-32 p-3">Username</th>

              <th className=" w-32 p-3">Time</th>
              <th className=" w-32 p-3">Status</th>
              <th className=" w-32 p-3">Actions</th>
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
                  <td className="p-3">{request?.user?.username} </td>

                  <td className="p-3">{moment(request.createdAt).fromNow()}</td>
                  <td className="p-3">
                    <span
                      className={`${status} px-3 py-1 rounded-md font-medium text-[16px]`}
                    >
                      {requestStatus[request._id]}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <button
                      disabled={isDisabled[request._id]}
                      onClick={() => {
                        handleRequestStatus("rejected", request._id);
                        getCurrentStatus(request._id);
                      }}
                      className=" bg-red-500 btn text-white hover:bg-red-400"
                    >
                      Reject
                    </button>
                    <button
                      disabled={
                        disabledButton[request._id] || isDisabled[request._id]
                      }
                      onClick={() => {
                        handleRequestStatus("accepted", request._id);
                        handleSendRequest(request.user._id);
                        getCurrentStatus(request._id);
                      }}
                      className=" bg-blue-500 btn text-white hover:bg-blue-400"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
