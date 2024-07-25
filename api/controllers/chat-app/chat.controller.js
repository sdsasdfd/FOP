import { Chat } from "../../model/chat.model.js";
import { errorHandler } from "../../utils/error.js";

const getAllChats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ participants: userId })
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "-password",
        },
      })
      .populate({
        path: "participants",
        select: "username",
      })
      .sort({ createdAt: -1 });

    if (chats.length === 0) {
      // return next(errorHandler(404, "Chats not found"));
      return res.status(404).json([]);
    }

    const formattedChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find(
        (participant) => participant._id.toString() !== userId.toString()
      );

      return {
        ...chat.toObject(),
        otherParticipantInfo: {
          username: otherParticipant?.username,
          _id: otherParticipant?._id,
        },
      };
    });
    // console.log(formattedChats);
    res.status(200).json(formattedChats);
  } catch (error) {
    next(error);
  }
};

export { getAllChats };
