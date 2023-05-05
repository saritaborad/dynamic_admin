const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { connectDB } = require("./db/db");
const errorHandler = require("./middleware/error");

const application = require("./routes/Application");
const privacy = require("./routes/PrivacyPolicy");
const version = require("./routes/Version");
const imgUpload = require("./routes/ImageUpload");
const customAd = require("./routes/CustomAd");
const dashboard = require("./routes/Dashboard");

connectDB();

const port = process.env.PORT || 3014;
const app = express();

app.use("/dynamic_admin/images", express.static(path.join(__dirname, "dynamic_admin/images")));

app.use(express.json());
app.use(cors({ origin: "http://piks.in:5000", credentials: true }));
app.use(cookieParser());
app.use(session({ key: "sid", secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

app.use("/img", imgUpload);
app.use("/app", application);
app.use("/app", privacy);
app.use("/app", version);
app.use("/app", customAd);
app.use("/app", dashboard);
app.use(errorHandler);

app.listen(port, () => console.log(`server is listening on localhost:${port}`));
