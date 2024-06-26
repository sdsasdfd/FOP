import { Account } from "../model/account.model.js";
import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";

export const getAccountDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById({ _id: userId });

    if (!user) {
      return next(errorHandler(404, "User does not exists."));
    }

    const account = await Account.findOne({ owner: userId });
    if (!account) {
      return next(errorHandler(404, "Account does not exists."));
    }
    console.log(account);

    res.status(200).json(account);
  } catch (error) {
    return next(errorHandler(500, "Error fetching account details"));
  }
};
