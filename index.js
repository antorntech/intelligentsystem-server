const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

// There are the code of file upload
global.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync("public/uploads/images", { recursive: true });
      cb(null, "public/uploads/images");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

// app Use
const app = express();

app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + " URL - " + req.url);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const adminRoutes = require("./routes/v1/admin.route");
const blogRoutes = require("./routes/v1/blogs.route");
const softwareRoutes = require("./routes/v1/software.route");
const serviceRoutes = require("./routes/v1/service.route");
const trainingRoutes = require("./routes/v1/training.route");
const contactRoutes = require("./routes/v1/contact.route");
const promotionRoutes = require("./routes/v1/promotion.route");
const faqsRoutes = require("./routes/v1/faq.route");
const sponsorsRoutes = require("./routes/v1/sponsor.route");
const reviewsRoutes = require("./routes/v1/review.route");
const slidersRoutes = require("./routes/v1/slider.route");
const roadmapsRoutes = require("./routes/v1/roadmap.route");

// DB Connection
const connection = require("./db/connection");

// Connect DB
connection();

const port = process.env.PORT || 8000;

// All Routes will be here
app.get("/", (req, res) => {
  res.send("Welcome to the API Server");
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/softwares", softwareRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/trainings", trainingRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/promotions", promotionRoutes);
app.use("/api/v1/faqs", faqsRoutes);
app.use("/api/v1/sponsors", sponsorsRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/sliders", slidersRoutes);
app.use("/api/v1/roadmaps", roadmapsRoutes);

app.listen(port, () => {
  console.log("listening on port " + port);
});
