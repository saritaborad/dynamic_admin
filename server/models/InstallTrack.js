const mongoose = require("mongoose");

const installTrackSchama = mongoose.Schema({
 app_version: {
  type: String,
 },
 count: {
  type: Number,
  default: 0,
 },
 date: {
  type: Date,
  default: Date.now,
 },
});

const InstallTrackModal = mongoose.model("installtrack_counts", installTrackSchama);
module.exports = InstallTrackModal;
