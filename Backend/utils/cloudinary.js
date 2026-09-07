import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (file, folder = "ecom") => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!file) return null;

  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
    });

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return uploadResult.secure_url;
  } catch (error) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    throw new Error(
      error.message || "Cloudinary image upload failed"
    );
  }
};

export default uploadOnCloudinary;