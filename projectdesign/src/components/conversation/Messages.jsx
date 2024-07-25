import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useParams } from "react-router-dom";

import useConversation from "../../zustand/useConversation";

import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, setMessages } = useConversation();

  useListenMessages();
  const lastMessageRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/message/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        console.log(data.messages);
        setMessages(data.messages);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 h-[390px] overflow-auto">
      {messages?.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
