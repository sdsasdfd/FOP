import Complain from "../model/complain.model.js";
import { errorHandler } from "../utils/error.js";

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
    const complains = await Complain.findOne({ generalComplain: false });

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
    const complains = await Complain.findOne({ generalComplain: true });

    if (!complains) {
      return next(errorHandler(404, "Not available!"));
    }

    res.status(200).json(complains);
  } catch (error) {
    next(error);
  }
};
