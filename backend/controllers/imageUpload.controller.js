import dotenv from "dotenv";

import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import path from 'path';

dotenv.config();

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB (adjust as needed)
  },
  fileFilter: (req, file, cb) => {
    // Basic file type validation
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(
        new Error("Invalid file type. Only JPG, PNG, GIF are allowed."),
        false
      ); // Reject file
    }
  },
});

export const uploadImage = async (req, res) => {
  // Check if a file was actually provided by Multer
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file provided." });
  }

  // `req.file.buffer` contains the image data as a Node.js Buffer
  const fileBuffer = req.file.buffer;
  const originalname = req.file.originalname;
  const mimetype = req.file.mimetype;

  console.log(
    `Received file in controller: ${originalname} (${mimetype}), size: ${fileBuffer.length} bytes`
  );

  try {
    // Upload the image buffer to Cloudinary.
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "blog_images", // Store in a 'blog_images' folder on Cloudinary
            // You can add more Cloudinary options here
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(fileBuffer); // End the stream with the file buffer
    });

    console.log("Cloudinary upload successful from controller:", uploadResult);

    // Send back the Cloudinary URL and other relevant information to the frontend
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
      imageUrl: uploadResult.secure_url, // Use secure_url for HTTPS
      publicId: uploadResult.public_id,
      originalFileName: originalname,
    });
  } catch (error) {
    console.error("Error during image upload process in controller:", error);
    // Handle other errors (e.g., Cloudinary API issues, network errors)
    res.status(500).json({
      success: false,
      message: "Failed to upload image.",
      error: error.message,
    });
  }
};

export const  uploadMiddleware = upload.single('image'); // Multer middleware configured for 'image' field
