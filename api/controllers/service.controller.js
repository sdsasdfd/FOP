import Service from "../model/service.model.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";

export const createService = async (req, res, next) => {
  const { title, description } = req.body;
  let { image } = req.body;

  if (!title || !description || !image) {
    return next(errorHandler(400, "All Fields Are Required!"));
  }
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    if (image) {
      const imageRes = await cloudinary.uploader.upload(image);
      image = imageRes.secure_url;
    }

    const service = await Service.create({ title, description, image });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const categories = await Service.find();
    const categoryNumber = await Service.countDocuments();

    res.status(200).json({ categoryNumber, categories });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(errorHandler(404, "Service not found!"));
    }
    // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
    if (service.image) {
      const publicId = service.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
      console.log("deleted...");
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json("Service Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const { description, title } = req.body;
  let { image } = req.body;

  if (!title || !description || !image) {
    return next(errorHandler(400, "All Fields Are Required!"));
  }
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(errorHandler(404, "Service not found!"));
    }

    if (image) {
      let serviceImage = category.image;
      if (category.image && image !== category.image) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          service.image.split("/").pop().split(".")[0]
        );
        if (image !== serviceImage) {
          const imgRes = await cloudinary.uploader.upload(image);
          image = imgRes.secure_url;
        }
        console.log("image ", image);
      } else if (!service.image) {
        const imgRes = await cloudinary.uploader.upload(image);
        image = imgRes.secure_url;
      }
    } else {
      image = service.image || "";
    }

    const updateService = await Service.findByIdAndUpdate(
      req.params.id,

      { $set: { title, description, image } },
      { new: true }
    );

    res.status(200).json(updateService);
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return next(errorHandler(403, "Forbidden"));
    }

    const isService = await Service.findById(req.params.id);

    if (!isService) {
      return next(errorHandler(404, "Service not found!"));
    }

    const service = await Service.findById(req.params.id);

    res.status(200).json(service);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

export const getServiceName = async (req, res, next) => {
  try {
    const services = await Service.find({});
    const titles = services.map((service) => service.title);
    res.status(200).json(titles);
  } catch (error) {
    next(error);
  }
};
