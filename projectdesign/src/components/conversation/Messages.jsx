import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useParams } from "react-router-dom";

const Messages = ({ messages }) => {
  // const { conversation } = useParams();
  // const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();
  console.log(messages);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await fetch(`/api/message/${conversation}`);
  //       const data = await res.json();
  //       if (data.success === false) {
  //         console.log(data.message);
  //       }
  //       // console.log(data);

  //       setMessages(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchMessages();
  // }, [conversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  // if (messages.length === 0) {
  //   return <h1>No messages</h1>;
  // }

  return (
    <div className="h-[420px] overflow-auto">
      {messages?.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
