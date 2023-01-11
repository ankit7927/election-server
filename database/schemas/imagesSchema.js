const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  imageName: String,
  imageDec: String,
  imageUrl: String,
});

module.exports = mongoose.model("Images", imagesSchema);
