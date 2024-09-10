const Sponsors = require("../models/Sponsors");

// Get all sponsors
module.exports.getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsors.find({});
    res.status(200).send(sponsors);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent sponsors (last 3)
module.exports.getRecentSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsors.find({});
    const recentSponsors = sponsors.reverse().slice(0, 3);
    res.status(200).send(recentSponsors);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single training by ID
module.exports.singleSponsors = async (req, res) => {
  try {
    const { sponsorsId } = req.params;
    const sponsors = await Sponsors.findById(sponsorsId);
    res.status(200).send(sponsors);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new training
module.exports.addSponsors = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const newSponsors = await Sponsors.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Sponsor created successfully!",
      data: newSponsors,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a training by ID
module.exports.updateSponsors = async (req, res) => {
  try {
    const { sponsorsId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const updatedSponsor = await Sponsors.findByIdAndUpdate(
      sponsorsId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSponsor) {
      return res.status(404).json({
        status: "fail",
        message: "Sponsor not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Sponsor updated successfully!",
      data: updatedSponsor,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a training by ID
module.exports.deleteSponsors = async (req, res) => {
  try {
    const { sponsorsId } = req.params;
    const training = await Sponsors.findByIdAndDelete(sponsorsId);
    res.status(200).json({
      status: "success",
      message: "Sponsor deleted successfully",
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
