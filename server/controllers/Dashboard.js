const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
const InstallTrack = require("../models/InstallTrack");
const moment = require("moment");

exports.getDashboard = asyncHandler(async (req, res, next) => {
 const { startDate, endDate, app_version } = req.body;

 const today = new Date();
 const lastThirty = new Date();
 const yesterday = new Date();
 const lastSevenday = new Date();
 yesterday.setDate(yesterday.getDate() - 1);
 lastSevenday.setDate(lastSevenday.getDate() - 7);
 lastThirty.setDate(lastThirty.getDate() - 30);

 const query = { $and: [{ date: { $gte: new Date(startDate) } }, { date: { $lte: new Date(endDate) } }] };
 if (app_version) query.$and.push({ app_version });

 const dashboardData = await InstallTrack.aggregate([
  {
   $facet: {
    todayData: [{ $match: { date: { $eq: today } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }],
    yesterdayData: [{ $match: { date: { $eq: yesterday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }],
    lastSevenData: [{ $match: { date: { $gte: lastSevenday } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }],
    monthlyData: [{ $match: { date: { $gte: lastThirty } } }, { $group: { _id: null, totalCount: { $sum: "$count" } } }],
    allVersion: [{ $group: { _id: "$app_version" } }, { $sort: { _id: -1 } }, { $group: { _id: null, versions: { $push: "$_id" } } }, { $project: { _id: 0, versions: 1 } }],
    x: [{ $match: query }, { $group: { _id: { date: "$date" }, count: { $sum: "$count" } } }, { $project: { _id: 0, date: "$_id.date", count: "$count" } }, { $sort: { date: 1 } }],
    totalDownload: [{ $match: query }, { $group: { _id: null, total: { $sum: "$count" } } }],
   },
  },
 ]);

 const { totalDownload, monthlyData, todayData, yesterdayData, lastSevenData, allVersion, x } = dashboardData[0];
 const sorted = allVersion[0]?.versions?.sort((a, b) => b - a) || [];
 const formattedX = x?.length > 0 ? x?.map(({ date }) => moment(date)?.format("YYYY-MM-DD")) : [];
 const y = x?.length > 0 ? x?.map(({ count }) => count) : [];

 return give_response(res, 200, true, "dashboard data get", { x: formattedX, y, totalDownload: totalDownload[0]?.total, monthlyData: monthlyData[0]?.totalCount, todayData: todayData[0]?.totalCount, yesterdayData: yesterdayData[0]?.totalCount, lastSevenData: lastSevenData[0]?.totalCount, allVersion: sorted });
});
