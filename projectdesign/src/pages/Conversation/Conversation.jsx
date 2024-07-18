import React from "react";
import NavbarPerson from "../../components/NavbarPerson";
import MessageContainer from "../../components/conversation/MessageContainer";

const Conversation = () => {
  return (
    <>
      {/* <NavbarPerson /> */}
      <div className="px-4 md:px-20 w-full">
        <MessageContainer />
      </div>
    </>
  );
};

export default Conversation;
