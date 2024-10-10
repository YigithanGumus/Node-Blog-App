const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate('post_id');

    if (!comments) {
      return res.status(404).json({ error: "Comments not found." });
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    category = await Comment.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const Comment = await Comment.findById(req.params.id).populate('post_id');

    if (!Comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(Comment);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
