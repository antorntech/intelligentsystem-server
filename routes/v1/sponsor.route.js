const express = require("express");
const app = express.Router();

const sponsorsController = require("../../controllers/sponsors.controller");

app.get("/", sponsorsController.getSponsors);
app.get("/recent", sponsorsController.getRecentSponsors);
app.get("/:sponsorsId", sponsorsController.singleSponsors);
app.post("/add", upload.single("banner"), sponsorsController.addSponsors);
app.put(
  "/update/:sponsorsId",
  upload.single("banner"),
  sponsorsController.updateSponsors
);
app.delete("/delete/:sponsorsId", sponsorsController.deleteSponsors);

module.exports = app;
