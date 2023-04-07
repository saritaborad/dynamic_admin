import { useEffect, useState } from "react";
import { getAllApp } from "../CommonApi/Api";

export const useActiveApp = () => {
 const [active, setActiveApp] = useState();
 useEffect(() => {
  getAllApp(setActiveApp);
 }, []);
 return active;
};
