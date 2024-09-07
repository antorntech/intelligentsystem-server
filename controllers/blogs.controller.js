const Blogs = require("../models/Blogs");

module.exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getRecentBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    const recentBlogs = blogs.reverse().slice(0, 3);
    res.status(200).send(recentBlogs);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.singleBlogs = async (req, res) => {
  try {
    const { blogsId } = req.params;
    const blogs = await Blogs.findById(blogsId);
    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.addBlogs = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Ensure tags is an array
    if (typeof req.body.tags === "string") {
      req.body.tags = JSON.parse(req.body.tags); // Convert from JSON string to array
    }

    // Create new Blogs
    const newBlogs = await Blogs.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "New Blogs created successfully!",
      data: newBlogs,
    });
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
};

module.exports.updateBlogs = async (req, res) => {
  try {
    const { blogsId } = req.params;

    // Check if a new file was uploaded
    if (req.file) {
      // Update the banner path
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Ensure tags is an array
    if (typeof req.body.tags === "string") {
      req.body.tags = JSON.parse(req.body.tags); // Convert from JSON string to array
    }

    // Find and update the blog
    const updatedBlog = await Blogs.findByIdAndUpdate(blogsId, req.body, {
      new: true,
      runValidators: true, // Optional: Ensure validation on update
    });

    if (!updatedBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Blog updated successfully!",
      data: updatedBlog,
    });
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteBlogs = async (req, res) => {
  try {
    const { blogsId } = req.params;
    const blogs = await Blogs.findByIdAndDelete(blogsId);
    res.status(200).json({
      status: "success",
      message: "Blogs deleted successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
