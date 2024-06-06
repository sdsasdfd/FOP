import React from "react";

import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="container mx-auto md:px-4 ">
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
