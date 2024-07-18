import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";

const useSendMessage = (id) => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message, img) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, image: img }),
      });
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
