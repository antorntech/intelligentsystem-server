const HeroContent = require("../models/HeroContent");

module.exports.getHeroContent = async (req, res) => {
  try {
    const heroContent = await HeroContent.find({});

    res.status(200).send(heroContent);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.singleHeroContent = async (req, res) => {
  try {
    const { heroContentId } = req.params;
    const heroContent = await HeroContent.findById(heroContentId);

    res.status(200).send(heroContent);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports.addHeroContent = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Create new HeroContent
    const newHeroContent = new HeroContent(req.body);

    await newHeroContent.save();

    return res.status(201).json({
      status: "success",
      message: "New HeroContent created successfully!",
      data: newHeroContent,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateHeroContent = async (req, res) => {
  try {
    const { heroContentId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const newHeroContent = await HeroContent.findByIdAndUpdate(
      heroContentId,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: newHeroContent,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteHeroContent = async (req, res) => {
  try {
    const { heroContentId } = req.params;
    const heroContent = await HeroContent.findByIdAndDelete(heroContentId);

    if (!heroContent) {
      return res.status(404).send("HeroContent not found");
    } else {
      return res.status(200).json({
        message: "HeroContent deleted successfully",
        heroContent: heroContent,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
