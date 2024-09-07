const express = require("express");
const app = express.Router();

const herocontentController = require("../../controllers/herocontent.controller");

app.get("/", herocontentController.getHeroContent);
app.get("/:heroContentId", herocontentController.singleHeroContent);
app.post("/add", upload.single("banner"), herocontentController.addHeroContent);
app.put(
  "/update/:heroContentId",
  upload.single("banner"),
  herocontentController.updateHeroContent
);
app.delete("/delete/:heroContentId", herocontentController.deleteHeroContent);

module.exports = app;
