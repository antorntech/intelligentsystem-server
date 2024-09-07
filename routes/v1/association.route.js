const express = require("express");
const app = express.Router();

const associationController = require("../../controllers/association.controller");

app.get("/", associationController.getAssociation);
app.get("/:associationId", associationController.singleAssociation);
app.post("/add", upload.single("logo"), associationController.addAssociation);
app.put(
  "/update/:associationId",
  upload.single("logo"),
  associationController.updateAssociation
);
app.delete("/delete/:associationId", associationController.deleteAssociation);

module.exports = app;
