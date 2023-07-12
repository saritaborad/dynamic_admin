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
const common = require("./routes/commonRoute");

connectDB();

const port = process.env.PORT || 5000;
const app = express();
app.use("/dynamic_admin/images", express.static(path.join(__dirname, "dynamic_admin/images")));

app.use(express.json());
app.use(cors({ origin: process.env.REACT_LIVE_URL, credentials: true }));
app.use(cookieParser());
app.use(session({ key: "sid", secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.get("/", (req, res) => {
 res.send("get success!");
});

app.use("/api", common);
app.use("/img", imgUpload);
app.use("/app", application);
app.use("/app", privacy);
app.use("/app", version);
app.use("/app", customAd);
app.use("/app", dashboard);
app.use(errorHandler);

app.listen(port, () => console.log(`server is listening on localhost:${port}`));
