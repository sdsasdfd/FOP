import React, { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMessages } from "../../store/messageSlice";
import { IoCloseSharp } from "react-icons/io5";

const MessageInput = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  // const [message, setMessage] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const { conversation } = useParams();
  const [popupPay, setPopupPay] = useState(false);
  const [amount, setAmount] = useState();
  const [amountSentByServicer, setAmountSentByServicer] = useState(false);
  const [togglePriceCardForUser, setTogglePriceCardForUser] = useState(false);
  const [amountSentByUser, setAmountSentByUser] = useState(null);
  const [toggleUploadImage, setToggleUploadImage] = useState(false);

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  console.log(img);

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

  const handleSubmitAmount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/payment/generate-slip/${conversation}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: +amount }),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }
      console.log(data);
      setPopupPay(false);
      setAmountSentByServicer(true);
      console.log(amountSentByServicer);
    } catch (error) {
      console.log(error.message);
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

  const handleSubmitAmountByUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/payment/make-payment/${conversation}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: +amount }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      console.log(data);
      setTogglePriceCardForUser(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {togglePriceCardForUser && (
        <div className=" absolute top-0 w-[80%] flex items-center justify-center  h-screen border z-50">
          <form
            onSubmit={handleSubmitAmountByUser}
            className="flex flex-col bg-slate-200 w-[250px] p-6 card"
          >
            <label className="label" htmlFor="">
              check the amount
            </label>
            <input
              type="number"
              className=" input"
              min={0}
              placeholder="Price..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn mt-2" type="submit">
              Send
            </button>
          </form>
        </div>
      )}
      {popupPay && (
        <div className=" absolute top-0 w-[80%] flex items-center justify-center  h-screen border z-50">
          <form
            onSubmit={handleSubmitAmount}
            className="flex flex-col bg-slate-200 w-[250px] p-6 card"
          >
            <label className="label" htmlFor="">
              Payment
            </label>
            <input
              type="number"
              className=" input"
              min={0}
              placeholder="Price..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn mt-2" type="submit">
              Send
            </button>
          </form>
        </div>
      )}

      {toggleUploadImage && (
        <div className=" absolute top-[60px] w-[400px] sm:w-[500px] md:w-[600px] lg:w-[900px] h-[400px] bg-slate-500 bg-opacity-30 flex items-center z-20 justify-center ">
          <div
            className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
            onClick={(e) => {
              setImg(null);
              e.target.value = null;
            }}
          >
            <IoCloseSharp size={30} />
          </div>
          <div className=" bg-white p-3">
            <img
              className="aspect-square m-2 object-scale-down"
              src={img}
              width={250}
              height={250}
              alt=""
            />
          </div>
        </div>
      )}
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
            cols="30"
            rows="10"
            onChange={(e) => setNewMessageText(e.target.value)}
            value={newMessageText}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
          >
            Send
          </button>
          {currentUser.roles === "servicer" ? (
            <button
              type="button"
              onClick={() => setPopupPay(!popupPay)}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg"
            >
              Request for completion
            </button>
          ) : (
            <button
              type="button"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg"
              onClick={() => setTogglePriceCardForUser(!togglePriceCardForUser)}
            >
              Mark as completed
            </button>
          )}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal").showModal()}
          >
            test
          </button>
          <dialog id="my_modal" className="modal">
            <div className="modal-box">
              <h3 className=" font-medium">Add Amount</h3>

              <form
                method="dialog"
                onSubmit={handleSubmitAmountByUser}
                className="flex mt-5 items-center  gap-4"
              >
                <button className="btn  btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <input
                  type="number"
                  className=" input border-1 border-gray-300 focus:border-0"
                  min={0}
                  placeholder="Enter Price..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button className="btn mt-2" type="submit">
                  Send
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
