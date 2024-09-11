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
app.post("/add", homeInfosController.addHomeInfos);
app.post(
  "/:homeInfosId/add-infoCategory",
  upload.single("banner"),
  homeInfosController.addHomeInfoCategory
);
app.put(
  "/:id/categories/:infoCategoriesId",
  upload.single("banner"), // This middleware handles file uploads
  homeInfosController.updateHomeInfoCategory
);

app.put("/update/:homeInfosId", homeInfosController.updateHomeInfos);
app.delete("/delete/:homeInfosId", homeInfosController.deleteHomeInfos);
app.delete(
  "/:homeInfoId/categories/:infoCategoriesId",
  homeInfosController.deleteHomeInfoCategory
);

module.exports = app;
