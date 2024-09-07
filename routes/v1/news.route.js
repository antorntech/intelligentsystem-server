const express = require("express");
const app = express.Router();

const newsController = require("../../controllers/news.controller");

app.get("/", newsController.getNews);
app.get("/recent", newsController.getRecentNews);
app.get("/:newsId", newsController.singleNews);
app.post("/add", upload.single("banner"), newsController.addNews);
app.put("/update/:newsId", upload.single("banner"), newsController.updateNews);
app.delete("/delete/:newsId", newsController.deleteNews);

module.exports = app;
