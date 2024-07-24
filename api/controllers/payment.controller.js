import { Payment } from "../model/payment.model.js";
import { Account } from "../model/account.model.js";
import { Chat } from "../model/chat.model.js";
import Order from "../model/order.model.js";
import { errorHandler } from "../utils/error.js";
import User from "../model/userModel.js";
import Gig from "../model/gig.model.js";

const processPayment = (amount) => {
  const fee = 0.025;
  const feeAmount = amount * fee;
  const netAmount = amount - feeAmount;

  return {
    totalAmount: amount,
    feeAmount: feeAmount,
    netAmount: netAmount,
  };
};

const findAdminId = async () => {
  const admin = await User.findOne({ isAdmin: true });
  return admin._id;
};

const updateAccounts = async (
  senderId,
  receiverId,
  adminId,
  paymentDetails,
  next
) => {
  try {
    const senderAccount = await Account.findOne({ owner: senderId });
    const receiverAccount = await Account.findOne({ owner: receiverId });
    const adminAccount = await Account.findOne({ owner: adminId });

    console.log("sender account :", senderAccount._id);
    console.log("receiver account :", receiverAccount._id);
    console.log("admin account : ", adminAccount._id);

    if (!senderAccount || !receiverAccount || !adminAccount) {
      return next(errorHandler(404, "Sender or receiver account not found"));
    }

    if (senderAccount.balance < paymentDetails.totalAmount) {
      return next(errorHandler(400, "Insufficient funds"));
    }

    senderAccount.balance -= paymentDetails.totalAmount;
    receiverAccount.balance += paymentDetails.netAmount;
    adminAccount.balance += paymentDetails.feeAmount;
    adminAccount.earning += paymentDetails.feeAmount;

    await senderAccount.save();
    await receiverAccount.save();
    await adminAccount.save();
  } catch (error) {
    return next(errorHandler(500, "Error updating accounts"));
  }
};

export const makePayment = async (req, res, next) => {
  // const { amount } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const gigData = await Gig.findOne({ servicerId: receiverId }).select(
    "-coverImg -description"
  );

  const amount = gigData.price;

  console.log(`amount from gig: ${amount}`);

  if (!amount || amount <= 0) {
    return next(errorHandler(400, "Invalid Amount"));
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return next(errorHandler(404, "not found!"));
  }

  const chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  console.log(chat);
  const chatIdForParticipants = chat._id;
  console.log(chatIdForParticipants);

  const paymentDetails = processPayment(amount);

  const payment = new Payment({
    participantsFromChat: chatIdForParticipants,
    totalAmount: paymentDetails.totalAmount,
    feeAmount: paymentDetails.feeAmount,
    netAmount: paymentDetails.netAmount,
    categoryName: receiver.category,
  });

  try {
    const adminId = await findAdminId();
    await updateAccounts(senderId, receiverId, adminId, paymentDetails, next);
    const orderStatus = await Order.findOneAndUpdate(
      {
        user: senderId,
        servicer: receiverId,
      },
      {
        isCompleted: false,
      },
      {
        new: true,
      }
    );
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    return next(errorHandler(500, "Error processing the payment"));
  }
};

export const generatePaymentSlip = async (req, res, next) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const gigData = await Gig.findOne({ servicerId: receiverId }).select(
      "-coverImg -description"
    );
    console.log(gigData);
    const amount = gigData.price;

    const paymentDetails = processPayment(amount);

    // we can capture receiver's name and category
    const receiver = await User.findOne({ _id: receiverId });
    const sender = await User.findOne({ _id: senderId });

    if (!receiver) {
      return next(errorHandler(404, "Receiver not found"));
    }

    if (!sender) {
      return next(errorHandler(404, "Sender not found"));
    }
    console.log(sender);
    console.log(receiver);
    const paymentSlipDetails = {
      senderName: sender.username,
      senderEmail: sender.email,
      receiverName: receiver.username,
      receiverEmail: receiver.email,
      serviceCategory: receiver.category,
      totalAmount: paymentDetails.totalAmount,
      feeAmount: paymentDetails.feeAmount,
      netAmount: paymentDetails.netAmount,
    };
    console.log(paymentSlipDetails);
    res.status(200).json(paymentSlipDetails);
  } catch (error) {
    return next(errorHandler(500, "Error generating payment slip"));
  }
};
