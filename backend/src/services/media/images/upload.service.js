import { v2 as cloudinary } from "cloudinary";
import { env } from "../../../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});


export const uploadImage = async (fileBuffer , folder) => {
    // Upload the image buffer to Cloudinary.
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder, // Store in a 'blog_images' folder on Cloudinary
                    // You can add more Cloudinary options here
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(fileBuffer); // End the stream with the file buffer
    });

    return uploadResult;
};