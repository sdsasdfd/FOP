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

    let order = { createdAt: -1 }; // Default order

    if (sortingOrder) {
      if (sortingOrder === "top") {
        order = { averageRating: -1 };
      } else if (sortingOrder === "asc") {
        order = { price: 1 };
      } else if (sortingOrder === "desc") {
        order = { price: -1 };
      }
    }

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
      title: { $regex: inputCategoryTitle, $options: "i" },
    });
    if (!category) {
      return next(errorHandler(404, "Category does not exist."));
    }

    res.status(200).json(category);
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const { username, email, location } = req.body;

//     let { image } = req.body;

//     if (image) {
//       const imgRes = await cloudinary.uploader.upload(image);
//       image = imgRes.secure_url;
//     }

//     const emailExist = await User.findOne({ email });
//     if (emailExist) {
//       return next(errorHandler(409, "Email already exist!"));
//     }

//     const updateUserData = {};

//     if (username) updateUserData.username = username;
//     if (email) updateUserData.email = email;
//     if (location) updateUserData.location = location;
//     if (image) updateUserData.image = image;

//     const user = await User.findByIdAndUpdate({ _id: userId }, updateUserData, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     if (!user) {
//       return next(errorHandler(404, "User not found"));
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     return next(errorHandler(500, "Error while updating user details"));
//   }
// };

export const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { username, email, location } = req.body;

  let { image } = req.body;
  try {
    let user = await User.findById(userId);

    if (!user) return next(errorHandler(404, "user not found"));

    if (image) {
      let userImage = user.image;
      if (user.image && image !== user.image) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.image.split("/").pop().split(".")[0]
        );
        if (image !== userImage) {
          const imgRes = await cloudinary.uploader.upload(image);
          image = imgRes.secure_url;
        }
        console.log("image ", image);
      } else if (!user.image) {
        const imgRes = await cloudinary.uploader.upload(image);
        image = imgRes.secure_url;
      }
    } else {
      image = user.image || "";
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.location = location || user.location;
    user.image = image || user.image;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateServiceProvider = async (req, res, next) => {
  const servicerId = req.user._id;
  const { username, email, location, category } = req.body;

  let { image } = req.body;
  try {
    let servicer = await User.findById(servicerId);

    if (!servicer) return next(errorHandler(404, "user not found"));

    // const updatedImg = image;
    if (image) {
      let serImage = servicer.image;
      if (servicer.image && image !== servicer.image) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          servicer.image.split("/").pop().split(".")[0]
        );
        if (image !== serImage) {
          const imgRes = await cloudinary.uploader.upload(image);
          image = imgRes.secure_url;
        }
        console.log("image ", image);
      } else if (!user.image) {
        const imgRes = await cloudinary.uploader.upload(image);
        image = imgRes.secure_url;
      }
    } else {
      image = user.image || "";
    }

    servicer.username = username || servicer.username;
    servicer.email = email || servicer.email;
    servicer.location = location || servicer.location;
    servicer.category = category || servicer.category;
    servicer.image = image || servicer.image;
    // servicer.image = updatedImg;

    await servicer.save();

    return res.status(200).json(servicer);
  } catch (error) {
    next(error);
  }
};

export const updateAdminProfile = async (req, res, next) => {
  const userId = req.user._id;
  const { username, email } = req.body;

  let { image } = req.body;
  try {
    let user = await User.findById(userId);

    if (!user) return next(errorHandler(404, "user not found"));

    if (image) {
      if (user.image) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.image.split("/").pop().split(".")[0]
        );
      }
      const imgRes = await cloudinary.uploader.upload(image);
      image = imgRes.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.image = image || user.image;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
