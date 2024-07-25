import { MessageRequest } from "../model/messageRequest.model.js";
import { errorHandler } from "../utils/error.js";

import { io, getReceiverSocketId } from "../socket/index.js";
import User from "../model/userModel.js";

export const sendMessageRequest = async (req, res, next) => {
  try {
    const { id: servicer } = req.params;
    const user = req.user._id;

    const newRequest = await MessageRequest.create({
      servicer,
      user,
    });

    if (!newRequest) {
      return next(errorHandler(500, "Error while sending message request."));
    }

    const request = await MessageRequest.findById(newRequest._id).populate({
      path: "user",
      select: "-password",
    });

    if (!request) {
      return next(errorHandler(404, "Not found"));
    }

    if (servicer) {
      const servicerSocketId = getReceiverSocketId(servicer);
      io.to(servicerSocketId).emit("sendMessageRequest", request);
    }

    res.status(200).json(request);
  } catch (error) {
    return next(errorHandler(500, "Error sending message request."));
  }
};

export const sendResponseOfMessageRequest = async (req, res, next) => {
  try {
    const { requestStatus } = req.body;
    const { id: requestId } = req.params;

    if (requestStatus === "accepted") {
      const messageRequest = await MessageRequest.findByIdAndUpdate(
        { _id: requestId },
        { $set: { requestStatus: "accepted" } },
        { new: true }
      );

      if (!messageRequest) {
        return next(
          errorHandler(500, "Error while sending response to message request")
        );
      }

      res.status(200).json(messageRequest);
    } else {
      const messageRequest = await MessageRequest.findByIdAndUpdate(
        { _id: requestId },
        { $set: { requestStatus: "rejected" } },
        { new: true }
      );

      if (!messageRequest) {
        return next(
          errorHandler(500, "Error while sending response to message request")
        );
      }

      res.status(200).json(messageRequest);
    }
  } catch (error) {
    return next(
      errorHandler(500, "Error while sending response to message request")
    );
  }
};

export const getAllMessageRequestsForServicer = async (req, res, next) => {
  const currentUser = req.user._id;
  try {
    const requests = await MessageRequest.find({ servicer: currentUser })
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const getAllMessageRequestsForUser = async (req, res, next) => {
  try {
    const currentUser = req.user._id;

    const requests = await MessageRequest.find({
      user: currentUser,
    })
      .populate({
        path: "servicer",
        select: "-password",
      })
      .sort({
        createdAt: -1,
      });

    if (!requests) {
      return next(errorHandler(404, "Requests not found"));
    }
    res.status(200).json(requests);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const getStatusOfRequest = async (req, res, next) => {
  try {
    const { id: requestId } = req.params;

    const request = await MessageRequest.findById(requestId).populate({
      path: "user",
      select: "-password",
    });
    if (!request) {
      return next(errorHandler(404, "Request not found"));
    }

    res.status(200).json(request);
  } catch (error) {
    return next(
      errorHandler(500, "Error occured while fetching message requests.")
    );
  }
};

export const getAllMessageRequestsForAdmin = async (req, res, next) => {
  try {
    const requests = await MessageRequest.find()
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "servicer",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    return next(
      errorHandler(500, "Error occured while fetching message requests.")
    );
  }
};
