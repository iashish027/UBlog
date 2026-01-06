import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
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