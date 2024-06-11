import Category from "../model/category.model.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

export const createCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }
    const { title, description } = req.body;
    let { image } = req.body;

    if (image) {
      const imageRes = await cloudinary.uploader.upload(image);
      image = imageRes.secure_url;
    }

    const post = await Category.create({ title, description, image });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    // const { isAdmin } = req.user;
    // if (!isAdmin && !req.user) {
    //   return next(errorHandler(403, "Forbidden"));
    // }

    const categories = await Category.find();
    const categoryNumber = await Category.countDocuments();

    res.status(200).json({ categoryNumber, categories });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(errorHandler(404, "Category not found!"));
    }
    // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
    if (category.image) {
      const publicId = category.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
      console.log("deleted...");
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json("Category Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }
    const { description, title } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(errorHandler(404, "Category not found!"));
    }
    let { image } = req.body;

    if (image) {
      if (category.image) {
        await cloudinary.uploader.destroy(
          category.image.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(image);

      image = uploadResponse.secure_url;
    }

    // category.title = title || category.title;
    // category.image = image || category.image;
    // category.description = description || category.description;

    // const updateCategory = await category.save();

    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,

      { $set: { title, description, image } },
      { new: true }
    );

    res.status(200).json(updateCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const isCategory = await Category.findById(req.params.id);

    if (!isCategory) {
      return next(errorHandler(404, "Category not found!"));
    }

    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const getCategoryName = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    const titles = categories.map((category) => category.title);
    res.status(200).json(titles);
  } catch (error) {
    next(error);
  }
};
