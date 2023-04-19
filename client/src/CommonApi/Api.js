import { toast } from "react-toastify";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";

export const getAllApp = (setActiveApp) => {
 new Promise((resolve) => resolve(PostApi(API_PATH.getAllApp))).then((res) => {
  if (res.status === 200) setActiveApp(res.data.data.activeApp?.sort((a, b) => a.position - b.position));
 });
};

export const updatePosition = (newItems, path, getAPI, table_prefix) => {
 new Promise((resolve) => resolve(PostApi(path, { newItems, table_prefix }))).then((res) => {
  if (res.status === 200) {
   toast.success(res.data.message);
   getAPI();
  }
 });
};
