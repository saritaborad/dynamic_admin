const mongoose = require("mongoose");
const Application = require("../models/Application");
const give_response = require("../middleware/help");
const asyncHandler = require("../middleware/async");
const {
 DB,
 createCollection,
 deleteCollection,
 renameCollection,
} = require("../db/db");
const { versionSchema } = require("../models/Version");
const { privacySchema } = require("../models/PrivacyPolicy");

exports.addApp = asyncHandler(async (req, res, next) => {
 const { title } = req.body;

 let table_prefix;
 table_prefix = title?.toLowerCase();
 table_prefix = title?.replaceAll(" ", "_");

 const addApp = Application({ title, table_prefix: table_prefix });
 addApp.save();
 mongoose.model(`${addApp.table_prefix}_privacypolicy`, privacySchema);
 mongoose.model(`${addApp.table_prefix}_version_table`, versionSchema);
 //  createCollection(res, DB, `${addApp.table_prefix}_privacypolicy`);
 //  createCollection(res, DB, `${addApp.table_prefix}_version_table`);

 return give_response(res, 200, true, "Application added!");
});

exports.updateApp = asyncHandler(async (req, res, next) => {
 const { title, _id, enable } = req.body;
 let table_prefix;
 table_prefix = title?.toLowerCase();
 table_prefix = title?.replaceAll(" ", "_");
 let obj =
  enable || enable === 0 ? { enable, _id } : { title, _id, table_prefix };
 const old = await Application.findById({ _id: _id });
 const newApp = await Application.findByIdAndUpdate(
  { _id: _id },
  { $set: { ...obj } },
  { new: true }
 );
 renameCollection(
  res,
  DB,
  `${old.table_prefix}_privacypolicy`,
  `${newApp.table_prefix}_privacypolicy`
 );
 renameCollection(
  res,
  DB,
  `${old.table_prefix}_version_table`,
  `${newApp.table_prefix}_version_table`
 );
 give_response(res, 200, true, "Details updated", newApp);
});

exports.updatePosition = asyncHandler(async (req, res, next) => {
 const { newItems } = req.body;
 for (let item of newItems) {
  await Application.updateMany(
   { _id: item._id },
   { $set: { position: item.position } }
  );
 }
 give_response(res, 200, true, "Details updated");
});

exports.deleteApp = asyncHandler(async (req, res, next) => {
 const { _id } = req.body;
 const app = await Application.findByIdAndDelete({ _id });
 deleteCollection(res, DB, `${app?.table_prefix}_version_table`);
 deleteCollection(res, DB, `${app?.table_prefix}_version_table`);
 return give_response(res, 200, true, "Application deleted");
});

exports.getAllApp = asyncHandler(async (req, res, next) => {
 const { enable, sort, order } = req.body;
 let status = enable || enable === 0 ? enable : { $in: [0, 1] };

 let find = {};
 var sortObject = {};
 var stype = sort ? sort : "position";
 var sdir = order?.toLowerCase() === "asc" ? 1 : -1;
 sortObject[stype] = sdir;

 if (req.body.search) {
  find = {
   $or: [
    {
     table_prefix: {
      $regex: `.*${req.body.search?.trim()}.*`,
      $options: "i",
     },
    },
    {
     title: {
      $regex: `.*${req.body.search?.trim()}.*`,
      $options: "i",
     },
    },
   ],
   enable: status,
  };
 } else {
  find = { enable: status };
 }
 const page = req.body.page && req.body.page != 0 ? req.body.page : 1;
 const limit =
  req.body.sizePerPage && req.body.sizePerPage != 0 ? req.body.sizePerPage : 10;
 const startIndex = (page - 1) * limit;

 const allApp = await Application.find(find)
  .skip(startIndex)
  .limit(limit)
  .sort(sortObject);
 const activeApp = await Application.find({ enable: 1 });

 const totalRecord = await Application.find(find).countDocuments();
 const tpage = totalRecord / limit;
 const totalPage = Math.ceil(tpage);

 give_response(res, 200, true, "Application get successfully!", {
  page,
  totalPage,
  totalRecord,
  allApp,
  activeApp,
 });
});
