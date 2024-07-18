import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { id } = useParams;
  console.log("id :::: ", id);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        console.log("MESSAGES ::::: ", data);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) getMessages();
  }, [id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
