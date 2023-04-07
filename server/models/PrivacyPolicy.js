const mongoose = require("mongoose");

const privacySchema = mongoose.Schema({
 content: { type: String },
 date: { type: String },
});

module.exports = { privacySchema };
