const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
  const router = require("express").Router();
  const Tag = require("../models/Tag");
  
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedTag = await Tag.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTag);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const newTag = new Tag(req.body);
      const savedTag = await newTag.save();
  
      res.status(201).json(savedTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const Tags = await Tag.find();
      res.status(200).json(Tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/find/:id", async (req, res) => {
    try {
      const Tag = await Tag.findById(req.params.id);
      res.status(200).json(Tag);
    } catch (error) {
      res.status(404).json(error);
    }
  });
  
  module.exports = router;
  