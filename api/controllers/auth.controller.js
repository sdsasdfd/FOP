import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, location, roles, category } = req.body;
    let { isAdmin } = req.body;
    const numberOfUsers = await User.countDocuments();

    if (numberOfUsers > 0) {
      isAdmin = false;
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(errorHandler(409, "Email already exist"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // let serviceCategory;

    // if (roles === "servicer") {
    //   serviceCategory = req.body.category;

    //   if (serviceCategory === "") {
    //     return next(errorHandler(400, "select the category"));
    //   }
    // }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location,
      roles,
      category,
      isAdmin,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const isCorrectPassword = await bcrypt.compare(password, isUser.password);

    if (!isCorrectPassword) {
      return next(errorHandler(400, "invalid credentials"));
    }

    const token = jwt.sign({ userId: isUser._id }, process.env.SECRET);

    const user = await User.findById(isUser._id).select("-password");

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json("log out");
};
