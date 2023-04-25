const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);
const useSession = require("./middleware/useSession");
require("dotenv").config();
const { connectDB } = require("./db/db");
const application = require("./routes/Application");
const privacy = require("./routes/PrivacyPolicy");
const version = require("./routes/Version");
const imgUpload = require("./routes/ImageUpload");
const errorHandler = require("./middleware/error");

connectDB();

const port = process.env.PORT || 3014;

const app = express();
const store = new MongoDBStore({
 uri: process.env.MONGO_URI,
 collection: "mySessions",
});

// to serve static files at /uploads route from uploads folder when req from frontend at /uploads
app.use("/uploads", express.static("uploads"));
app.use(
 cors({
  origin: "http://localhost:3000",
  credentials: true,
 })
);

app.use(cookieParser());

app.use(
 session({
  key: "sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
 })
);
app.use(express.json());
app.use("/img", imgUpload);
app.use("/app", application);
app.use("/app", privacy);
app.use("/app", version);
app.use(errorHandler);

app.listen(port, () => {
 console.log(`server is listening on localhost:${port}`);
});
