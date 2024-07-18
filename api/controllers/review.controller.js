import Gig from "../model/gig.model.js";
import Review from "../model/review.model.js";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";

const calculateAverageRating = (starCounts) => {
  const starCountValues = Object.values(starCounts);

  const totalScore = starCountValues.reduce((total, count, index) => {
    return total + count * (index + 1);
  }, 0);

  const sumOfResponses = starCountValues.reduce(
    (acc, currentStar) => acc + currentStar,
    0
  );

  const score = sumOfResponses ? totalScore / sumOfResponses : 0;

  const roundedScore = score.toFixed(1);
  console.log("rounded scores :::: " + roundedScore);
  return roundedScore;
};

export const addNewReview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id: servicerId } = req.params;
    const { star, desc } = req.body;

    if (!desc || star > 5 || star < 1) {
      return next(errorHandler(400, "Invalid data"));
    }

    const review = await Review.create({
      servicerId,
      userId,
      star,
      desc,
    });
    console.log("CHECKKK!!!!");

    if (!review) {
      return next(errorHandler(500, "Error creating review"));
    }
    console.log("review added :::: ", review);

    const reviews = await Review.find({ servicerId });
    console.log("reviews fetched :::::", reviews);

    const starCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => {
      if (review.star >= 1 && review.star <= 5) {
        starCounts[review.star]++;
      }
    });

    const averageRating = calculateAverageRating(starCounts);

    const gig = await Gig.findOne({ servicerId });

    gig.averageRating = averageRating;
    gig.save({ validateBeforeSave: false });

    res.status(200).json(review);
  } catch (error) {
    return next(errorHandler(500, "Error creating review"));
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { id: servicerId } = req.params;

    const reviews = await Review.find({ servicerId }).populate({
      path: "userId",
      select: "-password",
    });
    console.log(reviews);

    const reviewCount = await Review.countDocuments({ servicerId });

    const starCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => {
      if (review.star >= 1 && review.star <= 5) {
        starCounts[review.star]++;
      }
    });

    const responses = {
      reviews,
      starCounts,
      reviewCount,
    };

    res.status(200).json(responses);
  } catch (error) {
    return next(errorHandler(500, "Error fetching all reviews"));
  }
};
