import React, { useEffect, useState } from "react";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";

const MessageContainer = () => {
  const { conversation } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/message/${conversation}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        console.log(data);

        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, []);
  return (
    <div className="container mx-auto md:px-4 ">
      <Messages messages={messages} />
      <MessageInput setMessages={setMessages} messages={messages} />
    </div>
  );
};

export default MessageContainer;
