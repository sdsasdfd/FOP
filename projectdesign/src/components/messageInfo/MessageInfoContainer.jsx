import React from "react";
import { Link } from "react-router-dom";

import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import moment from "moment";

import useGetConversations from "../../hooks/useGetConversations";

const MessageInfoContainer = () => {
  const { conversations, loading } = useGetConversations();

  return (
    <>
      {/* //for small screen */}
      <div className="md:hidden mt-6 gap-4 grid grid-col-1 sm:grid-cols-2">
        {conversations.length === 0 ? (
          <div>no messages available</div>
        ) : (
          <>
            {conversations &&
              conversations.map((message) => {
                const otherParticipantName =
                  message.otherParticipantInfo?.username;
                const otherParticipantId = message.otherParticipantInfo?._id;
                console.log(otherParticipantName);
                const lastMessageDetails = message?.lastMessage;
                const lastMessage = lastMessageDetails?.message;
                const lastMessageImage = lastMessageDetails?.image;
                const time = lastMessageDetails?.createdAt;

                return (
                  <div
                    className="flex flex-col p-4 rounded-lg shadow"
                    key={message._id}
                  >
                    <div className="flex justify-between mb-2 ">
                      <span className="text-lg font-semibold">
                        {otherParticipantName}
                      </span>
                      <span className="font-semibold">
                        {moment(time).fromNow()}
                      </span>
                    </div>
                    <div className=" flex items-center gap-2">
                      {lastMessageImage && (
                        <MdOutlinePhotoSizeSelectActual size={22} />
                      )}
                      {lastMessage ? (
                        <span>{lastMessage}</span>
                      ) : (
                        <span>Photo</span>
                      )}
                    </div>
                    <div>
                      <Link to={`${otherParticipantId}`}>
                        <button className=" bg-blue-500 py-2 w-[70px] rounded-lg text-white mt-4">
                          Read
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>

      {/* //for larger screen */}
      <div className="hidden md:block mt-6">
        <table className="w-full text-left">
          <thead className="">
            <tr className="border-b">
              <th className="w-32 p-3">Name</th>
              <th className="p-3">Message</th>
              <th className="w-36  p-3">Time</th>
              <th className=" w-28  p-3">Actions</th>
            </tr>
          </thead>
          {conversations.length === 0 ? (
            <tbody className="divide-y">
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No messages available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y">
              {conversations.map((message) => {
                const otherParticipantName =
                  message.otherParticipantInfo?.username;
                const otherParticipantId = message.otherParticipantInfo?._id;
                const lastMessageDetails = message?.lastMessage;
                const lastMessageImage = lastMessageDetails?.image;
                const lastMessage = lastMessageDetails?.message;
                const time = lastMessageDetails?.createdAt;

                return (
                  <tr key={message._id}>
                    <td className="p-3 font-semibold">
                      {" "}
                      {otherParticipantName}{" "}
                    </td>
                    <td className="p-3 ">
                      <div className=" flex items-center gap-2">
                        {lastMessageImage && (
                          <MdOutlinePhotoSizeSelectActual size={22} />
                        )}
                        {lastMessage ? (
                          <span>{lastMessage}</span>
                        ) : (
                          <span>Photo</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">{moment(time).fromNow()}</td>
                    <td className="p-3">
                      <Link to={`${otherParticipantId}`}>
                        <button className=" bg-blue-500 py-3 rounded-lg w-[70px] text-white">
                          Read
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default MessageInfoContainer;
