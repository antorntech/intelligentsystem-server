const express = require("express");
const app = express.Router();

const contactController = require("../../controllers/contact.controller");

app.get("/", contactController.getContact);
app.get("/:contactId", contactController.singleContact);
app.post("/add", contactController.addContact);
app.put("/update/:contactId", contactController.updateContact);
app.delete("/delete/:contactId", contactController.deleteContact);

module.exports = app;
