import { Chat } from "../../model/chat.model.js";
import { ChatMessage } from "../../model/message.model.js";
import { getReceiverSocketId, io } from "../../socket/index.js";
import { errorHandler } from "../../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

// export const sendMessage = async (req, res, next) => {
//   try {
//     const { message } = req.body;

//     const { id: receiverId } = req.params;

//     const senderId = req.user._id;

//     let chat = await Chat.findOne({
//       participants: {
//         $all: [senderId, receiverId],
//       },
//     });

//     if (!chat) {
//       chat = await Chat.create({
//         participants: [senderId, receiverId],
//       });

//       const defaultMessage = new ChatMessage({
//         senderId,
//         receiverId,
//         message: "Hey, I need a service get done",
//       });

//       console.log("message");

//       if (defaultMessage) {
//         chat.messages.push(defaultMessage._id);
//       }

//       await Promise.all([chat.save(), defaultMessage.save()]);

//       // Sending the default message response
//       res.status(200).json({ newChat: chat, defaultMessage });
//     } else {
//       const newMessage = new ChatMessage({
//         senderId,
//         receiverId,
//         message,
//       });
//       console.log(req.body.message);
//       console.log(newMessage.message);
//       if (newMessage) {
//         chat.messages.push(newMessage._id);
//       }

//       await Promise.all([chat.save(), newMessage.save()]);

//       // const receiverSocketId = getReceiverSocketId(receiverId);
//       // if (receiverSocketId) {
//       //   io.to(receiverSocketId).emit("newMessage", newMessage);
//       // }

//       res.status(200).json(newMessage);
//     }
//   } catch (error) {
//     next(error);
//     console.log(error.message);
//   }
// };

export const sendMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    let chat = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });

      const defaultMessage = new ChatMessage({
        senderId,
        receiverId,
        message: "How can i help you",
      });

      if (defaultMessage) {
        chat.messages.push(defaultMessage._id);
        chat.lastMessage = defaultMessage._id;
      }

      await Promise.all([chat.save(), defaultMessage.save()]);

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      // Sending the default message response
      res.status(200).json({ newChat: chat, defaultMessage });
    } else {
      const { message } = req.body;
      let { image } = req.body;
      if (image) {
        const imageRes = await cloudinary.uploader.upload(image);
        image = imageRes.secure_url;
      }
      const newMessage = new ChatMessage({
        senderId,
        receiverId,
        message,
        image,
      });
      // console.log(req.body.message);
      // console.log(newMessage.message);
      if (newMessage) {
        chat.messages.push(newMessage._id);
        chat.lastMessage = newMessage._id;
      }

      await Promise.all([chat.save(), newMessage.save()]);

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(200).json(newMessage);
    }
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // console.log("Sender ID:", senderId);
    // console.log("User to Chat ID:", userToChatId);

    if (!senderId || !userToChatId) {
      return next(errorHandler(400, "Invalid user IDs"));
    }

    const chat = await Chat.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    // console.log("Chat messages: ", chat.messages);

    if (!chat) {
      return next(errorHandler(404, "not chat found"));
    }

    const messages = chat.messages;

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const getLastMessage = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("Sender ID:", senderId);
    console.log("User to Chat ID:", userToChatId);

    if (!senderId || !userToChatId) {
      return next(errorHandler(400, "Invalid user IDs"));
    }

    const chat = await Chat.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate({
      path: "messages",
      options: {
        sort: { createdAt: -1 },
        limit: 1,
      },
    });

    console.log("Chat messages: ", chat.messages);

    if (!chat) {
      return res.status(200).json([]);
    }

    const messages = chat.messages;

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
