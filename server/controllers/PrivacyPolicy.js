const { DB } = require("../db/db");
const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");

exports.changePolicy = asyncHandler(async (req, res, next) => {
 const { table_prefix, content } = req.body;
 const Policy = DB.collection(`${table_prefix}_privacypolicies`);
 await Policy.updateOne(
  { table_prefix },
  { $set: { content, table_prefix } },
  { upsert: true }
 );
 return give_response(res, 200, true, "Privacy policy updated");
});

exports.getPolicy = asyncHandler(async (req, res, next) => {
 const { table_prefix } = req.body;
 const Policy = DB.collection(`${table_prefix}_privacypolicies`);
 const policy = await Policy.findOne({ table_prefix });
 return give_response(res, 200, true, "policy get success!", policy);
});
