const express = require("express");
const app = express.Router();

const roadmapsController = require("../../controllers/roadmaps.controller");

app.get("/", roadmapsController.getRoadmaps);
app.get("/recent", roadmapsController.getRecentRoadmaps);
app.get("/:roadmapsId", roadmapsController.singleRoadmaps);
app.post("/add", roadmapsController.addRoadmaps);
app.put("/update/:roadmapsId", roadmapsController.updateRoadmaps);
app.delete("/delete/:roadmapsId", roadmapsController.deleteRoadmaps);

module.exports = app;
