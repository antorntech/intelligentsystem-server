const About = require("../models/About");

module.exports.getAbout = async (req, res) => {
  try {
    const about = await About.find({});

    res.status(200).send(about);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.singleAbout = async (req, res) => {
  try {
    const { aboutId } = req.params;
    const about = await About.findById(aboutId);

    res.status(200).send(about);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.addAbout = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.files["main_banner"]) {
      Object.assign(req.body, {
        main_banner: `/uploads/images/${req.files["main_banner"][0].filename}`,
      });
    }

    if (req.files["home_banner1"]) {
      Object.assign(req.body, {
        home_banner1: `/uploads/documents/${req.files["home_banner1"][0].filename}`,
      });
    }

    if (req.files["home_banner2"]) {
      Object.assign(req.body, {
        home_banner2: `/uploads/documents/${req.files["home_banner2"][0].filename}`,
      });
    }

    // Create new About
    const newAbout = await About.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "New About created successfully!",
      data: newAbout,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateAbout = async (req, res) => {
  try {
    const { aboutId } = req.params;

    // Check if files were uploaded
    if (req.files["main_banner"]) {
      Object.assign(req.body, {
        main_banner: `/uploads/images/${req.files["main_banner"][0].filename}`,
      });
    }

    if (req.files["home_banner1"]) {
      Object.assign(req.body, {
        home_banner1: `/uploads/documents/${req.files["home_banner1"][0].filename}`,
      });
    }

    if (req.files["home_banner2"]) {
      Object.assign(req.body, {
        home_banner2: `/uploads/documents/${req.files["home_banner2"][0].filename}`,
      });
    }

    const newAbout = await About.findByIdAndUpdate(aboutId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: newAbout,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteAbout = async (req, res) => {
  try {
    const { aboutId } = req.params;
    const about = await About.findByIdAndDelete(aboutId);

    if (!about) {
      return res.status(404).send("About not found");
    } else {
      return res.status(200).json({
        message: "About deleted successfully",
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
