import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";

export const getAllApp = (setActiveApp) => {
 new Promise((resolve) => resolve(PostApi(API_PATH.getAllApp))).then((res) => {
  if (res.status === 200)
   setActiveApp(
    res.data.data.activeApp?.sort((a, b) => a.position - b.position)
   );
 });
};
