const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug); // initialize slug plugin

const postSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, slug: "title", unique: true },
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  categories: [String], // optional categories or tags
  imageUrl: String, // URL from Cloudinary
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
