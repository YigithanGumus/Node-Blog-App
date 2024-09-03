const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    post_id: { type: Number, required: true },
    tag_id: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);
