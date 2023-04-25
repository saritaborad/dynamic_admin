const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
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
 const { _id } = req.body;
 await CustomAd.findOneAndDelete({ _id });
 return give_response(res, 200, true, "CustomAd deleted!");
});

exports.getAllCustomAd = asyncHandler(async (req, res, next) => {
 const { sort, order } = req.body;

 let find = {};
 var sortObject = {};
 var stype = sort ? sort : "createdAt";
 var sdir = order?.toLowerCase() === "asc" ? 1 : -1;
 sortObject[stype] = sdir;

 const page = req.body.page && req.body.page != 0 ? req.body.page : 1;
 const limit = req.body.sizePerPage && req.body.sizePerPage != 0 ? req.body.sizePerPage : 10;
 const startIndex = (page - 1) * limit;

 const allAd = await CustomAd.find().skip(startIndex).limit(limit).sort(sortObject);

 const totalRecord = await CustomAd.find().countDocuments();
 const tpage = totalRecord / limit;
 const totalPage = Math.ceil(tpage);

 return give_response(res, 200, true, "get all customAd", { allAd, totalPage, page, totalRecord });
});
