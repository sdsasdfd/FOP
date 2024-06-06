import React from "react";
import MessageInfoContainer from "../../components/messageInfo/MessageInfoContainer";

const MessageInfo = () => {
  return (
    <div className="container mx-auto md:px-10 px-6  mt-8">
      <h1 className="text-3xl font-semibold">Messages</h1>
      <MessageInfoContainer />
    </div>
  );
};

export default MessageInfo;
