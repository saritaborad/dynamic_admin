const asyncHandler = require("../middleware/async");
const { getCollection } = require("../db/db");
const give_response = require("../middleware/help");
const { ObjectId } = require("mongodb");

exports.addVersion = asyncHandler(async (req, res, next) => {
 const { is_force, enabled, features, code, title, table_prefix } = req.body;

 const Version = getCollection(`${table_prefix}_version_tables`);
 const version = await Version.insertOne({ title, is_force, enabled, features, code }, function (err, res) {
  return give_response(res, 400, false, err.message);
 });
 return give_response(res, 200, true, "Version added!");
});

exports.getAllVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, filter, sort, order } = req.body;

 let find = {};
 var sortObject = {};
 var stype = sort ? sort : "position";
 var sdir = order?.toLowerCase() === "asc" ? 1 : -1;
 sortObject[stype] = sdir;

 if (req.body?.search) {
  find = { $or: [{ title: { $regex: `.*${req.body.search?.trim()}.*`, $options: "i" } }] };
 } else {
  find = {};
 }

 const page = req.body.page && req.body.page != 0 ? req.body.page : 1;
 const limit = req.body.sizePerPage && req.body.sizePerPage != 0 ? req.body.sizePerPage : 10;
 const startIndex = (page - 1) * limit;
 const options = { skip: startIndex, limit: limit, sort: sortObject };

 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find(find, options).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 return give_response(res, 200, true, "all version get successfull!", version);
});

exports.delVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, _id } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);
 const version = await Version.deleteOne({ _id: new ObjectId(_id) });
 return give_response(res, 200, true, "Version deleted!");
});

exports.editVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, _id, title, is_force, enabled, features, code, version_note } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.updateOne({ _id: new ObjectId(_id) }, { $set: { title, is_force, enabled, features, code, version_note: version_note } }, function (err, result) {
  if (err) return give_response(res, 400, false, err.message);
 });
 return give_response(res, 200, true, "Version updated!");
});

exports.addTitle = asyncHandler(async (req, res, next) => {
 const { adm_name, version_Id, count, enable, table_prefix } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = Version.updateOne(
  { _id: new ObjectId(version_Id) },
  {
   $push: {
    ad_master: {
     adm_name,
     count,
     version_Id: new ObjectId(version_Id),
     enable,
     ad_chield: [
      { ad_token: "CUSTOM", ad_keyword: "CUSTOM", version_Id: new ObjectId(version_Id) },
      { ad_token: "ALTERNATIVE", ad_keyword: "ALTERNATIVE", version_Id: new ObjectId(version_Id) },
     ],
    },
   },
  },
  { upsert: true },
  function (err, doc) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
 return give_response(res, 200, true, "Ad Title added!");
});

exports.getAllAdTitle = asyncHandler(async (req, res, next) => {
 const { table_prefix, version_Id, filter, sort, order } = req.body;

 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find({ "ad_master.$.version_Id": new ObjectId(version_Id) })
  .select("adm_name")
  .toArray((err, docs) => {
   if (err) return give_response(res, 400, false, err.message);
  });
 return give_response(res, 200, true, "all version get successfull!", version);
});

exports.addMode = asyncHandler(async (req, res, next) => {
 const { ad_token, ad_keyword, version_Id, enable, table_prefix } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.updateOne(
  { _id: new ObjectId(version_Id) },
  { $push: { "ad_master.$[item].ad_chield": { ad_token, ad_keyword, version_Id: new ObjectId(version_Id), enable } } },
  {
   arrayFilters: [
    {
     "item.version_Id": { $eq: new ObjectId(version_Id) },
    },
   ],
  },
  function (err, result) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
 return give_response(res, 200, true, "Ad mode added!");
});
