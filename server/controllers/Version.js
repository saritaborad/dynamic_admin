const asyncHandler = require("../middleware/async");
const { getCollection } = require("../db/db");
const give_response = require("../middleware/help");
const { ObjectId } = require("mongodb");
const isEmptyObj = require("../utils");
const { addTitleFun, addModeFun, editModeFun, editTitleFun, updateTitleAndMode } = require("../commonFun/commonFun");

exports.getAllVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, filter, sort, order } = req.body;

 let find = {};
 var sortObject = {};
 var stype = sort ? sort : "code";
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
 const options = { skip: startIndex, limit: limit, sort: { date: -1 } };

 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find(find, options).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 return give_response(res, 200, true, "all version get successfull!", version);
});

exports.addVersion = asyncHandler(async (req, res, next) => {
 const { is_force, enabled, features, code, title, table_prefix, adMode, adTitle } = req.body;

 const Version = getCollection(`${table_prefix}_version_tables`);
 const version = await Version.insertOne({ title, is_force, enabled, features, code, date: Date.now() }, function (err, res) {
  return give_response(res, 400, false, err.message);
 });

 if (adTitle?.length > 0) {
  adTitle?.map(async (item, i) => {
   await addTitleFun(res, item?.adm_name, item?.version_Id, item?.count, item?.enable, table_prefix, title, res);
  });
 }

 if (adMode?.length > 0 && adMode?.some((item) => item?.ad_keyword !== "CUSTOM" && item?.ad_keyword !== "ALTERNATIVE")) {
  const filterAdMode = adMode?.filter((item) => item?.ad_keyword !== "CUSTOM" && item?.ad_keyword !== "ALTERNATIVE");
  filterAdMode?.map(async (item, i) => {
   await addModeFun(res, ad_token, ad_keyword, item?.version_Id, item?.enable, table_prefix, title);
  });
 }
 return give_response(res, 200, true, "Version added!");
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

 updateTitleAndMode(table_prefix, _id, title);
 return give_response(res, 200, true, "Version updated!");
});

exports.getAllAdTitle = asyncHandler(async (req, res, next) => {
 const { table_prefix, version_Id, filter, sort, order } = req.body;
 let adTitle = [];
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find({}, { projection: { ad_master: 1, _id: 0, version: 1 }, sort: { "ad_master.adm_date": 1 } }).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 if (version?.length > 0) {
  version?.map((item, i) => {
   item?.ad_master?.length > 0 &&
    item?.ad_master?.map((item) => {
     if (!isEmptyObj(item)) {
      adTitle.push({ count: item?.count, adm_name: item?.adm_name, version_Id: item?.version_Id, enable: item?.enable, version: item?.version, _id: item?._id, adm_date: item?.adm_date });
     }
    });
  });
 }
 adTitle?.length > 0 && adTitle?.sort((a, b) => b?.adm_date - a?.adm_date);
 return give_response(res, 200, true, "all version get successfull!", adTitle);
});

exports.addTitle = asyncHandler(async (req, res, next) => {
 const { adm_name, version_Id, count, enable, table_prefix, version } = req.body;
 await addTitleFun(res, adm_name, version_Id, count, enable, table_prefix, version);
 return give_response(res, 200, true, "Ad Title added!");
});

exports.editTitle = asyncHandler(async (req, res, next) => {
 const { adm_name, version_Id, count, enable, table_prefix, _id } = req.body;
 await editTitleFun(res, adm_name, version_Id, count, enable, table_prefix, _id);
 return give_response(res, 200, true, "AdTitle update!");
});

exports.delTitle = asyncHandler(async (req, res, next) => {
 const { _id, version_Id, table_prefix } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version1 = Version.updateOne(
  { _id: new ObjectId(version_Id) },
  {
   $pull: { ad_master: { _id: new ObjectId(_id) } },
  },
  function (err, doc) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
 return give_response(res, 200, true, "adtitle deleted!");
});

exports.getAllAdMode = asyncHandler(async (req, res, next) => {
 let adMode = [];
 const { table_prefix, version_Id, filter, sort, order } = req.body;

 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find({}, { projection: { "ad_master.ad_chield": 1, _id: 0, "ad_master.adm_name": 1 } }).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 if (version?.length > 0) {
  version?.map((item, i) => {
   if (!isEmptyObj(item)) {
    item?.ad_master?.length > 0 &&
     item?.ad_master?.map((aditem) => {
      if (!isEmptyObj(aditem)) {
       aditem?.ad_chield?.length > 0 &&
        aditem?.ad_chield?.map((child, i) => {
         adMode.push({ ...child, adm_name: aditem.adm_name });
         adMode?.length > 0 && adMode.sort((a, b) => b?.adc_date - a?.adc_date);
        });
      }
     });
   }
  });
 }

 return give_response(res, 200, true, "all adMode get successfull!", adMode);
});

exports.addMode = asyncHandler(async (req, res, next) => {
 const { ad_token, ad_keyword, version_Id, enable, table_prefix, version } = req.body;
 await addModeFun(res, ad_token, ad_keyword, version_Id, enable, table_prefix, version);
 return give_response(res, 200, true, "Ad mode added!");
});

exports.editMode = asyncHandler(async (req, res, next) => {
 const { table_prefix, version_Id, ad_token, enable, _id, version } = req.body;
 await editModeFun(res, table_prefix, version_Id, ad_token, enable, _id, version);
 return give_response(res, 200, true, "Ad title updated!");
});

exports.delMode = asyncHandler(async (req, res, next) => {
 const { version_Id, table_prefix, _id } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.updateOne(
  { _id: new ObjectId(version_Id) },
  { $pull: { "ad_master.$[item].ad_chield": { _id: new ObjectId(_id) } } },
  {
   arrayFilters: [
    {
     "item.ad_chield._id": { $eq: new ObjectId(_id) },
    },
   ],
  },
  function (err, result) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
 return give_response(res, 200, true, "Ad mode deleted!");
});

exports.getAllFilter = asyncHandler(async (req, res, next) => {
 const verFilter = req.session.verFilter;
 const titleFilter = req.session.titleFilter;
 const modeFilter = req.session.modeFilter;
 console.log(req.session);
});

exports.addFilter = asyncHandler(async (req, res, next) => {
 const { verFilter, titleFilter, modeFilter } = req.body;

 if (verFilter) req.session.verFilter = verFilter;
 if (titleFilter) req.session.titleFilter = titleFilter;
 if (modeFilter) req.session.modeFilter = modeFilter;
 return give_response(res, 200, true);
});
