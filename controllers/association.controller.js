const Association = require("../models/Association");

module.exports.getAssociation = async (req, res) => {
  try {
    const association = await Association.find({});

    res.status(200).send(association);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.singleAssociation = async (req, res) => {
  try {
    const { associationId } = req.params;
    const association = await Association.findById(associationId);

    res.status(200).send(association);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.addAssociation = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        logo: "/uploads/images/" + req.file.filename,
      });
    }

    const newAssociation = await Association.create(req.body);

    res.status(200).json({
      message: "Association created successfully",
      association: newAssociation,
    });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.updateAssociation = async (req, res) => {
  try {
    const { associationId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        logo: "/uploads/images/" + req.file.filename,
      });
    }

    const result = await Association.findByIdAndUpdate(
      associationId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

module.exports.deleteAssociation = async (req, res) => {
  try {
    const { associationId } = req.params;
    const deletAssociation = await Association.findByIdAndDelete(associationId);

    if (!deletAssociation) {
      return res.status(404).send("Association is not found");
    }

    const recentAssociation = await Association.find({});

    res.status(200).send(recentAssociation);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }
};
