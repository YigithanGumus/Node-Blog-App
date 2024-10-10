const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    tags: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }, 
    article: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
