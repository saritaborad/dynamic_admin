const express = require("express");
const asyncHandler = require("../middleware/async");
const give_response = require("../middleware/help");
const { getVersionData, getPrivacyData, getInstallTrack, getAllCustomAd, getAdtaglist, getAppMaster, getSku, addClickCount } = require("../commonFun/videocall");
const router = express.Router();

router.post(
 "/",
 asyncHandler(async (req, res, next) => {
  const { event_name, code, app_old_version, app_version, id, enable, clickId, date } = req.body;
  switch (event_name) {
   case "version":
    const version = await getVersionData(code);
    version ? give_response(res, 200, true, "success", version) : give_response(res, 400, false, "failed");
    break;
   case "privacypolicy":
    const policy = await getPrivacyData(code);
    policy ? give_response(res, 200, true, "success", policy) : give_response(res, 400, false, "failed");
    break;
   case "installtrack":
    const install = await getInstallTrack(app_version);
    install ? give_response(res, 200, true, "success", install) : give_response(res, 400, false, "faild");
    break;
   case "CustomInApp":
    const CustomAd = await getAllCustomAd();
    CustomAd ? give_response(res, 200, true, "success", CustomAd) : give_response(res, 400, false, "failed");
    break;
   case "HtmlTaglist":
    const taglist = await getAdtaglist();
    taglist ? give_response(res, 200, true, "success", taglist) : give_response(res, 400, false, "failed");
    break;
   case "appMaster":
    const appMaster = await getAppMaster(id, enable);
    appMaster ? give_response(res, 200, true, "success", appMaster) : give_response(res, 400, false, "failed");
    break;
   case "sku":
    const sku = await getSku();
    sku ? give_response(res, 200, true, "success", sku) : give_response(res, 400, false, "failed");
    break;
   case "customAdsClick":
    const adsClick = await addClickCount(id, clickId);
    adsClick ? give_response(res, 200, true, "success", "inserted") : give_response(res, 400, false, "failed");
    break;
   default:
    return give_response(res, 200, false, "failed", (data = "null"));
  }
 })
);

module.exports = router;
