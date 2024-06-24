import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { convertTimestamp } from "../../utils/DateTime";
const MessageInfoContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`/api/chat/all`);
        const data = await res.json();

        // console.log(data);

        if (data.success === false) {
          console.log(data.message);
        }

        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessage();
  }, []);
  return (
    <>
      <div className="hidden md:block mt-6">
        <table className="w-full text-left">
          <thead className="">
            <tr className="border-b">
              <th className="w-32 p-3">Name</th>
              <th className="p-3">Message</th>
              <th className="w-36  p-3">Time</th>
              <th className=" w-28  p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {messages?.map((message) => {
              const lastMessageDetails = message.lastMessage;
              const lastMessage = lastMessageDetails.message;
              const time = lastMessageDetails.createdAt;
              const senderName = lastMessageDetails.senderId.username;
              const receiverId = message.lastMessage.receiverId;
              return (
                <tr key={message._id}>
                  <td className="p-3 font-semibold"> {senderName} </td>
                  <td className="p-3">{lastMessage}</td>
                  <td className="p-3">{moment(time).fromNow()}</td>
                  <td className="p-3">
                    <Link to={`${receiverId}`}>
                      <button className=" bg-blue-500 py-3 rounded-lg w-[70px] text-white">
                        Read
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* // for small devices */}
      <div className="md:hidden mt-6 gap-4 grid grid-col-1 sm:grid-cols-2">
        {messages.map((message) => {
          const lastMessageDetails = message.lastMessage;
          const lastMessage = lastMessageDetails.message;
          const time = lastMessageDetails.createdAt;
          const senderName = lastMessageDetails.senderId.username;
          const receiverId = message.receiverId;
          return (
            <div
              className="flex flex-col p-4 rounded-lg shadow"
              key={message._id}
            >
              <div className="flex justify-between mb-2 ">
                <span className="text-lg font-semibold">{senderName}</span>
                <span className="font-semibold">{moment(time).fromNow()}</span>
              </div>
              <p>{lastMessage}</p>
              <div>
                <Link to={`${receiverId}`}>
                  <button className=" bg-blue-500 py-2 w-[70px] rounded-lg text-white mt-4">
                    Read
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessageInfoContainer;
