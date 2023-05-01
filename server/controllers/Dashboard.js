const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
const InstallTrack = require("../models/InstallTrack");
const moment = require("moment");

exports.getDashboard = asyncHandler(async (req, res, next) => {
 const { startDate, endDate, app_version } = req.body;

 let x = [];
 let y = [];
 let dashDate = [];
 const today = new Date();
 const lastThirty = new Date();
 const yesterday = new Date();
 const lastSevenday = new Date();

 const query = { $and: [{ date: { $gte: new Date(startDate) } }, { date: { $lte: new Date(endDate) } }] };
 if (app_version) query.$and.push({ app_version });

 yesterday.setDate(yesterday.getDate() - 1);
 lastSevenday.setDate(lastSevenday.getDate() - 7);
 lastThirty.setDate(lastThirty.getDate() - 30);

 const allInstall = await InstallTrack.find().select("app_version");
 const uniqueVersion = [...new Set(allInstall?.map((item) => item.app_version))]?.sort((a, b) => b - a);

 const dashData = await InstallTrack.find(query);

 const todayData = await InstallTrack.aggregate([{ $match: { date: { $eq: today } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);

 const monthlyData = await InstallTrack.aggregate([{ $match: { date: { $gte: lastThirty } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);

 const yesterdayData = await InstallTrack.aggregate([{ $match: { date: { $eq: yesterday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);

 const lastSevenData = await InstallTrack.aggregate([{ $match: { date: { $gte: lastSevenday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }]);

 const totalDownload = await InstallTrack.aggregate([{ $group: { _id: null, total: { $sum: "$count" } } }]);

 dashData?.length > 0 && dashData.forEach((item) => dashDate.push(moment(item.date).format("DD-MM-YYYY")));

 for (var i = 0; i < dashDate?.length; i = i + count1) {
  count1 = 1;
  for (var j = i + 1; j < dashDate?.length; j++) if (dashDate[i] === dashDate[j]) count1++;
  x.push(dashDate[i]);
  y.push(count1);
 }

 return give_response(res, 200, true, "dashboard data get", { x, y, totalDownload: totalDownload[0]?.total, monthlyData: monthlyData[0]?.totalCount, todayData: todayData[0]?.totalCount, yesterdayData: yesterdayData[0]?.totalCount, lastSevenData: lastSevenData[0]?.totalCount, allVersion: uniqueVersion });
});
