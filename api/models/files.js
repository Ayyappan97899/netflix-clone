const mongoose = require("mongoose");

const FilesSchema = new mongoose.Schema(
  {
    img: { type: String },
    imgsm: { type: String },
    trailer: { type: String },
    video: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Files", FilesSchema);
