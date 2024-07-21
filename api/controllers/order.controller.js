import Order from "../model/order.model.js";
import { errorHandler } from "../utils/error.js";
import { getReceiverSocketId } from "../socket/index.js";
import { io } from "../socket/index.js";

export const orderCompleted = async (req, res, next) => {
  // const { isCompleted } = req.query;
  try {
    const { id: user } = req.params;

    const existingOrder = await Order.findOne({
      user,
      servicer: req.user._id,
    });

    if (existingOrder) {
      const userSocketId = getReceiverSocketId(user);
      if (user) {
        io.to(userSocketId).emit("serviceCompleted", existingOrder.isCompleted);
        console.log("INSIDE API");
      }

      console.log(existingOrder);
      res.status(200).json(existingOrder);
    } else {
      const order = await Order.create({
        isCompleted: true,
        user,
        servicer: req.user._id,
      });

      if (!order) {
        return next(errorHandler(500, "Error creating order"));
      }
      const userSocketId = getReceiverSocketId(user);
      if (user) {
        io.to(userSocketId).emit("serviceCompleted", order.isCompleted);
        console.log("INSIDE API");
      }

      console.log(order);
      res.status(200).json(order);
    }
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const getCompletedOrder = async (req, res, next) => {
  try {
    const { id: servicer } = req.params;

    const order = await Order.findOne({
      user: req.user._id,
      servicer,
    });

    res.status(200).json(order);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};
