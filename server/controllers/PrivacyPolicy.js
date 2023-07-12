const moment = require("moment");
const { DB } = require("../db/db");
const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");

exports.changePolicy = asyncHandler(async (req, res, next) => {
 const { table_prefix, content, _id } = req.body;
 const Policy = DB.collection(`${table_prefix}_privacypolicy`);
 await Policy.updateOne({ _id: _id }, { $set: { content, date: moment(Date.now()).format("YYYY-MM-DD HH:mm") } }, { upsert: true });
 return give_response(res, 200, true, "Privacy policy updated");
});

exports.getPolicy = asyncHandler(async (req, res, next) => {
 const { table_prefix } = req.body;
 const Policy = DB.collection(`${table_prefix}_privacypolicy`);
 const policy = await Policy.findOne();
 return give_response(res, 200, true, "policy get success!", policy);
});
