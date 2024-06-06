import React from "react";

const Message = () => {
  return (
    <div className={`chat chat-start my-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://avatar.iran.liara.run/public/boy

"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white  pb-2`}>hello there</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:23
      </div>
    </div>
  );
};

export default Message;
