import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageAdmin from "./pages/ManageAdmin";

const RouteMain = () => {
 return (
  <>
   <BrowserRouter>
    <Routes>
     <Route path="/" strict element={<ManageAdmin />} />
    </Routes>
   </BrowserRouter>
  </>
 );
};

export default RouteMain;
