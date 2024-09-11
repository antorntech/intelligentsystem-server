const HomeInfo = require("../models/HomeInfo");

// Get all homeInfos
module.exports.getHomeInfos = async (req, res) => {
  try {
    const homeInfos = await HomeInfo.find({});
    res.status(200).send(homeInfos);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent homeInfos (last 3)
module.exports.getRecentHomeInfos = async (req, res) => {
  try {
    const homeInfos = await HomeInfo.find({});
    const recentHomeInfos = homeInfos.reverse().slice(0, 3);
    res.status(200).send(recentHomeInfos);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single homeInfo by ID
module.exports.singleHomeInfos = async (req, res) => {
  try {
    const { homeInfosId } = req.params;
    const homeInfos = await HomeInfo.findById(homeInfosId);
    res.status(200).send(homeInfos);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new homeInfo
module.exports.addHomeInfos = async (req, res) => {
  try {
    const newHomeInfos = await HomeInfo.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New HomeInfos created successfully!",
      data: newHomeInfos,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a homeInfo by ID
module.exports.updateHomeInfos = async (req, res) => {
  try {
    const { homeInfosId } = req.params;

    const updatedHomeInfo = await HomeInfo.findByIdAndUpdate(
      homeInfosId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedHomeInfo) {
      return res.status(404).json({
        status: "fail",
        message: "HomeInfo not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "HomeInfo updated successfully!",
      data: updatedHomeInfo,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a homeInfo by ID
module.exports.deleteHomeInfos = async (req, res) => {
  try {
    const { homeInfosId } = req.params;
    const homeInfo = await HomeInfo.findByIdAndDelete(homeInfosId);
    res.status(200).json({
      status: "success",
      message: "homeInfos deleted successfully",
      data: homeInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new category to a specific homeInfo
module.exports.addHomeInfoCategory = async (req, res) => {
  try {
    const { homeInfosId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const { title, link, banner } = req.body;
    const homeInfo = await HomeInfo.findById(homeInfosId);

    if (!homeInfo) {
      return res.status(404).json({
        status: "fail",
        message: "HomeInfo not found!",
      });
    }

    // Add new category to infoCategories
    homeInfo.infoCategories.push({
      title,
      link,
      banner,
    });

    await homeInfo.save();

    res.status(200).json({
      status: "success",
      message: "Category added successfully!",
      data: homeInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.singleHomeInfoCategory = async (req, res) => {
  try {
    const { homeInfosId, infoCategoriesId } = req.params;
    const homeInfo = await HomeInfo.findById(homeInfosId);
    if (!homeInfo) {
      return res.status(404).json({
        status: "fail",
        message: "HomeInfo not found!",
      });
    } else {
      const infoCategories = homeInfo.infoCategories.find(
        (cat) => cat.id === infoCategoriesId
      );
      if (!infoCategories) {
        return res.status(404).json({
          status: "fail",
          message: "Category not found!",
        });
      } else {
        res.status(200).json({
          status: "success",
          infoCategories,
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

module.exports.updateHomeInfoCategory = async (req, res) => {
  const { id, infoCategoriesId } = req.params; // IDs from the route

  // If a file (image) is uploaded, add it to the request body
  if (req.file) {
    req.body.banner = "/uploads/images/" + req.file.filename;
  }

  const { title, link, banner } = req.body; // Get the fields from the request

  try {
    // Find the HomeInfo by ID
    const homeInfo = await HomeInfo.findById(id);

    if (!homeInfo) {
      return res.status(404).json({ message: "HomeInfo not found" });
    }

    // Find the specific infoCategory by its ID
    const infoCategory = homeInfo.infoCategories.id(infoCategoriesId);

    if (!infoCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the infoCategory fields
    infoCategory.title = title || infoCategory.title;
    infoCategory.link = link || infoCategory.link;
    infoCategory.banner = banner || infoCategory.banner;

    // Save the updated document
    await homeInfo.save();

    res.status(200).json({
      message: "Category updated successfully!",
      data: infoCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "An error occurred while updating the category",
      error: error.message,
    });
  }
};

module.exports.deleteHomeInfoCategory = async (req, res) => {
  const { homeInfoId, infoCategoriesId } = req.params; // Parameters from the route

  try {
    // Find the HomeInfo document and remove the category by its ID from the 'infoCategories' array
    const result = await HomeInfo.findOneAndUpdate(
      { _id: homeInfoId },
      { $pull: { infoCategories: { _id: infoCategoriesId } } }, // Pull the category from the array
      { new: true } // Return the updated document
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "HomeInfo or category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully", result });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
