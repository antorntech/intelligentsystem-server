const express = require("express");
const app = express.Router();

const aboutController = require("../../controllers/about.controller");

app.get("/", aboutController.getAbout);
app.get("/:aboutId", aboutController.singleAbout);
app.post(
  "/add",
  upload.fields([
    { name: "main_banner", maxCount: 1 },
    { name: "home_banner1", maxCount: 1 },
    { name: "home_banner2", maxCount: 1 },
  ]),
  aboutController.addAbout
);
app.put(
  "/update/:aboutId",
  upload.fields([
    { name: "main_banner", maxCount: 1 },
    { name: "home_banner1", maxCount: 1 },
    { name: "home_banner2", maxCount: 1 },
  ]),
  aboutController.updateAbout
);
app.delete("/delete/:aboutId", aboutController.deleteAbout);

module.exports = app;
