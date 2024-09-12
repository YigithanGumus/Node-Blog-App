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
    const comments = await Comment.find().populate('post_id'); // Post bilgilerini getirir
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/find/:id", async (req, res) => {
  try {
    const Comment = await Comment.findById(req.params.id);
    res.status(200).json(Comment);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
