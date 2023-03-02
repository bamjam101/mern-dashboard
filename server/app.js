const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
// const registrantRoutes = require("./routes/registrants");

const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");

// Configuration for the server

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
// app.use("/registrant", registrantRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Mongoose setup
const PORT = process.env.Port || 5001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err}. Could Not Connect.`));
