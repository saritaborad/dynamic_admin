const mongoose = require("mongoose");

const versionSchema = mongoose.Schema({
 title: { type: String },
 code: { type: Number },
 features: { type: String },
 ad_master: { type: String },
 users: { type: Number },
 enabled: { type: Number },
 is_force: { type: Number },
 date: { type: Date, default: Date.now() },
});

const verionTable = (name) => {
 mongoose.model(name, versionSchema);
};

module.exports = { verionTable };
