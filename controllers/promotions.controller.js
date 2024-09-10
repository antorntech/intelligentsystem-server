const Promotions = require("../models/Promotions");

// Get all promotions
module.exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotions.find({});
    res.status(200).send(promotions);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent promotions (last 3)
module.exports.getRecentPromotions = async (req, res) => {
  try {
    const promotions = await Promotions.find({});
    const recentPromotions = promotions.reverse().slice(0, 3);
    res.status(200).send(recentPromotions);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single promotion by ID
module.exports.singlePromotions = async (req, res) => {
  try {
    const { promotionsId } = req.params;
    const promotions = await Promotions.findById(promotionsId);
    res.status(200).send(promotions);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new promotion
module.exports.addPromotions = async (req, res) => {
  try {
    console.log(req.body);

    const newPromotions = await Promotions.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Promotion created successfully!",
      data: newPromotions,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a promotion by ID
module.exports.updatePromotions = async (req, res) => {
  try {
    const { promotionsId } = req.params;

    const updatedPromotion = await Promotions.findByIdAndUpdate(
      promotionsId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPromotion) {
      return res.status(404).json({
        status: "fail",
        message: "Promotion not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Promotion updated successfully!",
      data: updatedPromotion,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a promotion by ID
module.exports.deletePromotions = async (req, res) => {
  try {
    const { promotionsId } = req.params;
    const promotion = await Promotions.findByIdAndDelete(promotionsId);
    res.status(200).json({
      status: "success",
      message: "Promotion deleted successfully",
      data: promotion,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
