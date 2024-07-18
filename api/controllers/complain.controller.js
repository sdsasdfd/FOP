import Complain from "../model/complain.model.js";
import User from "../model/userModel.js";

import { errorHandler } from "../utils/error.js";
import { sendMail } from "../utils/mailSend.js";

export const makeComplainForServicer = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id: servicerId } = req.params;
  const { complainDesc } = req.body;
  const generalComplain = false;

  if (complainDesc === 0) {
    return next(errorHandler(403, "fill the field!"));
  }
  try {
    const complain = await Complain.create({
      userId,
      servicerId,
      complainDesc,
      generalComplain,
    });

    res.status(201).json(complain);
  } catch (error) {
    next(error);
  }
};

export const getServicerComplain = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  try {
    const complains = await Complain.find({ generalComplain: false })
      .populate({
        path: "userId",
        select: "-password",
      })
      .populate({
        path: "servicerId",
        select: "-password",
      });

    if (!complains) {
      return next(errorHandler(404, "Not available!"));
    }

    res.status(200).json(complains);
  } catch (error) {
    next(error);
  }
};

export const makeGeneralComplain = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { complainDesc } = req.body;
  const generalComplain = true;

  if (complainDesc === 0) {
    return next(errorHandler(403, "fill the field!"));
  }
  try {
    const complain = await Complain.create({
      userId,
      complainDesc,
      generalComplain,
    });

    res.status(201).json(complain);
  } catch (error) {
    next(error);
  }
};

export const getGeneralComplain = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  try {
    const complains = await Complain.find({ generalComplain: true }).populate({
      path: "userId",
      select: "-password",
    });

    if (!complains) {
      return next(errorHandler(404, "Not available!"));
    }

    res.status(200).json(complains);
  } catch (error) {
    next(error);
  }
};

export const giveResponse = async (req, res, next) => {
  const { complainDesc, subject } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return errorHandler(next(404, "User not Found!"));
    }

    sendMail(user.email, subject, `Hi ${user.username} ${complainDesc}`);

    res.status(200).json("Response sent", user.username);
  } catch (error) {
    next(error);
  }
};
