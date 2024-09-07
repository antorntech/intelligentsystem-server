const express = require("express");
const app = express.Router();

const eventsController = require("../../controllers/events.controller");

app.get("/", eventsController.getEvents);
app.get("/recent", eventsController.getRecentEvents);
app.get("/:eventsId", eventsController.singleEvents);
app.post("/add", upload.single("banner"), eventsController.addEvents);
app.put(
  "/update/:eventsId",
  upload.single("banner"),
  eventsController.updateEvents
);
app.delete("/delete/:eventsId", eventsController.deleteEvents);

module.exports = app;
