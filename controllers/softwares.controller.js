const Softwares = require("../models/Softwares");

// Get all softwares
module.exports.getSoftwares = async (req, res) => {
  try {
    const softwares = await Softwares.find({});
    res.status(200).send(softwares);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent softwares (last 3)
module.exports.getRecentSoftwares = async (req, res) => {
  try {
    const softwares = await Softwares.find({});
    const recentSoftwares = softwares.reverse().slice(0, 3);
    res.status(200).send(recentSoftwares);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single training by ID
module.exports.singleSoftwares = async (req, res) => {
  try {
    const { softwaresId } = req.params;
    const softwares = await Softwares.findById(softwaresId);
    res.status(200).send(softwares);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new training
module.exports.addSoftwares = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    req.body.benefits = JSON.parse(req.body.benefits || "[]");
    req.body.devTools = JSON.parse(req.body.devTools || "[]");
    req.body.keyFeatures = JSON.parse(req.body.keyFeatures || "[]");
    req.body.tags = JSON.parse(req.body.tags || "[]");

    const newSoftwares = await Softwares.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Softwares created successfully!",
      data: newSoftwares,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a training by ID
module.exports.updateSoftwares = async (req, res) => {
  try {
    const { softwaresId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    req.body.benefits = JSON.parse(req.body.benefits || "[]");
    req.body.devTools = JSON.parse(req.body.devTools || "[]");
    req.body.keyFeatures = JSON.parse(req.body.keyFeatures || "[]");
    req.body.tags = JSON.parse(req.body.tags || "[]");

    const updatedSoftware = await Softwares.findByIdAndUpdate(
      softwaresId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSoftware) {
      return res.status(404).json({
        status: "fail",
        message: "Software not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Software updated successfully!",
      data: updatedSoftware,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a training by ID
module.exports.deleteSoftwares = async (req, res) => {
  try {
    const { softwaresId } = req.params;
    const training = await Softwares.findByIdAndDelete(softwaresId);
    res.status(200).json({
      status: "success",
      message: "softwares deleted successfully",
      data: training,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
