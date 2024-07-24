import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenServiceStatus = ({
  servicerCompletedTask,
  setServicerCompletedTask,
}) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("serviceCompleted", (isCompleted) => {
      console.log("IsCompleted :: ", isCompleted);
      setServicerCompletedTask(isCompleted);
    });
  }, [socket, setServicerCompletedTask, servicerCompletedTask]);
};

export default useListenServiceStatus;
