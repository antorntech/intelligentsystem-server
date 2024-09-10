const Services = require("../models/Services");

// Get all services
module.exports.getServices = async (req, res) => {
  try {
    const services = await Services.find({});
    res.status(200).send(services);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent services (last 3)
module.exports.getRecentServices = async (req, res) => {
  try {
    const services = await Services.find({});
    const recentServices = services.reverse().slice(0, 3);
    res.status(200).send(recentServices);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single training by ID
module.exports.singleServices = async (req, res) => {
  try {
    const { servicesId } = req.params;
    const services = await Services.findById(servicesId);
    res.status(200).send(services);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new training
module.exports.addServices = async (req, res) => {
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

    const newServices = await Services.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Service created successfully!",
      data: newServices,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a training by ID
module.exports.updateServices = async (req, res) => {
  try {
    const { servicesId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    req.body.benefits = JSON.parse(req.body.benefits || "[]");
    req.body.offers = JSON.parse(req.body.offers || "[]");
    req.body.works = JSON.parse(req.body.works || "[]");
    req.body.tags = JSON.parse(req.body.tags || "[]");

    const updatedService = await Services.findByIdAndUpdate(
      servicesId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Service updated successfully!",
      data: updatedService,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a training by ID
module.exports.deleteServices = async (req, res) => {
  try {
    const { servicesId } = req.params;
    const training = await Services.findByIdAndDelete(servicesId);
    res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
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
