const express = require("express");
const app = express.Router();

const servicesController = require("../../controllers/services.controller");

app.get("/", servicesController.getServices);
app.get("/recent", servicesController.getRecentServices);
app.get("/:servicesId", servicesController.singleServices);
app.post("/add", upload.single("banner"), servicesController.addServices);
app.put(
  "/update/:servicesId",
  upload.single("banner"),
  servicesController.updateServices
);
app.delete("/delete/:servicesId", servicesController.deleteServices);

module.exports = app;
