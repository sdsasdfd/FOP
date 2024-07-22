import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenRequests = ({ newRequest, setNewRequest }) => {
  const { socket } = useSocketContext();
  useEffect(() => {
    socket?.on("sendMessageRequest", (request) => {
      console.log("REQUEST :: ", request);
      setNewRequest(request);
    });
  }, [socket, newRequest, setNewRequest]);
};

export default useListenRequests;
