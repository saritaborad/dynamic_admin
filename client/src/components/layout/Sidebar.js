import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import Logo from "../../Images/logo.svg";
import { AppContext } from "../../Context/AppContext";

function Sidebar() {
 let actId = localStorage.getItem("activeItemId");
 let togg = localStorage.getItem("toggle");
 const [path, setPath] = useState("");

 const [activeItemId, setActiveItemId] = useState(null);
 const [toggle, setToggle] = useState(togg);

 const handleAccordionClick = (e, itemId) => {
  e.preventDefault();
  setActiveItemId(itemId === activeItemId ? null : itemId);
  localStorage.setItem("activeItemId", itemId);
  localStorage.setItem("toggle", toggle);
 };
 const location = useLocation();
 const { activeApp } = useContext(AppContext);

 useEffect(() => {
  setPath(location.pathname.replace(/\//g, ""));
 }, []);

 return (
  <React.Fragment>
   <div className="sidebar-main-section">
    <div className="brand-title d-flex align-items-center">
     <Link href="/dashboard" className="d-flex align-items-center cursor-pointer">
      {/* <img src={Logo} alt="logo" /> */}
      <span>PIKSO GALLARY</span>
     </Link>
    </div>

    <div className="sidebar-main-section-inner">
     <ul className="sidebar-menu-boxes">
      <li className="sidebar-link">
       <Link to="/dashboard" className={path === "dashboard" ? "active" : ""}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fill-rule="nonzero"></path>
          <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3"></path>
         </g>
        </svg>
        <span>Dashboard</span>
       </Link>
      </li>
      <span className="sidebar-header">GENERAL MODULE</span>

      <li className="sidebar-link">
       <Link to="/custom-ad" className={path === "custom-ad" ? "active" : ""}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect x="0" y="0" width="24" height="24"></rect>
          <rect fill="#000000" opacity="0.3" x="4" y="4" width="4" height="4" rx="1"></rect>
          <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#000000"></path>
         </g>
        </svg>
        <span>Custom Ad</span>
       </Link>
      </li>

      <span className="sidebar-header">MANAGE APP DATA</span>
      <li className="sidebar-link">
       <Link to="/manage-admin" className={path === "manage-admin" ? "active" : ""}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect x="0" y="0" width="24" height="24"></rect>
          <rect fill="#000000" opacity="0.3" x="4" y="4" width="4" height="4" rx="1"></rect>
          <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#000000"></path>
         </g>
        </svg>
        <span>MANAGE ADMIN</span>
       </Link>
      </li>
      <span className="sidebar-header">APPLICATION LIST</span>

      <li className="sidebar-accodion">
       {activeApp?.length > 0 &&
        activeApp.map((item, i) => {
         const itemId = item?._id;
         return (
          <div key={itemId}>
           <div className="accordion">
            <div className="accordion-item">
             <h2 className="accordion-header">
              <button
               type="button"
               aria-expanded={toggle && itemId === (activeItemId || actId)}
               className="accordion-button"
               onClick={(e) => {
                handleAccordionClick(e, itemId);
                setToggle(itemId === (activeItemId || actId) ? !toggle : true);
               }}
              >
               <li className="sidebar-link">
                <Link className="" to={`/version?${item.table_prefix}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                   <rect x="0" y="0" width="24" height="24"></rect>
                   <path d="M7.5,4 L7.5,19 L16.5,19 L16.5,4 L7.5,4 Z M7.71428571,2 L16.2857143,2 C17.2324881,2 18,2.8954305 18,4 L18,20 C18,21.1045695 17.2324881,22 16.2857143,22 L7.71428571,22 C6.76751186,22 6,21.1045695 6,20 L6,4 C6,2.8954305 6.76751186,2 7.71428571,2 Z" fill="#000000" fill-rule="nonzero"></path>
                   <polygon fill="#000000" opacity="0.3" points="7.5 4 7.5 19 16.5 19 16.5 4"></polygon>
                  </g>
                 </svg>
                 <span>{item.title}</span>
                </Link>
               </li>
              </button>
             </h2>

             <div className={`accordion-collapse collapse ${toggle && itemId === (activeItemId || actId) ? "show" : ""}`}>
              <div className="accordion-body">
               <ol style={{ listStyleType: "disc" }}>
                <li onClick={(e) => e.preventDefault()}>
                 <Link className={`/${path + location.search}` === `/version?${item.table_prefix}` ? "active" : ""} to={`/version?${item.table_prefix}`}>
                  <span>Version</span>
                 </Link>
                </li>
                <li onClick={(e) => e.preventDefault()}>
                 <Link className={`/${path + location.search}` === `/pp?${item.table_prefix}` ? "active" : ""} to={`/pp?${item.table_prefix}`}>
                  <span>Privacy Policy</span>
                 </Link>
                </li>
               </ol>
              </div>
             </div>
            </div>
           </div>
          </div>
         );
        })}
      </li>
     </ul>
     <div className="sidebar-log-fix">
      <button type="submit" className="border-0 bg-transparent">
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.66671 4.16665C6.66671 4.62498 6.29171 4.99998 5.83337 4.99998H5.00004V15H5.83337C6.29171 15 6.66671 15.375 6.66671 15.8333C6.66671 16.2916 6.29171 16.6666 5.83337 16.6666H4.16671C3.70837 16.6666 3.33337 16.2916 3.33337 15.8333V4.16665C3.33337 3.70831 3.70837 3.33331 4.16671 3.33331H5.83337C6.29171 3.33331 6.66671 3.70831 6.66671 4.16665ZM15.0033 6.1873L17.3483 9.52063C17.5566 9.81563 17.5499 10.2115 17.3333 10.4998L14.8333 13.8331C14.6699 14.0515 14.4191 14.1665 14.1658 14.1665C13.9924 14.1665 13.8166 14.1123 13.6666 13.9998C13.2983 13.724 13.2241 13.2015 13.4999 12.834L15.0008 10.8331H14.9999H8.33326C7.87326 10.8331 7.49993 10.4606 7.49993 9.9998C7.49993 9.53896 7.87326 9.16646 8.33326 9.16646H14.9999C15.0137 9.16646 15.0265 9.17026 15.0393 9.17408C15.0498 9.1772 15.0604 9.18034 15.0716 9.18146L13.6399 7.14563C13.3749 6.7698 13.4658 6.2498 13.8424 5.9848C14.2183 5.71896 14.7383 5.81063 15.0033 6.1873Z" fill="#333333" />
        <mask id="mask0_2_4412" maskUnits="userSpaceOnUse" x="3" y="3" width="15" height="14">
         <path fillRule="evenodd" clipRule="evenodd" d="M6.66671 4.16665C6.66671 4.62498 6.29171 4.99998 5.83337 4.99998H5.00004V15H5.83337C6.29171 15 6.66671 15.375 6.66671 15.8333C6.66671 16.2916 6.29171 16.6666 5.83337 16.6666H4.16671C3.70837 16.6666 3.33337 16.2916 3.33337 15.8333V4.16665C3.33337 3.70831 3.70837 3.33331 4.16671 3.33331H5.83337C6.29171 3.33331 6.66671 3.70831 6.66671 4.16665ZM15.0033 6.1873L17.3483 9.52063C17.5566 9.81563 17.5499 10.2115 17.3333 10.4998L14.8333 13.8331C14.6699 14.0515 14.4191 14.1665 14.1658 14.1665C13.9924 14.1665 13.8166 14.1123 13.6666 13.9998C13.2983 13.724 13.2241 13.2015 13.4999 12.834L15.0008 10.8331H14.9999H8.33326C7.87326 10.8331 7.49993 10.4606 7.49993 9.9998C7.49993 9.53896 7.87326 9.16646 8.33326 9.16646H14.9999C15.0137 9.16646 15.0265 9.17026 15.0393 9.17408C15.0498 9.1772 15.0604 9.18034 15.0716 9.18146L13.6399 7.14563C13.3749 6.7698 13.4658 6.2498 13.8424 5.9848C14.2183 5.71896 14.7383 5.81063 15.0033 6.1873Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2_4412)"></g>
       </svg>
       <span>Log Out</span>
      </button>
     </div>
    </div>
   </div>
  </React.Fragment>
 );
}

export default Sidebar;
