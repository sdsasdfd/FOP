import React from "react";
import NavbarPerson from "../../components/NavbarPerson";
import MessageContainer from "../../components/conversation/MessageContainer";

const Conversation = () => {
  return (
    <>
      {/* <NavbarPerson /> */}
      <div className="px-6 sm:px-20">
        <MessageContainer />
      </div>
    </>
  );
};

export default Conversation;
