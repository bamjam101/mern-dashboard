const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const networkRoutes = require("./routes/networks");
const registrantRoutes = require("./routes/registrants");
const recoveryRoutes = require("./routes/recovery");
const referralRoutes = require("./routes/referrals");
const withdrawRoutes = require("./routes/withdraw");
const walletRoutes = require("./routes/wallet");
const statsRoutes = require("./routes/stats");

const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// importing automating function
const prop = require("./cron");

// Configuration for the server
mongoose.set("strictQuery", true);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Automated processing of incentives
prop.task.start();

//static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/referral", referralRoutes);
app.use("/network", networkRoutes);
app.use("/registrant", registrantRoutes);
app.use("/recovery", recoveryRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/wallet", walletRoutes);
app.use("/stat", statsRoutes);

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
  .catch((err) => {
    console.log(`${err}. Could Not Connect.`);
    process.exit(1);
  });
