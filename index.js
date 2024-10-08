const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Minio = require('minio');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const commentRoute = require("./routes/comment");
const tagRoute = require("./routes/tag");
const fileUpload = require('express-fileupload');

dotenv.config();

app.use(fileUpload()); // fileUpload middleware'i burada tanımlanıyor

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "blog",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("başarılı"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);
app.use("/api/tags", tagRoute);

app.listen(5000, () => {
  console.log("API Aktif durumdadır!");
});
