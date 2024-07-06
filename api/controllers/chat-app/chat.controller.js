import User from "../../model/userModel.js";
import { Chat } from "../../model/chat.model.js";
import { errorHandler } from "../../utils/error.js";
import { ChatMessage } from "../../model/message.model.js";

const createChat = async (req, res, next) => {
  try {
    const userId1 = req.user._id;
    const userId2 = req.params;
    // console.log(userId2, userId1);

    // Ensure both users exist
    const user1 = await User.findById(userId1);
    const user2 = await User.findById(userId2);

    if (!user1 || !user2) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if a one-on-one chat between these users already exists
    let chat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    });
    let message = "";

    if (!chat) {
      // Create a new one-on-one chat
      chat = new Chat({
        participants: [userId1, userId2],
      });

      await chat.save();

      message = new ChatMessage({
        senderId: userId1,
        receiverId: userId2,
        message: "Hey! I want to get a service done.",
      });

      message.save();
    }

    // Notify the participants via Socket.IO
    // const io = req.app.get("io");
    // io.to(userId1.toString()).emit(ChatEventEnum.NEW_CHAT_EVENT, chat);
    // io.to(userId2.toString()).emit(ChatEventEnum.NEW_CHAT_EVENT, chat);

    res.status(201).json(chat, message);
  } catch (error) {
    next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ participants: userId }).populate({
      path: "lastMessage",
      populate: {
        path: "senderId",
        select: "-password",
      },
    });

    if (chats.length === 0) {
      return next(errorHandler(404, "Chats not found"));
    }

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

export { createChat, getAllChats };
