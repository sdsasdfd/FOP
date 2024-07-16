import Faq from "../model/Faq.model.js";
import { errorHandler } from "../utils/error.js";

export const getFaqForUser = async (req, res, next) => {
  try {
    const faqs = await Faq.find({ isUser: true });
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};

export const createFaqForUser = async (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  const { answer, question } = req.body;
  const isUser = true;
  try {
    const newFaq = await Faq.create({ answer, question, isUser });
    res.status(200).json(newFaq);
  } catch (error) {
    next(error);
  }
};

export const getFaqForServicer = async (req, res, next) => {
  try {
    const faqs = await Faq.find({ isUser: false });
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};

export const createFaqForServicer = async (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  const { answer, question } = req.body;
  const isUser = false;
  try {
    const newFaq = await Faq.create({ answer, question, isUser });
    res.status(200).json(newFaq);
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return next(errorHandler(404, "Faq not found!"));
    }
    await Faq.findByIdAndDelete(req.params.id);

    res.status(200).json("Faq Deleted");
  } catch (error) {
    next(error);
  }
};

export const getFaq = async (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return next(errorHandler(404, "Faq not found!"));
    }

    res.status(200).json(faq);
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  const { isAdmin } = req.user;
  const { answer, question } = req.body;

  if (!isAdmin) {
    return next(errorHandler(403, "Forbidden"));
  }
  try {
    const updateFaq = await Faq.findByIdAndUpdate(
      req.params.id,

      { $set: { answer, question } },
      { new: true }
    );

    res.status(200).json(updateFaq);
  } catch (error) {
    next(error);
  }
};
