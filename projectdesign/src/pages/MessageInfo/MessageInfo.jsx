import React from "react";
import MessageInfoContainer from "../../components/messageInfo/MessageInfoContainer";

import useGetConversations from "../../hooks/useGetConversations";

const MessageInfo = () => {
  const { conversations } = useGetConversations();

  return (
    <div className="container mx-auto md:px-10 px-6  mt-8 mb-6">
      <h1 className="text-3xl font-semibold">Messages</h1>

      {conversations.length === 0 ? (
        <div>No Chat Available</div>
      ) : (
        <MessageInfoContainer />
      )}
    </div>
  );
};

export default MessageInfo;
