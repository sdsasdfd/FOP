import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MessageInput = ({ setMessages, messages }) => {
  const { currentUser } = useSelector((state) => state.user);
  // const [message, setMessage] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const { conversation } = useParams();
  const [popupPay, setPopupPay] = useState(false);
  const [amount, setAmount] = useState();
  const [amountSentByServicer, setAmountSentByServicer] = useState(false);
  const [togglePriceCardForUser, setTogglePriceCardForUser] = useState(false);
  const [amountSentByUser, setAmountSentByUser] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessageText) {
      return;
    }
    try {
      const res = await fetch(`/api/message/create/${conversation}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessageText }),
      });
      const data = await res.json();

      if (!data.success) {
        console.log(data.message);
      }

      console.log(data);
      setMessages([...messages, data]);
      setNewMessageText(""); // Clear the message input after sending
    } catch (error) {
      console.log(error.message);
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
    <>
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
      <form onSubmit={handleSubmit} className="my-3">
        <div className="w-full gap-3 flex border-t-2 items-center py-2 relative">
          <button className="text-black" type="button">
            <CiSquarePlus className="text-3xl font-bold" />
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
        </div>
      </form>
    </>
  );
};

export default MessageInput;
