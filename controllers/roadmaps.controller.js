const Roadmaps = require("../models/Roadmaps");

// Get all roadmaps
module.exports.getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmaps.find({});
    res.status(200).send(roadmaps);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent roadmaps (last 3)
module.exports.getRecentRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmaps.find({});
    const recentRoadmaps = roadmaps.reverse().slice(0, 3);
    res.status(200).send(recentRoadmaps);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single roadmap by ID
module.exports.singleRoadmaps = async (req, res) => {
  try {
    const { roadmapsId } = req.params;
    const roadmaps = await Roadmaps.findById(roadmapsId);
    res.status(200).send(roadmaps);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new roadmap
module.exports.addRoadmaps = async (req, res) => {
  try {
    console.log(req.body);

    const newRoadmaps = await Roadmaps.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New RoadMap created successfully!",
      data: newRoadmaps,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a roadmap by ID
module.exports.updateRoadmaps = async (req, res) => {
  try {
    const { roadmapsId } = req.params;

    const updatedRoadMap = await Roadmaps.findByIdAndUpdate(
      roadmapsId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRoadMap) {
      return res.status(404).json({
        status: "fail",
        message: "RoadMap not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "RoadMap updated successfully!",
      data: updatedRoadMap,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a roadmap by ID
module.exports.deleteRoadmaps = async (req, res) => {
  try {
    const { roadmapsId } = req.params;
    const roadmap = await Roadmaps.findByIdAndDelete(roadmapsId);
    res.status(200).json({
      status: "success",
      message: "RoadMap deleted successfully",
      data: roadmap,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
