const express = require("express");
const app = express.Router();

const promotionsController = require("../../controllers/promotions.controller");

app.get("/", promotionsController.getPromotions);
app.get("/recent", promotionsController.getRecentPromotions);
app.get("/:promotionsId", promotionsController.singlePromotions);
app.post("/add", promotionsController.addPromotions);
app.put("/update/:promotionsId", promotionsController.updatePromotions);
app.delete("/delete/:promotionsId", promotionsController.deletePromotions);

module.exports = app;
