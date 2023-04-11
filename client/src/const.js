const ApiBaseUrl = process.env.REACT_APP_LOCAL_URL;

export const API_PATH = {
 addApp: ApiBaseUrl + "/app/addApp",
 getAllApp: ApiBaseUrl + "/app/getAllApp",
 deleteApp: ApiBaseUrl + "/app/deleteApp",
 updateApp: ApiBaseUrl + "/app/updateApp",
 updatePosition: ApiBaseUrl + "/app/updatePosition",

 changePolicy: ApiBaseUrl + "/app/changePolicy",
 getPolicy: ApiBaseUrl + "/app/getPolicy",

 addVersion: ApiBaseUrl + "/app/addVersion",
 getAllVersion: ApiBaseUrl + "/app/getAllVersion",
 delVersion: ApiBaseUrl + "/app/delVersion",
 editVersion: ApiBaseUrl + "/app/editVersion",

 addMode: ApiBaseUrl + "/app/addMode",
 addTitle: ApiBaseUrl + "/app/addTitle",
};
