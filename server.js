const formData = require("express-form-data");
const express = require("express");
const connection = require("./databases/db");
const route = require("./routes/routes");
// require('./cron-job');
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const app2 = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const filterFile = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(formData.parse());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

app2.use(cors());
app2.use(multer({ storage: storage }).single('image'));

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Service API");
});

app2.post("/", (req, res) => {
  if (!req.file) res.status(400).json({ message: "Input image" });
  res.send("Service API");
});

async function connect() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connect();

// cron.start();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

app2.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
