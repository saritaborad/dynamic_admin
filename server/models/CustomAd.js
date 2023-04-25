const mongoose = require("mongoose");

const CustomAdSchema = mongoose.Schema(
 {
  add_title: { type: String },
  add_desc: { type: String },
  advertisement_custom_multi: { type: Array },
  icon: { type: String },
  banner: { type: String },
  install: { type: String },
  color: { type: String },
  rating: { type: String },
  download: { type: String },
  review: { type: String },
  enable: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
 },
 { timestamps: true }
);

const CustomAdModel = mongoose.model("CustomAd", CustomAdSchema);
module.exports = CustomAdModel;
