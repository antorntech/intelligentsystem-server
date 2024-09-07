const express = require("express");
const app = express.Router();

const trainingsController = require("../../controllers/trainings.controller");

app.get("/", trainingsController.getTrainings);
app.get("/recent", trainingsController.getRecentTrainings);
app.get("/:trainingsId", trainingsController.singleTrainings);
app.get(
  "/:trainingsId/module/:moduleId",
  trainingsController.singleTrainingModule
);
app.post("/add", upload.single("banner"), trainingsController.addTrainings);
app.post("/:trainingsId/add-module", trainingsController.addTrainingModule);
app.put("/:id/modules/:moduleId", trainingsController.updateTrainingModule);
app.put(
  "/update/:trainingsId",
  upload.single("banner"),
  trainingsController.updateTrainings
);
app.delete("/delete/:trainingsId", trainingsController.deleteTrainings);
app.delete(
  "/:trainingId/module/:moduleId",
  trainingsController.deleteTrainingModule
);

module.exports = app;
