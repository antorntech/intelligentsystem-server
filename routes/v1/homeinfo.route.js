const express = require("express");
const app = express.Router();

const homeInfosController = require("../../controllers/homeinfos.controller");

app.get("/", homeInfosController.getHomeInfos);
app.get("/recent", homeInfosController.getRecentHomeInfos);
app.get("/:homeInfosId", homeInfosController.singleHomeInfos);
app.get(
  "/:homeInfosId/categories/:infoCategoriesId",
  homeInfosController.singleHomeInfoCategory
);
app.post("/add", upload.single("banner"), homeInfosController.addHomeInfos);
app.post("/:homeInfosId/add-category", homeInfosController.addHomeInfoCategory);
app.put(
  "/:id/categories/:infoCategoriesId",
  homeInfosController.updateHomeInfoCategory
);
app.put(
  "/update/:homeInfosId",
  upload.single("banner"),
  homeInfosController.updateHomeInfos
);
app.delete("/delete/:homeInfosId", homeInfosController.deleteHomeInfos);
app.delete(
  "/:trainingId/categories/:infoCategoriesId",
  homeInfosController.deleteHomeInfoCategory
);

module.exports = app;
