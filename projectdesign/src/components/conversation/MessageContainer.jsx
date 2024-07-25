import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      <div className="container mx-auto  ">
        <Messages />
        <MessageInput />
      </div>
    </>
  );
};

export default MessageContainer;
