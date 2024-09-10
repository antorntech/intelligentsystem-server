const Training = require("../models/Training");

// Get all trainings
module.exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({});
    res.status(200).send(trainings);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent trainings (last 3)
module.exports.getRecentTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({});
    const recentTrainings = trainings.reverse().slice(0, 3);
    res.status(200).send(recentTrainings);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single training by ID
module.exports.singleTrainings = async (req, res) => {
  try {
    const { trainingsId } = req.params;
    const trainings = await Training.findById(trainingsId);
    res.status(200).send(trainings);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new training
module.exports.addTrainings = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    req.body.benefits = JSON.parse(req.body.benefits || "[]");
    req.body.offers = JSON.parse(req.body.offers || "[]");
    req.body.works = JSON.parse(req.body.works || "[]");
    req.body.tags = JSON.parse(req.body.tags || "[]");

    const newTrainings = await Training.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Trainings created successfully!",
      data: newTrainings,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a training by ID
module.exports.updateTrainings = async (req, res) => {
  try {
    const { trainingsId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    req.body.benefits = JSON.parse(req.body.benefits || "[]");
    req.body.offers = JSON.parse(req.body.offers || "[]");
    req.body.works = JSON.parse(req.body.works || "[]");
    req.body.tags = JSON.parse(req.body.tags || "[]");

    const updatedTraining = await Training.findByIdAndUpdate(
      trainingsId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTraining) {
      return res.status(404).json({
        status: "fail",
        message: "Training not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Training updated successfully!",
      data: updatedTraining,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a training by ID
module.exports.deleteTrainings = async (req, res) => {
  try {
    const { trainingsId } = req.params;
    const training = await Training.findByIdAndDelete(trainingsId);
    res.status(200).json({
      status: "success",
      message: "trainings deleted successfully",
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

// Add a new module to a specific training
module.exports.addTrainingModule = async (req, res) => {
  try {
    const { trainingsId } = req.params;
    const { title, subTitle, lists } = req.body;

    const training = await Training.findById(trainingsId);

    if (!training) {
      return res.status(404).json({
        status: "fail",
        message: "Training not found!",
      });
    }

    // Add new module to the training
    training.module.push({
      title,
      subTitle,
      lists: JSON.parse(lists || "[]"), // Parse the list if it's a string
    });

    await training.save();

    res.status(200).json({
      status: "success",
      message: "Module added successfully!",
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

module.exports.singleTrainingModule = async (req, res) => {
  try {
    const { trainingsId, moduleId } = req.params;
    const training = await Training.findById(trainingsId);
    if (!training) {
      return res.status(404).json({
        status: "fail",
        message: "Training not found!",
      });
    } else {
      const module = training.module.find((mod) => mod.id === moduleId);
      if (!module) {
        return res.status(404).json({
          status: "fail",
          message: "Module not found!",
        });
      } else {
        res.status(200).json({
          status: "success",
          module,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.updateTrainingModule = async (req, res) => {
  const { id, moduleId } = req.params;
  const { title, subTitle, lists } = req.body;

  try {
    // Find the training by ID
    const training = await Training.findById(id).exec();

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Find the module by ID within the training
    const module = training.module.id(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Update module details
    module.title = title || module.title;
    module.subTitle = subTitle || module.subTitle;
    module.lists = Array.isArray(lists) ? lists : module.lists;

    // Save the training with the updated module
    await training.save();

    res.status(200).json(module);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the module", error });
  }
};

module.exports.deleteTrainingModule = async (req, res) => {
  const { trainingId, moduleId } = req.params;

  try {
    // Find the training document and remove the module by its ID from the 'module' array
    const result = await Training.findOneAndUpdate(
      { _id: trainingId },
      { $pull: { module: { _id: moduleId } } }, // Use 'module' as the field name
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Training or module not found" });
    }

    res.status(200).json({ message: "Module deleted successfully", result });
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
