import Review from "../model/review.model.js";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";

export const addNewReview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id: gigId } = req.params;
    const { star, desc } = req.body;

    if (!desc || star > 5 || star < 1) {
      return next(errorHandler(400, "Invalid data"));
    }

    const review = await Review.create({
      gigId,
      userId,
      star,
      desc,
    });

    if (!review) {
      return next(errorHandler(500, "Error creating review"));
    }
    console.log(review);
    res.status(200).json(review);
  } catch (error) {
    return next(errorHandler(500, "Error creating review"));
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { id: gigId } = req.params;

    const reviews = await Review.find({ gigId }).populate({
      path: "userId",
      select: "-password",
    });
    console.log(reviews);

    res.status(200).json(reviews);
  } catch (error) {
    return next(errorHandler(500, "Error fetching all reviews"));
  }
};
