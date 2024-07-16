import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../../store/messageSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const { messages } = useSelector((state) => state.message);
  const lastMessageRef = useRef();
  // console.log(messages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/message/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        console.log(data);

        dispatch(setMessages(data.messages));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (lastMessageRef) {
  //     lastMessageRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //     });
  //   }
  //   // setTimeout(() => {
  //   //   lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  //   // }, 100);
  // }, [messages]);

  return (
    <div className="h-[420px] overflow-auto">
      {/* {messages?.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} isImage={!!message.image} />
        </div>
      ))} */}
    </div>
  );
};

export default Messages;
