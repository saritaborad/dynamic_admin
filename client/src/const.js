const ApiBaseUrl = process.env.REACT_APP_LOCAL_URL;

export const API_PATH = {
 addApp: ApiBaseUrl + "/app/addApp",
 getAllApp: ApiBaseUrl + "/app/getAllApp",
 deleteApp: ApiBaseUrl + "/app/deleteApp",
 updateApp: ApiBaseUrl + "/app/updateApp",
 updatePosition: ApiBaseUrl + "/app/updatePosition",
};
