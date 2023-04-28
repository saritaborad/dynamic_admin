const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
const InstallTrack = require("../models/InstallTrack");
const moment = require("moment");

exports.getDashboard = asyncHandler(async (req, res, next) => {
 const { startDate, endDate, app_version } = req.body;
 let dashDate = [];
 let y = [];
 let x = [];
 const today = new Date(startDate);
 const lastThirty = new Date(startDate);
 const yesterday = new Date(startDate);
 const lastSevenday = new Date(startDate);

 yesterday.setDate(yesterday.getDate() - 1);
 lastSevenday.setDate(lastSevenday.getDate() - 7);
 lastThirty.setDate(lastThirty.getDate() - 30);

 const dashData = await InstallTrack.find({ $and: [{ date: { $gte: new Date(startDate) } }, { date: { $lte: new Date(endDate) } }, { app_version }] });

 const todayData = await InstallTrack.aggregate([{ $match: { date: { $eq: today } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);
 const monthlyData = await InstallTrack.aggregate([{ $match: { date: { $gte: lastThirty } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);
 const yesterdayData = await InstallTrack.aggregate([{ $match: { date: { $eq: yesterday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);
 const lastSevenData = await InstallTrack.aggregate([{ $match: { date: { $gte: lastSevenday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);

 dashData?.length > 0 && dashData.forEach((item) => dashDate.push(moment(item.date).format("DD-MM-YYYY")));

 for (var i = 0; i < dashDate?.length; i = i + count1) {
  count1 = 1;
  for (var j = i + 1; j < dashDate?.length; j++) {
   if (dashDate[i] === dashDate[j]) count1++;
  }
  x.push(dashDate[i]);
  y.push(count1);
 }

 return give_response(res, 200, true, "dashboard data get", { x, y, monthlyData: monthlyData[0]?.totalCount, todayData: todayData[0]?.totalCount, yesterdayData: yesterdayData[0]?.totalCount, lastSevenData: lastSevenData[0]?.totalCount });
});

exports.getInstallTrack = asyncHandler(async (req, res, next) => {
 const installTrack = await InstallTrack.find().select("app_version");
 return give_response(res, 200, true, "install track get", installTrack);
});
