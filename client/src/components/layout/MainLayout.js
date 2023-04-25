import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = (props) => {
    
 return (
  <React.Fragment>
   <Header />
   {props.children}
   <Sidebar activeApp={props.sidebar} />
  </React.Fragment>
 );
};

export default MainLayout;
