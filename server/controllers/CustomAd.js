const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
const { ObjectId } = require("mongodb");
const CustomAd = require("../models/CustomAd");

exports.addCustomAd = asyncHandler(async (req, res, next) => {
 const { add_title, add_desc, icon, banner, install, color, rating, download, review, enable } = req.body;
 const customAd = await CustomAd({ add_title, add_desc, icon, banner, install, color, rating, download, review, enable });
 customAd.save();
 return give_response(res, 200, true, "CustomAd added!");
});

exports.editCustomAd = asyncHandler(async (req, res, next) => {
 const { _id, add_title, add_desc, icon, banner, install, color, rating, download, review, enable } = req.body;
 const add = await CustomAd.findOneAndUpdate({ _id: _id }, { $set: { add_title, add_desc, icon, banner, install, color, rating, download, review, enable } }, { new: true });
 return give_response(res, 200, true, "CustomAd updated!");
});

exports.delCustomAd = asyncHandler(async (req, res, next) => {
 const { _id, delArr } = req.body;
 let query = {};
 delArr && delArr?.length > 0 ? (query._id = { $in: delArr }) : (query._id = _id);
 await CustomAd.deleteMany(query);
 return give_response(res, 200, true, "CustomAd deleted!");
});

exports.getAllCustomAd = asyncHandler(async (req, res, next) => {
 const { sort, order, enable } = req.body;
 let status = enable || enable === 0 ? enable : { $in: [0, 1] };

 let find = {};
 var sortObject = {};
 var stype = sort ? sort : "createdAt";
 var sdir = order?.toLowerCase() === "asc" ? 1 : -1;
 sortObject[stype] = sdir;

 if (req.body.search) {
  find = { add_title: { $regex: `.*${req.body.search?.trim()}.*`, $options: "i" }, enable: status };
 } else {
  find = { enable: status };
 }

 const page = req.body.page && req.body.page != 0 ? req.body.page : 1;
 const limit = req.body.sizePerPage && req.body.sizePerPage != 0 ? req.body.sizePerPage : 10;
 const startIndex = (page - 1) * limit;

 const allAd = await CustomAd.find(find).skip(startIndex).limit(limit).sort(sortObject);

 const totalRecord = await CustomAd.find(find).countDocuments();
 const tpage = totalRecord / limit;
 const totalPage = Math.ceil(tpage);

 return give_response(res, 200, true, "get all customAd", { allAd, totalPage, page, totalRecord });
});

exports.getAllBanner = asyncHandler(async (req, res, next) => {
 const { order, cusAdId } = req.body;
 var sdir = order?.toLowerCase() === "asc" ? 1 : -1;

 const page = req.body.page && req.body.page != 0 ? req.body.page : 1;
 const limit = req.body.sizePerPage && req.body.sizePerPage != 0 ? req.body.sizePerPage : 10;
 const startIndex = (page - 1) * limit;

 const data = await CustomAd.findOne({ _id: new ObjectId(cusAdId) }, { advertisement_custom_multi: { $slice: [startIndex, limit] } });

 let bannerAll = sdir === 1 ? data?.advertisement_custom_multi?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [] : data?.advertisement_custom_multi?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

 const totalRecord = bannerAll?.length;
 const tpage = totalRecord / limit;
 const totalPage = Math.ceil(tpage);

 return give_response(res, 200, true, "get all banner", { bannerAll, totalPage, totalRecord, page });
});

exports.addBanner = asyncHandler(async (req, res, next) => {
 const { icon, banner, color, design_page, cusAdId } = req.body;
 const bannerAd = await CustomAd.findOneAndUpdate({ _id: cusAdId }, { $push: { advertisement_custom_multi: { acid: new ObjectId(cusAdId), icon, banner, color, design_page, _id: new ObjectId(), date: Date.now(), enable: 0 } } });
 return give_response(res, 200, true, "banner added");
});

exports.updateBanner = asyncHandler(async (req, res, next) => {
 const { icon, banner, color, design_page, cusAdId, _id, enable } = req.body;
 let obj = {
  "advertisement_custom_multi.$[item].enable": enable,
  "advertisement_custom_multi.$[item].icon": icon,
  "advertisement_custom_multi.$[item].banner": banner,
  "advertisement_custom_multi.$[item].color": color,
  "advertisement_custom_multi.$[item].design_page": design_page,
 };

 const newBanner = await CustomAd.findOneAndUpdate(
  { _id: new ObjectId(cusAdId) },
  { $set: { ...obj } },
  {
   arrayFilters: [
    {
     "item._id": { $eq: new ObjectId(_id) },
    },
   ],
  }
 );

 return give_response(res, 200, true, "banner updated!");
});

exports.delBanner = asyncHandler(async (req, res, next) => {
 const { _id, cusAdId, delArr } = req.body;
 let query = {};
 delArr && delArr?.length > 0 ? (query.$pull = { advertisement_custom_multi: { _id: { $in: delArr.map((id) => new ObjectId(id)) } } }) : (query.$pull = { advertisement_custom_multi: { _id: new ObjectId(_id) } });

 await CustomAd.findOneAndUpdate({ _id: new ObjectId(cusAdId) }, query);
 return give_response(res, 200, true, "Banner deleted!");
});
