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
    const comments = await Comment.find().populate('post_id').exec();

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

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("post_id").exec();

    if (!comment) {
      return res.status(404).json({ error: "Yorum bulunamadı." });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Yorum arama hatası:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
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
