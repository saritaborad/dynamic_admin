const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./db/db");
const application = require("./routes/Application");
const privacy = require("./routes/PrivacyPolicy");
const version = require("./routes/Version");
const errorHandler = require("./middleware/error");

connectDB();

const port = process.env.PORT || 3014;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(
 session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
 })
);
app.use(express.json());
app.use("/app", application);
app.use("/app", privacy);
app.use("/app", version);
app.use(errorHandler);

app.listen(port, () => {
 console.log(`server is listening on localhost:${port}`);
});
