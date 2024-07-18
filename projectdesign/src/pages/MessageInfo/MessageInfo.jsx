import React from "react";
import MessageInfoContainer from "../../components/messageInfo/MessageInfoContainer";
import { useSelector } from "react-redux";

const MessageInfo = () => {
  const { chats: messages } = useSelector((state) => state.chats);

  return (
    <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
      <h1 className="text-3xl font-semibold">Messages</h1>

      <MessageInfoContainer />
    </div>
  );
};

export default MessageInfo;
