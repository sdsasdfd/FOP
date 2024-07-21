import { MessageRequest } from "../model/messageRequest.model.js";
import { errorHandler } from "../utils/error.js";

import { io, getReceiverSocketId } from "../socket/index.js";
import User from "../model/userModel.js";

export const sendMessageRequest = async (req, res, next) => {
  try {
    const { id: servicer } = req.params;
    const user = req.user._id;

    const request = await MessageRequest.create({
      servicer,
      user,
    });

    if (!request) {
      return next(errorHandler(500, "Error while sending message request."));
    }

    // if (servicer) {
    //     const servicerSocketId = getReceiverSocketId(servicer)
    //     io.to(servicerSocketId).emit("sendMessageRequest", request.message)
    // }

    res.status(200).json(request);
  } catch (error) {
    return next(errorHandler(500, "Error sending message request."));
  }
};

// export const sendResponseOfMessageRequest = async (req, res, next) => {
//   try {
//     const { requestStatus } = req.body;
//     const { id: requestId } = req.params;
//     console.log(requestStatus);

//     if (requestStatus === "accepted") {
//       const messageRequest = await MessageRequest.findIdAndUpdate(
//         { _id: requestId },
//         { $set: { requestStatus: "accepted" } },
//         { new: true }
//       );
//       console.log(messageRequest);
//       if (!messageRequest) {
//         return next(
//           errorHandler(500, "Error while sending response to message request")
//         );
//       }

//       res.status(200).json(messageRequest);
//     } else {
//       const messageRequest = await MessageRequest.findIdAndUpdate(
//         { _id: requestId },
//         { $set: { requestStatus: "rejected" } },
//         { new: true }
//       );

//       if (!messageRequest) {
//         return next(
//           errorHandler(500, "Error while sending response to message request")
//         );
//       }

//       res.status(200).json(messageRequest);
//     }
//   } catch (error) {
//     return next(
//       errorHandler(500, "Error while sending response to message request")
//     );
//   }
// };

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

export const getAllMessageRequests = async (req, res, next) => {
  try {
    const currentUser = req.user._id;
    console.log(currentUser);
    let requests;
    const user = await User.findOne({
      _id: currentUser,
    });

    if (user.roles === "user") {
      requests = await MessageRequest.find({
        user: currentUser,
      })
        .populate({
          path: "servicer",
          select: "-password",
        })
        .sort({ createdAt: -1 });

      if (!requests) {
        return next(errorHandler(404, "Requests not found"));
      }
      res.status(200).json(requests);
    } else if (user.roles === "servicer") {
      requests = await MessageRequest.find({
        servicer: currentUser,
      })
        .populate({
          path: "user",
          select: "-password",
        })
        .sort({ createdAt: -1 });

      if (!requests) {
        return next(errorHandler(404, "Requests not found"));
      }

      res.status(200).json(requests);
    }
  } catch (error) {
    return next(errorHandler(500, "Error while fetching requests"));
  }
};
