const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const Post = require("../models/Post");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");
const uploadFile = require("../utils/uploadFile");

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.post("/upload", async (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   let file = req.files.file;

//   if (!file) {
//     return res.status(400).send("File not found.");
//   }

//   const imagesPath = path.join(__dirname, "/../images/");

//   if (!fs.existsSync(imagesPath)) {
//     fs.mkdirSync(imagesPath, { recursive: true });
//   }

//   const uploadPath = path.join(imagesPath, file.name);

//   file.mv(uploadPath, function (err) {
//     if (err) return res.status(500).send(err);

//     res.send("File uploaded!");
//   });
// });

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  if (!req.files || !req.files.img) {
    return res.status(400).send("No image file was uploaded.");
  }

  try {
    const imgPath = await uploadFile(
      req.files.img,
      path.join(__dirname, "/../images/")
    );
    

    const findCategory = Category.findById({ _id:req.body.categories })

    if (!findCategory) {
      return res.status(500).json({ error: "Not found category" });
    }
    
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      img: imgPath,
      categories: req.body.categories, 
      article: req.body.article,
    });  

    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload or post creation failed." });
  }
});


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).
                            populate("categories").exec();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
