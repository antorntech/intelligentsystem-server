const Contact = require("../models/Contact");

module.exports.getContact = async (req, res) => {
  try {
    const about = await Contact.find({});

    res.status(200).send(about);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.singleContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const about = await Contact.findById(contactId);

    res.status(200).send(about);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.addContact = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Create new Contact
    const newContact = await Contact.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "New Contact created successfully!",
      data: newContact,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: newContact,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const about = await Contact.findByIdAndDelete(contactId);

    if (!about) {
      return res.status(404).send("Contact not found");
    } else {
      return res.status(200).json({
        message: "Contact deleted successfully",
        about: about,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
