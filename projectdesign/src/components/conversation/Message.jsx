import React from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user);
  const formattedTime = extractTime(message.createdAt);
  // console.log(message);
  // console.log(currentUser);
  return (
    <div
      className={`chat  ${
        message.senderId === currentUser._id ? "chat-end" : "chat-start"
      } my-2`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://avatar.iran.liara.run/public/girl"
          />
        </div>
      </div>
      <div className={`chat-bubble chat-bubble-info text-white  pb-2`}>
        {" "}
        {message.message}{" "}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
