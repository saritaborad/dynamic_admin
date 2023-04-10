const asyncHandler = require("../middleware/async");
const { DB } = require("../db/db");
const give_response = require("../middleware/help");

exports.addVersion = asyncHandler(async (req, res, next) => {
 const { is_force, enabled, ad_master, features, code, title, table_prefix } =
  req.body;

 const Version = DB.collection(`${table_prefix}_version_tables`);
 const version = await Version.insertOne({
  title,
  is_force,
  enabled,
  ad_master,
  features,
  code,
 });
 return give_response(res, 200, true, "Version added successfully!");
});

exports.getAllVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, filter } = req.body;
 const Version = DB.collection(`${table_prefix}_version_tables`);

 const version = await Version.find().toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });
 return give_response(res, 200, true, "all version get successfull!", version);
});
