const { getCollection } = require("../db/db");
const { ObjectId } = require("mongodb");
const give_response = require("../middleware/help");

const addTitleFun = async (res, adm_name, version_Id, count, enable, table_prefix, version) => {
 const Version = getCollection(`${table_prefix}_version_tables`);

 const version1 = await Version.updateOne(
  { _id: new ObjectId(version_Id) },
  {
   $push: {
    ad_master: {
     adm_name,
     count,
     version_Id: new ObjectId(version_Id),
     enable,
     adm_date: Date.now(),
     version,
     _id: new ObjectId(),
     ad_chield: [
      { _id: new ObjectId(), ad_token: "CUSTOM", ad_keyword: "CUSTOM", version_Id: new ObjectId(version_Id), version, adc_date: Date.now() },
      { _id: new ObjectId(), ad_token: "ALTERNATIVE", ad_keyword: "ALTERNATIVE", version_Id: new ObjectId(version_Id), version, adc_date: Date.now() },
     ],
    },
   },
  },
  { upsert: true },
  function (err, doc) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
};

const addModeFun = async (res, ad_token, ad_keyword, version_Id, enable, table_prefix, version) => {
 const Version = getCollection(`${table_prefix}_version_tables`);

 const newVer = await Version.updateOne(
  { _id: new ObjectId(version_Id) },
  { $push: { "ad_master.$[item].ad_chield": { _id: new ObjectId(), ad_token, ad_keyword, version_Id: new ObjectId(version_Id), enable, version, adc_date: Date.now() } } },
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
};

const editModeFun = async (res, table_prefix, version_Id, ad_token, enable, _id, version) => {
 const Version = getCollection(`${table_prefix}_version_tables`);

 let obj = {
  "ad_master.$[item].ad_chield.$[item2].ad_token": ad_token,
  "ad_master.$[item].ad_chield.$[item2].enable": enable,
  "ad_master.$[item].ad_chield.$[item2].version": version,
 };

 const version1 = await Version.updateOne({ _id: new ObjectId(version_Id) }, { $set: { ...obj } }, { arrayFilters: [{ "item.ad_chield._id": { $eq: new ObjectId(_id) } }, { "item2._id": { $eq: new ObjectId(_id) } }] }, function (err) {
  if (err) return give_response(res, 400, false, err.message);
 });
};

const editTitleFun = async (res, adm_name, version_Id, count, enable, table_prefix, _id) => {
 const Version = getCollection(`${table_prefix}_version_tables`);

 let obj = {
  "ad_master.$[item].count": count,
  "ad_master.$[item].enable": enable,
  "ad_master.$[item].adm_name": adm_name,
 };

 const version1 = await Version.updateOne(
  { _id: new ObjectId(version_Id) },
  {
   $set: { ...obj },
  },
  {
   arrayFilters: [
    {
     "item._id": { $eq: new ObjectId(_id) },
    },
   ],
  },
  function (err, doc) {
   if (err) return give_response(res, 400, false, err.message);
  }
 );
};

const updateTitleAndMode = async (table_prefix, _id, title) => {
 const Version = getCollection(`${table_prefix}_version_tables`);
 const adtitle = await Version.find({ _id: new ObjectId(_id), ad_master: { $exists: true } }).toArray();
 const admode = await Version.find({ _id: new ObjectId(_id), "ad_master.ad_chield": { $exists: true } }).toArray();

 if (adtitle?.length > 0) {
  await Version.updateOne({ _id: new ObjectId(_id) }, { $set: { "ad_master.$[elem].version": title } }, { arrayFilters: [{ "elem.version_Id": new ObjectId(_id) }] });
 }

 if (admode?.length > 0) {
  Version.updateOne({ _id: new ObjectId(_id) }, { $set: { "ad_master.$[elem].ad_chield.$[nestedElem].version": title } }, { arrayFilters: [{ "elem.version_Id": new ObjectId(_id) }, { "nestedElem.version_Id": new ObjectId(_id) }] });
 }
};

module.exports = { addTitleFun, addModeFun, editModeFun, editTitleFun, updateTitleAndMode };
