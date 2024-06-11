import Gig from "../model/gig.model.js";
import { errorHandler } from "../utils/error.js";

export const createGig = async (req, res, next) => {
  const { price, description, coverImg, subCategory } = req.body;

  try {
    if (req.user.roles !== "servicer") {
      return next(errorHandler(405, "not allowed"));
    }

    const gig = await Gig.create({
      price,
      description,
      coverImg,
      servicerId: req.user._id,
      subCategory,
    });
    res.status(201).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id).populate({
      path: "servicerId",
      select: "-password",
    });

    if (!gig) {
      return next(errorHandler(404, "Not found!"));
    }

    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};
