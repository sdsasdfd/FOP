import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { Account } from "../model/account.model.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, location, roles, category } = req.body;

    if (!username || !email || !password || !location || !roles) {
      return next(errorHandler(400, "All Fields Are Required!"));
    }
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

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location,
      roles,
      category,
      isAdmin,
    });

    const account = await Account.create({ owner: user._id });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "15d",
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
      })
      .status(201)
      .json(user);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All Fields Are Required!"));
  }
  try {
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const isCorrectPassword = await bcrypt.compare(password, isUser.password);

    if (!isCorrectPassword) {
      return next(errorHandler(400, "invalid credentials"));
    }

    const token = jwt.sign({ userId: isUser._id }, process.env.SECRET, {
      expiresIn: "15d",
    });

    const user = await User.findById(isUser._id).select("-password");

    const oneDay = 1000 * 60 * 60 * 24;
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json("log out");
};
