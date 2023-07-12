import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageAdmin from "./pages/ManageAdmin";
import Version from "./pages/Version";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CustomAd from "./pages/CustomAd";
import Banner from "./pages/Banner";
import Dashboard from "./pages/Dashboard";

const RouteMain = () => {
 return (
  <>
   <BrowserRouter basename="/admin_panel">
    <Routes>
     <Route path="/" strict element={<Dashboard />} />
     <Route path="/dashboard" strict element={<Dashboard />} />
     <Route path="/manage-admin" strict element={<ManageAdmin />} />
     <Route path="/version" element={<Version />} />
     <Route path="/pp" element={<PrivacyPolicy />} />
     <Route path="/custom-ad" element={<CustomAd />} />
     <Route path="/banner" element={<Banner />} />
     <Route path="*" element={<Dashboard />} />
    </Routes>
   </BrowserRouter>
  </>
 );
};

export default RouteMain;
