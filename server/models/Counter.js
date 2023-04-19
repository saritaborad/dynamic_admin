const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
 _id: { type: String },
 seq: { type: Number, default: 0 },
});

const CounterModel = (name) => {
 mongoose.model(name, CounterSchema);
};

module.exports = { CounterModel };
