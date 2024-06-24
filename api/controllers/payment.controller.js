import { Payment } from "../model/payment.model.js";
import { Account } from "../model/account.model.js";
import { errorHandler } from "../utils/error.js";
import User from "../model/userModel.js";

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

    await senderAccount.save();
    await receiverAccount.save();
    await adminAccount.save();
  } catch (error) {
    return next(errorHandler(500, "Error updating accounts"));
  }
};

export const makePayment = async (req, res, next) => {
  const { amount } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!amount || amount <= 0) {
    return next(errorHandler(400, "Invalid Amount"));
  }

  const participants = [senderId, receiverId];

  const paymentDetails = processPayment(amount);

  const payment = new Payment({
    participants,
    totalAmount: paymentDetails.totalAmount,
    feeAmount: paymentDetails.feeAmount,
    netAmount: paymentDetails.netAmount,
  });

  try {
    const adminId = await findAdminId();
    await updateAccounts(senderId, receiverId, adminId, paymentDetails, next);
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    return next(errorHandler(500, "Error processing the payment"));
  }
};

export const generatePaymentSlip = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const receiverId = req.user._id;
    const { id: senderId } = req.params;
    if (!amount || amount <= 0) {
      return next(errorHandler(400, "Invalid Amount"));
    }
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
      sender: sender.username,
      receiverName: receiver.username,
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
