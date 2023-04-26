const ApiBaseUrl = process.env.REACT_APP_LOCAL_URL;

export const API_PATH = {
 imgUpload: ApiBaseUrl + "/img/upload",

 addApp: ApiBaseUrl + "/app/addApp",
 getAllApp: ApiBaseUrl + "/app/getAllApp",
 updateApp: ApiBaseUrl + "/app/updateApp",
 updatePosition: ApiBaseUrl + "/app/updatePosition",
 deleteApp: ApiBaseUrl + "/app/deleteApp",

 getPolicy: ApiBaseUrl + "/app/getPolicy",
 changePolicy: ApiBaseUrl + "/app/changePolicy",

 addVersion: ApiBaseUrl + "/app/addVersion",
 getAllVersion: ApiBaseUrl + "/app/getAllVersion",
 editVersion: ApiBaseUrl + "/app/editVersion",
 delVersion: ApiBaseUrl + "/app/delVersion",

 addTitle: ApiBaseUrl + "/app/addTitle",
 getAllAdTitle: ApiBaseUrl + "/app/getAllAdTitle",
 editTitle: ApiBaseUrl + "/app/editTitle",
 delTitle: ApiBaseUrl + "/app/delTitle",

 addMode: ApiBaseUrl + "/app/addMode",
 getAllAdMode: ApiBaseUrl + "/app/getAllAdMode",
 editMode: ApiBaseUrl + "/app/editMode",
 delMode: ApiBaseUrl + "/app/delMode",
 modePosition: ApiBaseUrl + "/app/modePosition",

 addFilter: ApiBaseUrl + "/app/addFilter",
 getAllFilter: ApiBaseUrl + "/app/getAllFilter",

 getAllCustomAd: ApiBaseUrl + "/app/getAllCustomAd",
 addCustomAd: ApiBaseUrl + "/app/addCustomAd",
 editCustomAd: ApiBaseUrl + "/app/editCustomAd",
 delCustomAd: ApiBaseUrl + "/app/delCustomAd",

 getAllBanner: ApiBaseUrl + "/app/getAllBanner",
 addBanner: ApiBaseUrl + "/app/addBanner",
 updateBanner: ApiBaseUrl + "/app/updateBanner",
};
