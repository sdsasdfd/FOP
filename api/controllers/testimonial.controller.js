import Testimonial from "../model/testimonial.model.js";
import { errorHandler } from "../utils/error.js";

export const addNewTestimonial = async (req, res, next) => {
  try {
    const { description } = req.body;
    const testimonial = await Testimonial.create({
      description,
      user: req.user._id,
    });

    if (!testimonial) {
      return next(errorHandler(500, "Error adding testimonial"));
    }

    res.status(200).json(testimonial);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find()
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    if (!testimonials) {
      return next(errorHandler(404, "Testimonials not found"));
    }

    res.status(200).json(testimonials);
  } catch (error) {
    return next(errorHandler(500, "Error while fetching testimonials"));
  }
};
