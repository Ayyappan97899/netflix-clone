const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "files",
    allowedFormats: ["jpeg", "png", "jpg", "mp4", "webm", "ogg"],
    resource_type: "auto",
  },
});

const uploadFiles = multer({ storage: storage });

module.exports = uploadFiles;
