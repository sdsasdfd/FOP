import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const { conversation } = useParams();

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      <div className="container mx-auto md:px-4 ">
        <Messages />
        <MessageInput />
      </div>
    </>
  );
};

export default MessageContainer;
