import { createContext, useEffect, useState } from "react";
import { PostApi } from "../Api/apiServices";
import { API_PATH } from "../const";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
 const [activeApp, setActiveApp] = useState("");

 useEffect(() => {
  if (activeApp === "") getAllApp();
 }, [activeApp]);

 const getAllApp = () => {
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllApp))).then((res) => {
   if (res.status === 200) {
    setActiveApp(res.data.data?.activeApp?.sort((a, b) => a?.position - b?.position));
   }
  });
 };

 return <AppContext.Provider value={{ activeApp, setActiveApp }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
