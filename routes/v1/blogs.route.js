const express = require("express");
const app = express.Router();

const blogsController = require("../../controllers/blogs.controller");

app.get("/", blogsController.getBlogs);
app.get("/recent", blogsController.getRecentBlogs);
app.get("/:blogsId", blogsController.singleBlogs);
app.post("/add", upload.single("banner"), blogsController.addBlogs);
app.put(
  "/update/:blogsId",
  upload.single("banner"),
  blogsController.updateBlogs
);
app.delete("/delete/:blogsId", blogsController.deleteBlogs);

module.exports = app;
