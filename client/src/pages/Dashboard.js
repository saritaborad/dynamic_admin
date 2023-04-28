import MainLayout from "../components/layout/MainLayout";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

import calender from "../Images/calendar.svg";

import moment from "moment";
// import Loader from "../images/loader.gif";
// import MonthPicker from "simple-react-month-picker";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { API_PATH } from "../const";
import { PostApi } from "../Api/apiServices";

const Dashboard = () => {
 const [userData, setUserData] = useState([]);
 const [category, setCategories] = useState("");
 const [Loader, setLoader] = useState(false);
 const [todayData, setTodayData] = useState(false);
 const [lastThirty, setLastThirty] = useState(false);
 const [yesterday, setYesterday] = useState(false);
 const [lastSeven, setLastSeven] = useState(false);

 const chart = {
  series: [
   {
    name: "downloads",
    data: userData,
   },
  ],
  fill: {
   opacity: 1,
  },
  chart: {
   height: 300,
   type: "line",
   fontFamily: "Rubik",
   zoom: {
    enabled: true,
   },
   toolbar: {
    show: true,
   },
  },
  yaxis: {
   tickAmount: 2,
  },
  xaxis: {
   type: "category",
   categories: category,
  },
  dataLabels: {
   enabled: false,
  },
  colors: ["#0066B9"],
  stroke: {
   show: true,
   lineCap: "butt",
   width: 2,
   dashArray: 0,
  },
 };

 useEffect(() => {
  getDashboard("2022-08-11", "2022-09-12");
 }, []);

 const getDashboard = (start, end) => {
  let date = { startDate: start, endDate: end };
  const getDashboardCountPromise = new Promise((resolve, reject) => {
   resolve(PostApi(API_PATH.getDashboard, date));
  });

  getDashboardCountPromise.then((response) => {
   if (response.status == 200) {
    setUserData(response.data.data.y);
    setCategories(response.data.data.x);
    setTodayData(response.data.data?.todayData || 0);
    setYesterday(response.data.data?.yesterdayData || 0);
    setLastSeven(response.data.data?.lastSevenData || 0);
    setLastThirty(response.data.data?.monthlyData || 0);
    setLoader(false);
   }
  });
 };

 const onApply = (e, picker) => {
  let start_date = moment(picker.startDate).format("YYYY-MM-DD");
  let end_date = moment(picker.endDate).format("YYYY-MM-DD");
  getDashboard(start_date, end_date);
 };

 return (
  <>
   <MainLayout>
    <div className="content-main-section">
     <div className="container-fluid">
      <div className="row">
       <div className="col-12">
        <div className="comn-inr-title d-flex align-items-center">
         <h1>Install Track Versions</h1>
        </div>
       </div>
      </div>
      <div className="col-12">
       <div className="row me-0 justify-content-center">
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p>{todayData}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Today</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p>{yesterday}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Yesterday</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p>{lastSeven}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Last 7 Days</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p>{lastThirty}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Last 30 Days</bdi>
          </div>
         </div>
        </div>
       </div>
      </div>

      <div className="chart-info">
       <div className="row">
        <div className="dash-month pt-5 pb-4">
         <div className="col-lg-3 col-md-6  picker ">
          <span className="pe-2"> Version:</span>
          <select name="AdminRole" className="form-select bg-white">
           <option value="Admin">All Version</option>
           <option value="Sub Admin">Sub Admin</option>
           <option value="Contributor">Contributor</option>
           <option value="Staff">Staff</option>
          </select>
         </div>
         <div className="col-lg-5 col-md-6 picker ">
          <span className="pe-2"> Date:</span>
          <div className="position-relative">
           <DateRangePicker initialSettings={"today"} onApply={(e, picker) => onApply(e, picker)}>
            <input className="form-control datepicker ps-5 pe-4" />
           </DateRangePicker>
           <div className="dash-cal">
            <img src={calender} alt="cal" />
           </div>
          </div>
         </div>
        </div>
       </div>
       <div className="row me-0" style={{ display: "flex", justifyContent: "center" }}>
        <div className="col-lg-9 col-md-7 pe-0 mb-3 ">
         <div className="chart-box">
          <div className="dash-part-hdr-top p-4">
           <span>Total Downloads:</span>
          </div>
          <div className="chart-main-part">
           <Chart options={chart} series={chart.series} height={300} type="line" />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </MainLayout>
  </>
 );
};

export default Dashboard;
