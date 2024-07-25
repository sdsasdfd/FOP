import React from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user);
  const formattedTime = extractTime(message.createdAt);

  return (
    <div
      className={`chat  ${
        message.senderId === currentUser._id ? "chat-end" : "chat-start"
      } my-2`}
    >
      <div
        className={`chat-bubble chat-bubble-info  w-fit max-w-[280px] md:max-w-sm lg:max-w-md text-white pb-2`}
      >
        {message.image && (
          <img
            src={message.image}
            width={250}
            height={250}
            alt="Chat"
            className="rounded-lg mb-2"
          />
        )}
        <span> {message.message}</span>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
