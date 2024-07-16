import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setMessages } from "../../store/messageSlice";
import { toast } from "react-toastify";

import { IoCloseSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useSocketContext } from "../../context/SocketContext";
import { IoMdClose } from "react-icons/io";

const MessageInput = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  // const [message, setMessage] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const { id } = useParams();

  const [togglePriceCardForUser, setTogglePriceCardForUser] = useState(false);

  const [toggleUploadImage, setToggleUploadImage] = useState(false);
  const [toggleComplainModal, setToggleComplainModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState(1);

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  // console.log(img);

  const [servicerCompletedTask, setServicerCompletedTask] = useState(false);

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

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    // if (!newMessageText) {
    //   return;
    // }
    if (newMessageText || img) {
      try {
        const res = await fetch(`/api/message/create/${conversation}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newMessageText, image: img }),
        });
        const data = await res.json();

        if (!data.success) {
          console.log(data.message);
        }

        console.log(data);

        dispatch(setMessages([...messages, data]));

        setNewMessageText(""); // Clear the message input after sending
        setToggleUploadImage(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
    });
  }, [messages, socket, dispatch]);

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
      } else {
        toast.success("Payment done successfully!");
        setTogglePriceCardForUser(false);
        setShowReviewModal(true);
      }
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
      navigate("/user-home");
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
        console.log(data);
        setSlipDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSlip();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Payment Modal */}
      {togglePriceCardForUser && (
        <div className=" absolute  top-0 w-[80%] flex items-center justify-center  h-screen border z-50">
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
                <span className=" text-lg font-medium">Category Name</span>
                <span className="text-lg font-medium">
                  {slipDetails.serviceCategory}
                </span>
              </div>

              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">Fee Amount:</span>
                <span className="text-lg font-medium">
                  {" "}
                  {slipDetails.feeAmount}{" "}
                </span>
              </div>
              <div className="flex gap-4 items-center my-1">
                <span className=" text-lg font-medium">
                  After deduction of fee net amount:
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  {slipDetails.netAmount}
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
          <div className="modal-box bg-blue-50 ">
            <h1 className=" font-extrabold  text-3xl my-4">
              We appreciate your feedback
            </h1>
            <p className=" text-lg font-medium">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat,
              accusantium.
            </p>

            <button
              className="btn border-1 border-slate-400  btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setShowReviewModal(false)}
            >
              ✕
            </button>
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
                rows={3}
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
                  className="hover:text-blue-600"
                  onClick={() => setToggleComplainModal(true)}
                >
                  Click here!
                </span>
              </p>
            </div>
            {toggleComplainModal && (
              <form>
                <textarea name="" id="" placeholder="complain" />
                <button>Submit</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sending Message */}
      <form onSubmit={handleMessageSubmit} className="my-3 relative">
        <div className="w-full gap-3 flex border-t-2 items-center py-2 relative">
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
            onChange={(e) => setNewMessageText(e.target.value)}
            value={newMessageText}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-3 rounded-lg"
          >
            <IoMdSend />
          </button>
          {currentUser.roles === "servicer" ? (
            <button
              type="button"
              onClick={() => setServicerCompletedTask(true)}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg"
            >
              Request for completion
            </button>
          ) : (
            <button
              type="button"
              className={`${
                servicerCompletedTask ? "bg-blue-500" : "bg-slate-200"
              } text-white  py-3 px-6 rounded-lg`}
              onClick={() => setTogglePriceCardForUser(true)}
            >
              Mark as completed
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
