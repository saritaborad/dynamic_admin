import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageAdmin from "./pages/ManageAdmin";
import Version from "./pages/Version";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const RouteMain = () => {
 return (
  <>
   <BrowserRouter>
    <Routes>
     <Route path="/" strict element={<ManageAdmin />} />
     <Route path="/manage-admin" strict element={<ManageAdmin />} />
     <Route path="/version" element={<Version />} />
     <Route path="/pp" element={<PrivacyPolicy />} />
    </Routes>
   </BrowserRouter>
  </>
 );
};

export default RouteMain;
