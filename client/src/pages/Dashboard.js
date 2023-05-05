import "bootstrap-daterangepicker/daterangepicker.css";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Chart from "react-apexcharts";
import moment from "moment";
import calender from "../Images/calendar.svg";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { API_PATH } from "../const";
import { PostApi } from "../Api/apiServices";

const Dashboard = () => {
 const [installData, setInstallData] = useState([]);
 const [allVersion, setAllVersion] = useState([]);
 const [version, setVersion] = useState("");
 const [category, setCategories] = useState("");
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const [todayData, setTodayData] = useState(false);
 const [lastThirty, setLastThirty] = useState(false);
 const [yesterday, setYesterday] = useState(false);
 const [lastSeven, setLastSeven] = useState(false);
 const [totalDownload, setTotalDownload] = useState(0);

 const chart = {
  series: [
   {
    name: "downloads",
    data: installData,
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
  yaxis: [
   {
    labels: {
     formatter: function (val) {
      return val.toFixed(0);
     },
    },
   },
  ],
  xaxis: {
   type: "datetime",
   categories: category,
   labels: {
    format: "dd MMM",
   },
  },
  dataLabels: {
   enabled: false,
  },
  legend: {
   show: false,
  },
  sparkline: {
   enabled: true,
  },
  colors: ["#0066B9"],
  stroke: {
   show: true,
   lineCap: "butt",
   width: 2,
   dashArray: 0,
  },
  noData: {
   text: "No data available!",
   align: "center",
   verticalAlign: "middle",
   offsetX: 0,
   offsetY: 0,
   style: {
    color: "#646c9a",
    fontSize: "19px",
    fontFamily: "Rubik",
   },
  },
 };

 useEffect(() => getDashboard(), []);

 const getDashboard = (start, end, app_version) => {
  let date = { startDate: start ? start : moment(Date.now()).format("YYYY-MM-DD"), endDate: end ? end : moment(Date.now()).format("YYYY-MM-DD"), app_version: app_version };
  const getDashboardCountPromise = new Promise((resolve, reject) => resolve(PostApi(API_PATH.getDashboard, date)));

  getDashboardCountPromise.then((response) => {
   if (response.status === 200) {
    setAllVersion(response.data.data?.allVersion);
    setInstallData(response.data.data?.y);
    setCategories(response.data.data?.x);
    setTodayData(response.data.data?.todayData || 0);
    setYesterday(response.data.data?.yesterdayData || 0);
    setLastSeven(response.data.data?.lastSevenData || 0);
    setLastThirty(response.data.data?.monthlyData || 0);
    setTotalDownload(response.data.data?.totalDownload || 0);
   }
  });
 };

 const handleApply = (e, picker) => {
  setStartDate(moment(picker.startDate).format("YYYY-MM-DD"));
  setEndDate(moment(picker.endDate).format("YYYY-MM-DD"));
  let start_date = moment(picker.startDate).format("YYYY-MM-DD");
  let end_date = moment(picker.endDate).format("YYYY-MM-DD");
  getDashboard(start_date, end_date, version);
 };

 const changeVersion = (version) => {
  setVersion(version);
  getDashboard(startDate, endDate, version);
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
          <p style={{ color: "#646c9a" }}>{todayData}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Today</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p style={{ color: "#646c9a" }}>{yesterday}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Yesterday</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p style={{ color: "#646c9a" }}>{lastSeven}</p>
          <div className="dash-top-box-info d-flex align-items-center">
           <bdi>Last 7 Days</bdi>
          </div>
         </div>
        </div>
        <div className="col-xxl col-xl-3 col-md-4 col-6 pe-0 mb-3">
         <div className="dash-top-box fix-span">
          <p style={{ color: "#646c9a" }}>{lastThirty}</p>
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
          <select className="form-select bg-white" onChange={(e) => changeVersion(e.target.value)}>
           <option value="">All Version</option>
           {allVersion?.length > 0 &&
            allVersion?.map((item, i) => (
             <option key={i} value={item}>
              {item}
             </option>
            ))}
          </select>
         </div>
         <div className="col-lg-5 col-md-6 picker ">
          <span className="pe-2"> Date:</span>
          <div className="position-relative">
           <DateRangePicker onApply={(e, picker) => handleApply(e, picker)}>
            <input className="form-control datepicker ps-5 pe-4" id="cal" />
           </DateRangePicker>
           <div className="dash-cal">
            <label htmlFor="cal">
             <img src={calender} alt="cal" />
            </label>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div className="row me-0" style={{ display: "flex", justifyContent: "center" }}>
        <div className="col-lg-9 col-md-7 pe-0 mb-3 ">
         <div className="chart-box">
          <div className="dash-part-hdr-top p-4">
           <span style={{ color: "#646c9a", fontSize: "21px", fontWeight: "500" }}>Total Downloads: {totalDownload}</span>
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
