import { Chat } from "../model/chat.model.js";
import { Payment } from "../model/payment.model.js";
import { errorHandler } from "../utils/error.js";

export const getTransactionRecord = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ participants: userId });

    if (!chats) {
      return next(errorHandler(404, "chat not found"));
    }
    // console.log(chats);
    const chatIds = chats.map((chat) => chat._id);
    console.log(chatIds);

    const transactions = await Payment.find({
      participantsFromChat: { $in: chatIds },
    }).populate("participantsFromChat");

    console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    return next(errorHandler(500, "Error while getting transaction record."));
  }
};
