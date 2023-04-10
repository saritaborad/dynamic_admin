const mongoose = require("mongoose");

const AdTypeSchema = mongoose.Schema({
 title: {
  type: String,
 },
});

const adTypeTable = (name) => {
 mongoose.model(name, AdTypeSchema);
};

module.exports = { adTypeTable };
