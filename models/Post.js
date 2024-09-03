const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    article: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
