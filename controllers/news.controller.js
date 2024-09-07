const News = require("../models/News");

module.exports.getNews = async (req, res) => {
  try {
    const blogs = await News.find({});

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getRecentNews = async (req, res) => {
  try {
    const allNews = await News.find({});
    const recentNews = allNews.reverse().slice(0, 3);
    res.status(200).send(recentNews);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.singleNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const news = await News.findById(newsId);
    res.status(200).send(news);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.addNews = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Create new News
    const newNews = await News.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "New News created successfully!",
      data: newNews,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateNews = async (req, res) => {
  try {
    const { newsId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const newNews = await News.findByIdAndUpdate(newsId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: newNews,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteNews = async (req, res) => {
  try {
    const { newsId } = req.params;
    const news = await News.findByIdAndDelete(newsId);
    res.status(200).json({
      status: "success",
      message: "News deleted successfully",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
