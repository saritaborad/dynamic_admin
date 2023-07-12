const moment = require("moment");
const { getCollection } = require("../db/db");

const getCollectionDb = (name) => {
 return getCollection(name);
};

// video call app dynamic api
const getVersionData = async (code) => {
 // const Version = getCollection(`video_call_version_table`);
 return await getCollectionDb(`video_call_version_table`).findOne({ code: code });
};

const getPrivacyData = async () => {
 // const Priavcy = getCollection("video_call_privacypolicy");
 return await getCollectionDb("video_call_privacypolicy").findOne({});
};

const getInstallTrack = async (app_version) => {
 // const Install = getCollection("installtrack_counts");
 return await getCollectionDb("installtrack_counts").findOne({ app_version: app_version });
};

const getAllCustomAd = async () => {
 // const CustomAd = getCollection("advertisement_custom");
 return await getAllCustomAd("advertisement_custom").find({}).toArray();
};

const getAdtaglist = async () => {
 // const Taglist = getCollection("advertisement_custom_taglist");
 return await getCollectionDb("advertisement_custom_taglist").find({}).toArray();
};

const getAppMaster = async (id, enable) => {
 // const AppMaster = getCollection("app_master");
 return await getCollectionDb("app_master").find({ package_name: id, enable: enable.toString() }).toArray();
};

const getSku = async () => {
 // const Sku = getCollection("video_call_sku");
 return await getCollectionDb("video_call_sku").find({}).toArray();
};

const addClickCount = async (id, clickId) => {
 // const ClickCount = getCollection("ads_click_reports");
 return await getCollectionDb("ads_click_reports").updateOne({ _id: id, cad_id: clickId }, { $inc: { count: 1 } }, { $set: { cad_id: clickId, count: "1", date: moment(Date.now()).format("YYYY-MM-DD HH:mm") } }, { upsert: true });
};

module.exports = { addClickCount, getSku, getAppMaster, getAdtaglist, getAllCustomAd, getVersionData, getPrivacyData, getInstallTrack };
