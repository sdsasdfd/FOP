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

// export const createGig = async (req, res, next) => {
//   const existingGig = await Gig.findOne({ servicerId: req.user._id });

//   if (existingGig) {
//     return next(errorHandler(409, "Gig already exists"));
//   }
//   // TODO :: check if gig already exists?
//   const { price, description, subCategory, title } = req.body;

//   try {
//     if (req.user.roles !== "servicer") {
//       return next(errorHandler(405, "not allowed"));
//     }

//     let coverImgLocalPath = req.file?.path;
//     console.log(req.file);

//     if (!coverImgLocalPath) {
//       return next(errorHandler(204, "No Cover Image Provided"));
//     }

//     const coverImgRes = await uploadOnCloudinary(coverImgLocalPath);

//     if (!coverImgRes) {
//       return next(errorHandler(500, "Something went wrong!"));
//     }
//     console.log(coverImgRes.url);

//     const gig = await Gig.create({
//       price,
//       description,
//       coverImg: coverImgRes?.url,
//       servicerId: req.user._id,
//       subCategory,
//       title,
//     });
//     res.status(201).json(gig);
//   } catch (error) {
//     next(error);
//   }
// };

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findOne({ servicerId: req.params.id });

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

    let coverImgLocalPath = req.file?.path;
    let coverImgUrl = null;

    if (coverImgLocalPath) {
      const coverImage = await uploadOnCloudinary(coverImgLocalPath);
      coverImgUrl = coverImage.url;
    }

    const updateGigData = {};

    if (description) updateGigData.description = description;
    if (price) updateGigData.price = price;
    if (subCategory) updateGigData.subCategory = subCategory;
    if (coverImgUrl) updateGigData.coverImg = coverImgUrl;

    const gig = await Gig.findOneAndUpdate(
      { servicerId: servicerId },
      updateGigData,
      {
        new: true,
      }
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
