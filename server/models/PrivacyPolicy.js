const mongoose = require("mongoose");

const privacySchema = mongoose.Schema({
 content: { type: String },
 date: { type: Date, default: Date.now() },
 table_prefix: { type: String },
});

const privacyTable = (name) => {
 mongoose.model(name, privacySchema, name);
};

module.exports = { privacyTable };
