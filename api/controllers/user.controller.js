import User from "../model/userModel.js";
import Category from "../model/category.model.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloundinary } from "cloudinary";
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

export const getLocationCategory = async (req, res, next) => {
  try {
    const { category } = req.query;

    const servicers = await User.find({
      roles: "servicer",
      category,
      location: req.user.location,
    });

    const gigInfo = await Gig.find({ servicerId: servicers._id });
    console.log(gigInfo);

    res.status(200).json(servicers);
  } catch (error) {
    next(error);
  }
};
