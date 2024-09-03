const mongoose = require("mongoose");

const PostCategorySchema = new mongoose.Schema(
  {
    post_id: { type: Number, required: true },
    category_id: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", PostCategorySchema);
