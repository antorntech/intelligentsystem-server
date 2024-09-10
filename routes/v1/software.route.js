const express = require("express");
const app = express.Router();

const softwaresController = require("../../controllers/softwares.controller");

app.get("/", softwaresController.getSoftwares);
app.get("/recent", softwaresController.getRecentSoftwares);
app.get("/:softwaresId", softwaresController.singleSoftwares);
app.post("/add", upload.single("banner"), softwaresController.addSoftwares);
app.put(
  "/update/:softwaresId",
  upload.single("banner"),
  softwaresController.updateSoftwares
);
app.delete("/delete/:softwaresId", softwaresController.deleteSoftwares);

module.exports = app;
