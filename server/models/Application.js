const mongoose = require("mongoose");
const { increseCount } = require("../commonFun/commonFun");

const appSchema = mongoose.Schema(
 {
  title: {
   type: String,
   trim: true,
  },
  table_prefix: {
   type: String,
   trim: true,
  },
  position: {
   type: Number,
   default: 0,
  },
  enable: {
   type: Number,
   default: 0,
  },
  date: {
   type: Date,
   default: Date.now,
  },
 },
 {
  timestamps: true,
 }
);
appSchema.pre("save", async function (next) {
 var doc = this;
 if (!this.isNew) {
  next();
  return;
 }

 const count = await increseCount("counters");
 doc.position = count;
});

module.exports = mongoose.model("Application", appSchema, "application");
