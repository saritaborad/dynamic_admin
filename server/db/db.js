const mongoose = require("mongoose");

const connectDB = () => {
 mongoose
  .connect("mongodb://127.0.0.1:27017/demo1", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  })
  .then(() => {
   console.log("database connected");
  });
};

module.exports = connectDB;
