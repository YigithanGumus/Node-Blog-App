const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post_id: { type: Number, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
