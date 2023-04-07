const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
 _id: { type: String },
 seq: { type: Number, default: 0 },
});

const counter = mongoose.model("counter", CounterSchema);

const appSchema = mongoose.Schema(
 {
  title: {
   type: String,
   trim: true,
   unique: true,
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
   default: Date.now(),
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
 const count = await counter.findByIdAndUpdate(
  { _id: "entityId" },
  { $inc: { seq: 1 } },
  { new: true, upsert: true }
 );
 doc.position = count.seq;
});

module.exports = mongoose.model("Application", appSchema);
