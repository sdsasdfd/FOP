import React from "react";

import MessageContainer from "../../components/conversation/MessageContainer";
import { useSelector } from "react-redux";

const Conversation = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div
        className={`px-4 md:px-12 ${
          currentUser.roles === "servicer" ? "h-screen" : ""
        } w-full`}
      >
        <MessageContainer />
      </div>
    </>
  );
};

export default Conversation;
