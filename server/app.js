const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./db/db");
const application = require("./routes/Application");
const errorHandler = require("./middleware/error");

connectDB();

const port = process.env.PORT || 3014;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/app", application);
app.use(errorHandler);

app.listen(port, () => {
 console.log(`server is listening on localhost:${port}`);
});
