import User from "../model/userModel.js";
import Category from "../model/category.model.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";
import Gig from "../model/gig.model.js";
export const user = (req, res) => {
  res.json(req.user);
};

export const getUsers = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const users = await User.find({ roles: "user" }).select("-password");
    const usersLength = users.length;
    res.json({ usersLength, users });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const getServicers = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const servicers = await User.find({ roles: "servicer" }).select(
      "-password"
    );
    const servicersLength = servicers.length;
    res.json({ servicersLength, servicers });
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.user.isAdmin && req.user._id.toString() !== id) {
      return next(errorHandler(401, "Unauthorize"));
    }

    const user = await User.findById(id);

    if (user.image) {
      await cloundinary.uploader.destroy(
        user.image.split("/").pop().split(".")[0]
      );
    }

    await User.findByIdAndDelete(id);
    res.status(200).json("user deleted");

    res.json("testing");
  } catch (error) {
    next(error);
  }
};

export const deleteServicer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.user.isAdmin && req.user._id.toString() !== id) {
      return next(errorHandler(401, "Unauthorize"));
    }

    const user = await User.findById(id);

    if (user.image) {
      await cloundinary.uploader.destroy(
        user.image.split("/").pop().split(".")[0]
      );
    }

    await User.findByIdAndDelete(id);
    res.status(200).json("servicer deleted");

    res.json("testing");
  } catch (error) {
    next(error);
  }
};

export const getLocationCategory = async (req, res, next) => {
  try {
    const { category, sortingOrder } = req.query;

    const order = sortingOrder
      ? { price: sortingOrder === "asc" ? 1 : -1 }
      : { createdAt: -1 };

    const servicers = await User.find({
      roles: "servicer",
      category,
      location: req.user.location,
    });

    if (!servicers.length) {
      return next(
        errorHandler(
          404,
          "No servicers found for the given location and category!"
        )
      );
    }

    const servicerIds = servicers.map((servicer) => servicer._id);

    const gigs = await Gig.find({ servicerId: { $in: servicerIds } })
      .sort(order)
      .populate({
        path: "servicerId",
        match: { location: req.user.location },
      });

    res.status(200).json(gigs);
  } catch (error) {
    return next(errorHandler(500, "Error fetching gigs"));
  }
};

export const getCategoriesBasedOnLocation = async (req, res, next) => {
  console.log("inside api");
  try {
    const userLocation = req.user.location;

    const servicersAvailableAtLocation = await User.find({
      location: userLocation,
    }).select("-password");

    const categoriesAvailable = servicersAvailableAtLocation.map(
      (servicer) => servicer.category
    );

    const categories = await Category.find({
      title: { $in: categoriesAvailable },
    });

    res.status(200).json(categories);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const searchCategory = async (req, res, next) => {
  try {
    const { inputCategoryTitle } = req.query;

    const category = await Category.find({
      title: inputCategoryTitle,
    });
    if (!category) {
      return next(errorHandler(404, "Category does not exist."));
    }

    res.status(200).json(category);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { username, email, location } = req.body;

    let { image } = req.body;

    if (image) {
      const imgRes = await cloudinary.uploader.upload(image);
      image = imgRes.secure_url;
    }

    const updateUserData = {};

    if (username) updateUserData.username = username;
    if (email) updateUserData.email = email;
    if (location) updateUserData.location = location;
    if (image) updateUserData.image = image;

    const user = await User.findByIdAndUpdate({ _id: userId }, updateUserData, {
      new: true,
    }).select("-password");

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (error) {
    return next(errorHandler(500, "Error while updating user details"));
  }
};

export const updateServiceProvider = async (req, res, next) => {
  try {
    const servicerId = req.user._id;
    const { username, email, location, category } = req.body;

    let { image } = req.body;

    if (image) {
      const imgRes = await cloudinary.uploader.upload(image);
      image = imgRes.secure_url;
    }

    const updateServicerData = {};

    if (username) updateServicerData.username = username;
    if (email) updateServicerData.email = email;
    if (location) updateServicerData.location = location;
    if (category) updateServicerData.category = category;
    if (image) updateServicerData.image = image;

    const serviceProvider = await User.findByIdAndUpdate(
      { _id: servicerId },
      updateServicerData,
      {
        new: true,
      }
    ).select("-password");

    if (!serviceProvider) {
      return next(errorHandler(404, "Service Provider not found"));
    }

    res.status(200).json(serviceProvider);
  } catch (error) {
    return next(errorHandler(500, "Error while updating user details"));
  }
};

export const updateAdminProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const adminId = req.user._id;
    let { image } = req.body;

    if (image) {
      try {
        const imgRes = await cloudinary.uploader.upload(image);
        console.log(image);
        image = imgRes.secure_url;
      } catch (error) {
        return next(errorHandler(500, "Error uploading image"));
      }
    }

    console.log(username, email, image);
    if (!username && !email) {
      return next(errorHandler(400, "Provide Input"));
    }

    const adminProfileInput = {};

    if (username) adminProfileInput.username = username;
    if (email) adminProfileInput.email = email;
    if (image) adminProfileInput.image = image;

    const updatedAdmin = await User.findByIdAndUpdate(
      { _id: adminId },
      adminProfileInput,
      {
        new: true,
      }
    ).select("-password");

    console.log(updatedAdmin);

    res.status(200).json(updatedAdmin);
  } catch (error) {
    return next(errorHandler(500, "Error updating profile."));
  }
};
