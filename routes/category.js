const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const Category = require("../models/Category");
const Post = require("../models/Post");
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const Categories = await Category.find();
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Kategori bulunamadı." });
    }

    const posts = await Post.find({ categories: category._id });
    category.posts = posts;

    const result = {
      category: category,
      posts: posts
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Kategori arama hatası:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Kategori bulunamadı." });
    }

    await category.delete();

    await Post.deleteMany({ categories: category._id });

    res.status(200).json("Kategori başarıyla silindi.");
  } catch (error) {
    console.error("Kategori silme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası oluştu." });
  }
});

module.exports = router;
