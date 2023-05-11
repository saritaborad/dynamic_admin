const mongoose = require("mongoose");

const versionSchema = mongoose.Schema({
 title: { type: String, trim: true },
 code: { type: Number },
 features: { type: String, trim: true },
 users: { type: Number, default: 0 },
 enabled: { type: Number },
 is_force: { type: Number },
 version_note: { type: String },
 date: { type: Date, default: Date.now },
 ad_master: [
  {
   version: { type: String },
   adm_name: { type: String, trim: true },
   version_Id: {
    type: mongoose.Schema.Types.ObjectId,
   },
   count: { type: Number },
   enable: { type: Number, default: 0 },
   adm_date: { type: Date, default: Date.now },
   visibility: { type: String, default: "Not Set" },
   ad_chield: [
    {
     version: { type: String },
     ad_token: { type: String, trim: true },
     ad_keyword: { type: String, trim: true },
     version_Id: { type: mongoose.Schema.Types.ObjectId },
     enable: { type: Number, default: 0 }, // enable - 1, disable-0 , blocked-2
     position: { type: Number, default: 0 },
     adc_date: {
      type: Date,
      default: Date.now,
     },
    },
   ],
  },
 ],
});

const verionTable = (name) => {
 mongoose.model(name, versionSchema, name);
};

module.exports = { verionTable };
