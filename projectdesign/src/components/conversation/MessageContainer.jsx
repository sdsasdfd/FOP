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

  // const { conversation } = useParams();
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await fetch(/api/message/${conversation});
  //       const data = await res.json();
  //       if (data.success === false) {
  //         console.log(data.message);
  //       }
  //       console.log(data);

  //       setMessages(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchMessages();
  // }, []);
  return (
    <>
      {/* Header */}
      {/* <div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div> */}
      <div className="container mx-auto md:px-4 ">
        <Messages />
        <MessageInput />
      </div>
    </>
    // <div className="container mx-auto md:px-4 ">
    //   <Messages />
    //   <MessageInput />
    // </div>
  );
};

export default MessageContainer;
