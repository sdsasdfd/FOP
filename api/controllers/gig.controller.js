import Gig from "../model/gig.model.js";
import { errorHandler } from "../utils/error.js";

export const createGig = async (req, res, next) => {
  const { price, description, coverImg } = req.body;

  try {
    // if (req.user.roles === "user") {
    //   return next(errorHandler(401), "not authorized");
    // }

    const gig = await Gig.create({
      price,
      description,
      coverImg,
      servicerId: req.user._id,
    });
    res.status(201).json(gig);
  } catch (error) {
    next(error);
  }
};
