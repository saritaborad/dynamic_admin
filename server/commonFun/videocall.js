const moment = require("moment");
const { getCollection } = require("../db/db");

const getCollectionDb = (name) => {
 return getCollection(name);
};

// video call app dynamic api
const getVersionData = async (code) => {
 return await getCollectionDb(`video_call_version_table`).findOne({ code });
};

const getPrivacyData = async () => {
 return await getCollectionDb("video_call_privacypolicy").findOne({});
};

const getInstallTrack = async (app_version) => {
 return await getCollectionDb("installtrack_counts").findOne({ app_version });
};

const getAllCustomAd = async () => {
 return await getCollectionDb("advertisement_custom").find({}).toArray();
};

const getAdtaglist = async () => {
 return await getCollectionDb("advertisement_custom_taglist").find({}).toArray();
};

const getAppMaster = async (id, enable) => {
 return await getCollectionDb("app_master").find({ package_name: id, enable: enable.toString() }).toArray();
};

const getSku = async () => {
 return await getCollectionDb("video_call_sku").find({}).toArray();
};

const addClickCount = async (id, clickId) => {
 return await getCollectionDb("ads_click_reports").updateOne({ _id: id, cad_id: clickId }, { $inc: { count: 1 } }, { $set: { cad_id: clickId, count: "1", date: moment(Date.now()).format("YYYY-MM-DD HH:mm") } }, { upsert: true });
};

module.exports = { addClickCount, getSku, getAppMaster, getAdtaglist, getAllCustomAd, getVersionData, getPrivacyData, getInstallTrack };
