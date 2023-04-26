const asyncHandler = require("../middleware/async");
const { getCollection } = require("../db/db");
const give_response = require("../middleware/help");
const { ObjectId } = require("mongodb");
const { isEmptyObj } = require("../utils");
const { addTitleFun, addModeFun, editModeFun, editTitleFun, updateTitleAndMode, changeModePosition } = require("../commonFun/commonFun");

exports.getAllVersion = asyncHandler(async (req, res, next) => {
 const { table_prefix, filter, sort, order, titleFilter, modeFilter } = req.body;
 const { verFilter } = req.session;

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

 const versionIds = verFilter?.length > 0 && verFilter?.map((id) => new ObjectId(id));

 let obj = verFilter?.length > 0 ? { _id: { $in: versionIds } } : {};

 const version = await Version.find(obj).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 const versionList = await Version.find({}, options).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 return give_response(res, 200, true, "all version get successfull!", { version: version, allVersion: versionList, verFilter: verFilter });
});

exports.addVersion = asyncHandler(async (req, res, next) => {
 const { is_force, enabled, features, code, title, table_prefix, adMode, adTitle } = req.body;
 let version_Id;

 const Version = getCollection(`${table_prefix}_version_tables`);
 const version = await Version.insertOne({ title, is_force, enabled, features, code, date: Date.now() })
  .then((result) => (version_Id = result.insertedId?.toString()))
  .catch((err) => {
   return give_response(res, 400, false, err.message);
  });

 if (adTitle?.length > 0) {
  adTitle?.map(async (item, i) => await addTitleFun(res, item?.adm_name, version_Id, item?.count, item?.enable, table_prefix, title));
 }

 if (adMode?.length > 0 && adMode?.some((item) => item?.ad_keyword !== "CUSTOM" && item?.ad_keyword !== "ALTERNATIVE")) {
  const filterAdMode = adMode?.filter((item) => item?.ad_keyword !== "CUSTOM" && item?.ad_keyword !== "ALTERNATIVE");
  for (item of filterAdMode) {
   await addModeFun(res, item?.ad_token, item?.ad_keyword, version_Id, 0, table_prefix, title, item?.adm_name);
  }
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
 const { table_prefix } = req.body;
 const { titleFilter, verFilter } = req.session;

 let adTitle = [];
 let adTitleList = [];
 let verFilData = [];

 const Version = getCollection(`${table_prefix}_version_tables`);

 const version = await Version.find({}, { projection: { ad_master: 1, _id: 0, version: 1 }, sort: { "ad_master.adm_date": 1 } }).toArray((err, docs) => {
  if (err) return give_response(res, 400, false, err.message);
 });

 if (version?.length > 0) {
  version?.map((item, i) => {
   item?.ad_master?.length > 0 &&
    item?.ad_master?.map((item) => {
     if (!isEmptyObj(item)) {
      adTitle.push({ count: item?.count, adm_name: item?.adm_name, version_Id: item?.version_Id, enable: item?.enable, version: item?.version, _id: item?._id, adm_date: item?.adm_date, visibility: item?.visibility });
     }
    });
  });
 }

 if (adTitle?.length > 0) {
  verFilData = verFilter?.length > 0 ? adTitle?.filter((item) => verFilter?.includes(item?.version_Id?.toString())) || [] : adTitle;
  adTitleList = (verFilData?.length > 0 && verFilData?.filter((item) => titleFilter?.includes(item?.adm_name))) || [];
 }

 let adTitleData = titleFilter?.length > 0 ? adTitleList : verFilter?.length > 0 ? verFilData : adTitle;
 let uniqueList = (adTitle?.length > 0 && adTitle?.filter((obj, index, self) => index === self?.findIndex((t) => t?.adm_name === obj?.adm_name))) || [];
 adTitle?.length > 0 && adTitle?.sort((a, b) => b?.adm_date - a?.adm_date);
 return give_response(res, 200, true, "all ad title get successfull!", { adTitle: adTitleData, adTitleList: uniqueList, titleFilter: titleFilter });
});

exports.addTitle = asyncHandler(async (req, res, next) => {
 const { adm_name, version_Id, count, enable, table_prefix, version } = req.body;
 await addTitleFun(res, adm_name, version_Id, count, enable, table_prefix, version);
 return give_response(res, 200, true, "Ad Title added!");
});

exports.editTitle = asyncHandler(async (req, res, next) => {
 const { adm_name, version_Id, count, enable, table_prefix, _id, status } = req.body;
 await editTitleFun(res, adm_name, version_Id, count, enable, table_prefix, _id, status);
 return give_response(res, 200, true, "AdTitle update!");
});

exports.delTitle = asyncHandler(async (req, res, next) => {
 const { _id, version_Id, table_prefix, adm_name, isFilter } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);
 if (!isFilter) req.session.titleFilter = req.session.titleFilter?.filter((item) => item !== adm_name);

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
 const { table_prefix, version_Id, filter, sort, order } = req.body;
 const { modeFilter, verFilter, titleFilter } = req.session;
 let adMode = [];
 let adModeList = [];
 let verFilData = [];
 let titleFilData = [];

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
        });
      }
     });
   }
  });
 }

 if (adMode?.length > 0) {
  verFilData = verFilter?.length > 0 ? adMode?.filter((item) => verFilter?.includes(item?.version_Id?.toString())) || [] : adMode;
  titleFilData = verFilData?.length > 0 ? verFilData?.filter((item) => titleFilter?.includes(item?.adm_name)) || [] : adMode;
  adModeList = titleFilData?.length > 0 ? titleFilData?.filter((item) => modeFilter?.includes(item?.ad_keyword)) || [] : adMode?.filter((item) => modeFilter?.includes(item?.ad_keyword)) || [];
 }

 //  adMode = adMode?.length > 0 && adMode.sort((a, b) => b?.adc_date - a?.adc_date);
 let adModeData = modeFilter?.length > 0 ? adModeList : titleFilter?.length > 0 ? titleFilData : verFilter?.length > 0 ? verFilData : adMode;
 let uniqueAdList = (adMode?.length > 0 && adMode?.filter((obj, index, self) => index === self?.findIndex((t) => t?.ad_keyword === obj?.ad_keyword))) || [];

 return give_response(res, 200, true, "all adMode get successfull!", { adMode: adModeData, adModeList: uniqueAdList, modeFilter: modeFilter });
});

exports.addMode = asyncHandler(async (req, res, next) => {
 const { ad_token, ad_keyword, version_Id, enable, table_prefix, version } = req.body;
 const { titleFilter } = req.session;
 if (titleFilter?.length > 0) {
  titleFilter?.forEach(async (adm_name) => {
   await addModeFun(res, ad_token, ad_keyword, version_Id, enable, table_prefix, version, adm_name);
  });
 }
 return give_response(res, 200, true, "Ad mode added!");
});

exports.editMode = asyncHandler(async (req, res, next) => {
 const { table_prefix, version_Id, ad_token, enable, _id, version, status, newItems, visibility, positionChange } = req.body;
 await editModeFun(res, _id, status, table_prefix, version_Id, ad_token, enable, version, newItems, visibility, positionChange);
 return give_response(res, 200, true, "Ad mode updated!");
});

exports.delMode = asyncHandler(async (req, res, next) => {
 const { version_Id, table_prefix, _id, ad_keyword, isModeFilter } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);
 if (!isModeFilter) req.session.modeFilter = req.session.modeFilter?.filter((item) => item !== ad_keyword);
 console.log(isModeFilter, req.session.modeFilter);
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

exports.addFilter = asyncHandler(async (req, res, next) => {
 const { verFilter, titleFilter, modeFilter, action, filType } = req.body;

 if (verFilter?.length > 0) req.session.verFilter = verFilter;
 if (titleFilter?.length > 0) req.session.titleFilter = titleFilter;
 if (modeFilter?.length > 0) req.session.modeFilter = modeFilter;
 if (action === 2 && filType === 1) req.session.verFilter = [];
 if (action === 2 && filType === 2) req.session.titleFilter = [];
 if (action === 2 && filType === 3) req.session.modeFilter = [];

 return give_response(res, 200, true, "session added");
});

exports.modePosition = asyncHandler(async (req, res, next) => {
 const { newItems, table_prefix } = req.body;
 await changeModePosition(newItems, table_prefix);
 return give_response(res, 200, true, "Details updated");
});

exports.increaseUser = asyncHandler(async (req, res, next) => {
 const { _id, table_prefix } = req.body;
 const Version = getCollection(`${table_prefix}_version_tables`);
 const user = await Version.updateOne({ _id: new ObjectId(_id) }, { $inc: { users: 1 } });
 return give_response(res, 200, true, "user updated!");
});
