import Gig from "../model/gig.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

export const createGig = async (req, res, next) => {
  const { price, description, subCategory, title } = req.body;
  let { coverImg } = req.body;
  try {
    if (req.user.roles !== "servicer") {
      return next(errorHandler(405, "not allowed"));
    }

    if (coverImg) {
      const imgRes = await cloudinary.uploader.upload(coverImg);
      coverImg = imgRes.secure_url;
    }

    const gig = await Gig.create({
      price,
      description,
      coverImg,
      servicerId: req.user._id,
      subCategory,
      title,
    });
    res.status(201).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findOne({ servicerId: req.params.id }).populate({
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

export const updateGig = async (req, res, next) => {
  try {
    const servicerId = req.user._id;
    const { description, price, subCategory } = req.body;

    let { coverImg } = req.body;

    const existedGig = await Gig.findOne({ servicerId });

    if (coverImg) {
      if (existedGig.coverImg) {
        await cloudinary.uploader.destroy(
          existedGig.coverImg.split("/").pop().split(".")[0]
        );
      }
      const imgRes = await cloudinary.uploader.upload(coverImg);
      coverImg = imgRes.secure_url;
    }

    const updateGigData = {};

    if (description) updateGigData.description = description;
    if (price) updateGigData.price = price;
    if (subCategory) updateGigData.subCategory = subCategory;
    if (coverImg) updateGigData.coverImg = coverImg;

    const gig = await Gig.findOneAndUpdate(
      { servicerId: servicerId },
      updateGigData
    );

    if (!gig) {
      return next(errorHandler(404, "Gig not found"));
    }

    res.status(200).json(gig);
  } catch (error) {
    next(error);
    return next(errorHandler(500, "Error updating the gig"));
  }
};
