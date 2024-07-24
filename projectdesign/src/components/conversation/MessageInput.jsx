import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useListenServiceStatus from "../../hooks/useListenServiceStatus";

import { toast } from "react-toastify";

import { IoCloseSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useSocketContext } from "../../context/SocketContext";
import { IoMdClose } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessages";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [newMessageText, setNewMessageText] = useState("");
  const { id } = useParams();

  const [togglePriceCardForUser, setTogglePriceCardForUser] = useState(false);

  const [toggleUploadImage, setToggleUploadImage] = useState(false);
  const [toggleComplainModal, setToggleComplainModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState(1);
  const [complainDesc, setComplainDesc] = useState("");

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  const { loading, sendMessage } = useSendMessage(id);
  // console.log(img);

  const [servicerCompletedTask, setServicerCompletedTask] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  console.log(servicerCompletedTask);
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleMessageSubmit = async (e) => {
  //   e.preventDefault();

  //   await sendMessage(message, img);
  //   setMessage("");
  //   setImg(null);
  //   setToggleUploadImage(false);
  // };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (message || img) {
      await sendMessage(message, img);
      setMessage("");
      setImg(null);
      setToggleUploadImage(false);
    }
  };
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubmitAmountByUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/payment/make-payment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      toast.success("Payment done successfully!");
      setTogglePriceCardForUser(false);
      setShowReviewModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle Review function
  const reviewHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/review/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ star: rating, desc: reviewDesc }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      // console.log(data);
      toast.success("review sent");
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle Complain function
  const handleComplain = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/complain/make/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complainDesc }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message);
        return console.log(data.message);
      } else {
        toast.success("Complain have been submitted!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // get slip
  const [slipDetails, setSlipDetails] = useState({});
  useEffect(() => {
    const fetchSlip = async () => {
      try {
        const res = await fetch(`/api/payment/generate-slip/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        // console.log(data);
        setSlipDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.roles === "user") {
      fetchSlip();
    }
  }, [isCompleted]);

  console.log(isCompleted);

  const serviceCompletionHandler = async () => {
    try {
      const res = await fetch(`/api/order/complete-order/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      console.log(data);
      setServicerCompletedTask(true);
    } catch (error) {
      console.log(error);
    }
  };
  useListenServiceStatus({ servicerCompletedTask, setServicerCompletedTask });
  console.log("COMPLETED TASK :::: ", servicerCompletedTask);

  useEffect(() => {
    const getCompletedOrder = async () => {
      try {
        const res = await fetch(`/api/order/get-completed-order/${id}`);
        const data = await res.json();
        if (data.success === false) {
          return console.log(data.message);
        }
        console.log(data);
        setIsCompleted(data.isCompleted);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.roles === "user") getCompletedOrder();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Payment Modal */}
      {togglePriceCardForUser && (
        <div className=" absolute  top-0 w-[90%] flex items-center justify-center  h-screen border bg-opacity-20  bg-slate-400 z-50">
          <div className="modal-box relative">
            <button
              className="btn border-1 border-slate-400  btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setTogglePriceCardForUser(false)}
            >
              ✕
            </button>
            <form
              onSubmit={handleSubmitAmountByUser}
              className="flex flex-col  p-6 "
            >
              <span className=" font-bold text-3xl my-2">Check the slip</span>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Sender Name:</span>
                <span className="text-lg font-medium">
                  {slipDetails.senderName}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Sender Email:</span>
                <span className="text-lg font-medium">
                  {slipDetails.senderEmail}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Receiver Name:</span>
                <span className="text-lg font-medium">
                  {slipDetails.receiverName}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Service Name</span>
                <span className="text-lg font-medium">
                  {slipDetails.serviceCategory}
                </span>
              </div>

              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Fee Amount:</span>
                <span className="text-lg font-medium">
                  {" "}
                  {slipDetails.feeAmount.toFixed(2)}{" "}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">
                  After deduction of fee net amount:
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  {slipDetails.netAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Total Amount:</span>
                <span className="text-lg font-medium">
                  {slipDetails.totalAmount}
                </span>
              </div>
              <button
                className="btn mt-2 bg-blue-600 text-lg hover:bg-blue-500 text-white"
                type="submit"
              >
                Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className=" w-[90%] h-screen bg-opacity-20 z-30 bg-slate-400 absolute top-0 flex items-center justify-center">
          <div className="modal-box bg-blue-50 max-h-screen ">
            <h1 className=" font-extrabold  text-3xl my-4">
              We appreciate your feedback
            </h1>
            <p className=" text-lg font-medium">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
              accusantium.
            </p>

            <form
              className="flex w-full mt-5 items-center flex-col gap-4"
              onSubmit={reviewHandle}
            >
              <div className="rating rating-lg">
                <input
                  type="radio"
                  name="rating-9"
                  className="mask mask-star-2 bg-blue-500"
                  onChange={() => setRating(1)}
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-9"
                  className="mask mask-star-2 bg-blue-500"
                  onChange={() => setRating(2)}
                />
                <input
                  type="radio"
                  name="rating-9"
                  className="mask mask-star-2 mx-2 bg-blue-500"
                  onChange={() => setRating(3)}
                />

                <input
                  type="radio"
                  name="rating-9"
                  className="mask mask-star-2 mx-2 bg-blue-500"
                  onChange={() => setRating(4)}
                />
                <input
                  type="radio"
                  name="rating-9"
                  className="mask mask-star-2 bg-blue-500"
                  onChange={() => setRating(5)}
                />
              </div>

              <textarea
                className="w-full textarea focus:border-0 placeholder:text-lg"
                placeholder="what can i do to improve your experience"
                rows={2}
                onChange={(e) => setReviewDesc(e.target.value)}
                value={reviewDesc}
              />
              <button
                type="submit"
                className="btn bg-blue-500 text-white text-lg hover:bg-blue-400"
              >
                Submit my feedback
              </button>
            </form>
            <div className="border-t-2 my-4">
              <p className=" mt-3 cursor-pointer text-xl">
                Write your complain{" "}
                <span
                  className="text-blue-600"
                  onClick={() => setToggleComplainModal(true)}
                >
                  Click here!
                </span>
              </p>
            </div>
            {toggleComplainModal && (
              <form onSubmit={handleComplain} className=" w-full flex mb-3 ">
                <textarea
                  value={complainDesc}
                  onChange={(e) => setComplainDesc(e.target.value)}
                  name=""
                  id=""
                  className="w-[70%]  focus:border-0 placeholder:text-lg focus:outline-none mb-2 p-2 rounded-md"
                  placeholder="Complain..."
                  rows={2}
                />
                <button
                  type="submit"
                  className=" w-[30%] rounded-r-md bg-blue-600 text-xl hover:bg-blue-500 mb-2 text-white font-semibold"
                >
                  Submit
                </button>
              </form>
            )}
            <Link
              to={"/user-home"}
              className=" text-lg mt-2 bg-slate-600 text-white p-2 rounded-md hover:bg-slate-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {img && toggleUploadImage && (
        <div
          className={` absolute ${
            currentUser.roles === "user" ? "top-[70px]" : "top-[0px]"
          } w-[450px] ${
            currentUser.roles === "user" ? "lg:w-[1150px]" : "lg:w-[1050px]"
          }  ${
            currentUser.roles === "user" ? "sm:w-[620px]" : "sm:w-[620px]"
          } h-[430px] bg-slate-800 bg-opacity-50 flex items-center z-20 justify-center `}
        >
          <div
            className="w-fit p-2 absolute top-0 right-0 cursor-pointer  text-white"
            onClick={(e) => {
              setImg(null);
              e.target.value = null;
              setToggleUploadImage(false);
            }}
          >
            <IoCloseSharp size={30} />
          </div>
          <div className=" bg-white p-3">
            <img
              className="aspect-square m-2 object-scale-down"
              src={img}
              width={200}
              height={200}
              alt=""
            />
          </div>
        </div>
      )}

      {/* Sending Message */}
      <form onSubmit={handleMessageSubmit} className="mt-3 relative">
        <div className="w-full gap-3 flex border-t-2 items-center pt-2 relative">
          <button className="text-black" type="button">
            <CiSquarePlus
              className="text-3xl font-bold"
              onClick={() => {
                imgRef.current.click();
                setToggleUploadImage(true);
              }}
            />
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => handleImgChange(e)}
              ref={imgRef}
            />
          </button>
          <textarea
            className="border w-[80%] h-[100px] outline-none px-2"
            placeholder="Write a message"
            cols="10"
            rows="5"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-3 rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <IoMdSend />
            )}
          </button>

          {currentUser.roles === "servicer" ? (
            <button
              type="button"
              onClick={serviceCompletionHandler}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg"
            >
              Mark as completed
            </button>
          ) : (
            <button
              type="button"
              className={`${
                isCompleted || servicerCompletedTask
                  ? "bg-blue-500"
                  : "bg-slate-200"
              } text-white  py-3 px-6 rounded-lg`}
              onClick={() => setTogglePriceCardForUser(true)}
              disabled={!servicerCompletedTask}
            >
              Proceed to payment
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;

// import React, { useEffect, useRef, useState } from "react";
// import { BsSend } from "react-icons/bs";
// import { CiSquarePlus } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// import { toast } from "react-toastify";

// import { IoCloseSharp } from "react-icons/io5";
// import { IoMdSend } from "react-icons/io";
// import { useSocketContext } from "../../context/SocketContext";
// import { IoMdClose } from "react-icons/io";
// import useSendMessage from "../../hooks/useSendMessages";
// import useListenServiceStatus from "../../hooks/useListenServiceStatus";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const [newMessageText, setNewMessageText] = useState("");
//   const { id } = useParams();

//   const [togglePriceCardForUser, setTogglePriceCardForUser] = useState(false);

//   const [toggleUploadImage, setToggleUploadImage] = useState(false);
//   const [toggleComplainModal, setToggleComplainModal] = useState(false);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [reviewDesc, setReviewDesc] = useState("");
//   const [rating, setRating] = useState(1);
//   const [complainDesc, setComplainDesc] = useState("");

//   const [img, setImg] = useState(null);
//   const imgRef = useRef(null);
//   const { loading, sendMessage } = useSendMessage(id);
//   // console.log(img);

//   const [servicerCompletedTask, setServicerCompletedTask] = useState(false);

//   const handleImgChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImg(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMessageSubmit = async (e) => {
//     e.preventDefault();

//     await sendMessage(message, img);
//     setMessage("");
//     setImg(null);
//     setToggleUploadImage(false);
//   };

//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const handleSubmitAmountByUser = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/payment/make-payment/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//       } else {
//         toast.success("Payment done successfully!");
//         setTogglePriceCardForUser(false);
//         setShowReviewModal(true);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // handle Review function
//   const reviewHandle = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/review/create/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ star: rating, desc: reviewDesc }),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//       }
//       // console.log(data);
//       toast.success("review sent");
//       navigate("/user-home");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // handle Complain function
//   const handleComplain = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`/api/complain/make/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ complainDesc }),
//       });
//       const data = await res.json();

//       if (data.success === false) {
//         return console.log(data.message);
//       } else {
//         toast.success("Complain have been submitted!");
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // get slip
//   const [slipDetails, setSlipDetails] = useState({});
//   useEffect(() => {
//     const fetchSlip = async () => {
//       try {
//         const res = await fetch(`/api/payment/generate-slip/${id}`);
//         const data = await res.json();
//         if (data.success === false) {
//           console.log(data.message);
//         }
//         console.log(data);
//         setSlipDetails(data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     fetchSlip();
//   }, []);

//   const serviceCompletionHandler = async () => {
//     try {
//       const res = await fetch(`/api/order/complete-order/${id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//       }
//       console.log(data);
//       // setServicerCompletedTask(data.isCompleted)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useListenServiceStatus({ servicerCompletedTask, setServicerCompletedTask });
//   console.log("COMPLETED TASK :::: ", servicerCompletedTask);

//   return (
//     <div className="w-full overflow-hidden">
//       {/* Payment Modal */}
//       {togglePriceCardForUser && (
//         <div className=" absolute  top-0 w-[80%] flex items-center justify-center  h-screen border z-50">
//           <div className="modal-box relative">
//             <button
//               className="btn border-1 border-slate-400  btn-sm btn-circle absolute right-2 top-2"
//               onClick={() => setTogglePriceCardForUser(false)}
//             >
//               ✕
//             </button>
//             <form
//               onSubmit={handleSubmitAmountByUser}
//               className="flex flex-col  p-6 "
//             >
//               <span className=" font-bold text-3xl my-2">Check the slip</span>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Sender Name:</span>
//                 <span className="text-lg font-medium">
//                   {slipDetails.senderName}
//                 </span>
//               </div>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Sender Email:</span>
//                 <span className="text-lg font-medium">
//                   {slipDetails.senderEmail}
//                 </span>
//               </div>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Receiver Name:</span>
//                 <span className="text-lg font-medium">
//                   {slipDetails.receiverName}
//                 </span>
//               </div>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Category Name</span>
//                 <span className="text-lg font-medium">
//                   {slipDetails.serviceCategory}
//                 </span>
//               </div>

//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Fee Amount:</span>
//                 <span className="text-lg font-medium">
//                   {" "}
//                   {slipDetails.feeAmount}{" "}
//                 </span>
//               </div>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">
//                   After deduction of fee net amount:
//                 </span>
//                 <span className="text-lg font-medium">
//                   {" "}
//                   {slipDetails.netAmount}
//                 </span>
//               </div>
//               <div className="flex gap-4 items-center my-1">
//                 <span className=" text-lg font-medium">Total Amount:</span>
//                 <span className="text-lg font-medium">
//                   {slipDetails.totalAmount}
//                 </span>
//               </div>
//               <button
//                 className="btn mt-2 bg-blue-600 text-lg hover:bg-blue-500 text-white"
//                 type="submit"
//               >
//                 Confirm Payment
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Review Modal */}
//       {showReviewModal && (
//         <div className=" w-[90%] h-screen bg-opacity-20 z-30 bg-slate-400 absolute top-0 flex items-center justify-center">
//           <div className="modal-box bg-blue-50 ">
//             <h1 className=" font-extrabold  text-3xl my-4">
//               We appreciate your feedback
//             </h1>
//             <p className=" text-lg font-medium">
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
//               accusantium.
//             </p>

//             <button
//               className="btn border-1 border-slate-400  btn-sm btn-circle btn-ghost absolute right-2 top-2"
//               onClick={() => setShowReviewModal(false)}
//             >
//               ✕
//             </button>
//             <form
//               className="flex w-full mt-5 items-center flex-col gap-4"
//               onSubmit={reviewHandle}
//             >
//               <div className="rating rating-lg">
//                 <input
//                   type="radio"
//                   name="rating-9"
//                   className="mask mask-star-2 bg-blue-500"
//                   onChange={() => setRating(1)}
//                   defaultChecked
//                 />
//                 <input
//                   type="radio"
//                   name="rating-9"
//                   className="mask mask-star-2 bg-blue-500"
//                   onChange={() => setRating(2)}
//                 />
//                 <input
//                   type="radio"
//                   name="rating-9"
//                   className="mask mask-star-2 mx-2 bg-blue-500"
//                   onChange={() => setRating(3)}
//                 />

//                 <input
//                   type="radio"
//                   name="rating-9"
//                   className="mask mask-star-2 mx-2 bg-blue-500"
//                   onChange={() => setRating(4)}
//                 />
//                 <input
//                   type="radio"
//                   name="rating-9"
//                   className="mask mask-star-2 bg-blue-500"
//                   onChange={() => setRating(5)}
//                 />
//               </div>

//               <textarea
//                 className="w-full textarea focus:border-0 placeholder:text-lg"
//                 placeholder="what can i do to improve your experience"
//                 rows={2}
//                 onChange={(e) => setReviewDesc(e.target.value)}
//                 value={reviewDesc}
//               />
//               <button
//                 type="submit"
//                 className="btn bg-blue-500 text-white text-lg hover:bg-blue-400"
//               >
//                 Submit my feedback
//               </button>
//             </form>
//             <div className="border-t-2 my-4">
//               <p className=" mt-3 cursor-pointer text-xl">
//                 Write your complain{" "}
//                 <span
//                   className="hover:text-blue-600"
//                   onClick={() => setToggleComplainModal(true)}
//                 >
//                   Click here!
//                 </span>
//               </p>
//             </div>
//             {toggleComplainModal && (
//               <form onSubmit={handleComplain} className=" w-full flex  ">
//                 <textarea
//                   value={complainDesc}
//                   onChange={(e) => setComplainDesc(e.target.value)}
//                   name=""
//                   id=""
//                   className="w-[70%]  focus:border-0 placeholder:text-lg focus:outline-none p-2 rounded-md"
//                   placeholder="Complain..."
//                   rows={2}
//                 />
//                 <button
//                   type="submit"
//                   className=" w-[30%] rounded-r-md bg-blue-600 text-xl text-white font-semibold"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}

//       {img && toggleUploadImage && (
//         <div className=" absolute top-[70px] w-[450px] sm:w-[620px] md:w-[600px] lg:w-[1150px] h-[430px] bg-slate-800 bg-opacity-50 flex items-center z-20 justify-center ">
//           <div
//             className="w-fit p-2 absolute top-0 right-0 cursor-pointer  text-white"
//             onClick={(e) => {
//               setImg(null);
//               e.target.value = null;
//               setToggleUploadImage(false);
//             }}
//           >
//             <IoCloseSharp size={30} />
//           </div>
//           <div className=" bg-white p-3">
//             <img
//               className="aspect-square m-2 object-scale-down"
//               src={img}
//               width={200}
//               height={200}
//               alt=""
//             />
//           </div>
//         </div>
//       )}

//       {/* Sending Message */}
//       <form onSubmit={handleMessageSubmit} className="mt-3 relative">
//         <div className="w-full gap-3 flex border-t-2 items-center pt-2 relative">
//           <button className="text-black" type="button">
//             <CiSquarePlus
//               className="text-3xl font-bold"
//               onClick={() => {
//                 imgRef.current.click();
//                 setToggleUploadImage(true);
//               }}
//             />
//             <input
//               hidden
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImgChange(e)}
//               ref={imgRef}
//             />
//           </button>
//           <textarea
//             className="border w-[80%] h-[100px] outline-none px-2"
//             placeholder="Write a message"
//             cols="10"
//             rows="5"
//             onChange={(e) => setMessage(e.target.value)}
//             value={message}
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-3 rounded-lg"
//           >
//             <IoMdSend />
//           </button>
//           {currentUser.roles === "servicer" ? (
//             <button
//               type="button"
//               onClick={serviceCompletionHandler}
//               className="bg-blue-500 text-white py-3 px-6 rounded-lg"
//             >
//               Mark as completed
//             </button>
//           ) : (
//             <button
//               type="button"
//               className={`${
//                 servicerCompletedTask ? "bg-blue-500" : "bg-slate-200"
//               } text-white  py-3 px-6 rounded-lg`}
//               onClick={() => setTogglePriceCardForUser(true)}
//               disabled={!servicerCompletedTask}
//             >
//               Proceed to payment
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;
