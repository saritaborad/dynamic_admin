import React from "react";
import Profile from "../../Images/profile-image.png";
import NotificationIcon from "../../Images/notification-icon.png";
import SearchIcon from "../../Images/seacrh-icon.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function Header(props) {
 const idarrowdesk = () => {
  document.getElementById("root").classList.toggle("dash-main-class-add");
 };

 return (
  <React.Fragment>
   <header className="header-fix-top-section">
    <div className="container">
     <div className="row">
      <div className="col-12 d-flex">
       <div>
        <div className="d-xl-none me-3">
         <button
          className="toggl-btn-respo"
          type="button"
          onClick={() => idarrowdesk()}
         >
          <svg
           width="6"
           height="10"
           viewBox="0 0 6 10"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
          >
           <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.292894 9.70711C-0.0976307 9.31658 -0.0976307 8.68342 0.292894 8.29289L3.58579 5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292894C0.683417 -0.0976312 1.31658 -0.0976312 1.70711 0.292894L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292894 9.70711Z"
            fill="#333333"
           ></path>
          </svg>
         </button>
        </div>
        <div className="main-title-dash position-relative">
         <input
          type="search"
          className="form-control"
          placeholder="Search here..."
         />
         <img src={SearchIcon} alt="profile" />
        </div>
       </div>
       <div className="ms-auto text-end ps-3">
        <div className="d-inline-flex align-items-center align-middle overflow-hidden ms-auto w-100">
         <div className="row">
          <div className="col-12">
           <ul>
            <li className="profile-hdr-drop-class">
             <Dropdown className="d-inline" drop="left">
              <Dropdown.Toggle
               variant="transparent"
               id="dropdown-autoclose-true"
              >
               <div className="">
                <img src={NotificationIcon} alt="profile" />
               </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
               <Dropdown.Item>
                <div>
                 <h3>Notification</h3>
                </div>
               </Dropdown.Item>
               <Dropdown.Item>
                <div className="noti-main-div d-flex align-items-center py-2">
                 <div>
                  <img src={Profile} alt="" />
                 </div>
                 <div className="time-noti-div ms-3">
                  <div className="d-flex">
                   <span>John Deo</span>
                   <bdi className="ms-auto">5 min ago</bdi>
                  </div>
                  <div className="noti-detail-part">
                   <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                   </p>
                  </div>
                 </div>
                </div>
               </Dropdown.Item>
               <Dropdown.Item>
                <div className="noti-main-div d-flex align-items-center py-2">
                 <div>
                  <img src={Profile} alt="" />
                 </div>
                 <div className="time-noti-div ms-3">
                  <div className="d-flex">
                   <span>John Deo</span>
                   <bdi className="ms-auto">5 min ago</bdi>
                  </div>
                  <div className="noti-detail-part">
                   <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                   </p>
                  </div>
                 </div>
                </div>
               </Dropdown.Item>
               <Dropdown.Item>
                <div className="noti-main-div d-flex align-items-center py-2">
                 <div>
                  <img src={Profile} alt="" />
                 </div>
                 <div className="time-noti-div ms-3">
                  <div className="d-flex">
                   <span>John Deo</span>
                   <bdi className="ms-auto">5 min ago</bdi>
                  </div>
                  <div className="noti-detail-part">
                   <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                   </p>
                  </div>
                 </div>
                </div>
               </Dropdown.Item>
              </Dropdown.Menu>
             </Dropdown>
            </li>
           </ul>
          </div>
         </div>
         {/* <div className="align-middle position-relative d-inline-flex me-3">
                            <img src={NotificationIcon} alt="profile" />
                        </div> */}

         <Link to="/" className="d-flex align-items-center prf-hdr-top">
          <img src={Profile} alt="profile" />
          <div className="ps-2 text-start">
           <span className="d-block">John Deo</span>
           <bdi className="d-block">Admin</bdi>
          </div>
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
   </header>
  </React.Fragment>
 );
}

export default Header;
