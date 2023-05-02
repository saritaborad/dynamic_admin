import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import RtdDatatable from "./Common/DataTable/DataTable";
import { Dropdown, Modal } from "react-bootstrap";
import Arrow from "../Images/arrow-top.svg";

import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { CustomAdModal } from "../Modals/CustomAdModal";
import { PostApi } from "../Api/apiServices";
import moment from "moment/moment";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";

let arr = [];
const CustomAd = () => {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);
 const [update, setUpdate] = useState(false);
 const [customAd, setCustomAd] = useState("");
 const [id, setId] = useState("");
 const [data, setData] = useState([]);
 const [selectedItem, setSelectedItem] = useState("All");
 const [delArr, setDelArr] = useState([]);
 const [deleteConfirm, setDeleteConfirm] = useState(false);

 const [option, set_option] = useState({
  sizePerPage: 10,
  search: "",
  totalRecord: 10,
  page: 1,
  sort: "createdAt",
  order: "ASC",
  entries: true,
  showSearch: true,
  checkbox: true,
 });

 const columns = [
  {
   value: "No",
   label: "No",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => <div>{i + 1}</div>,
   },
  },
  {
   value: "banner",
   label: "Banner",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <img src={data[i]?.banner} style={{ height: "100px", maxHeight: "100px" }} alt="" />;
    },
   },
  },
  {
   value: "icon",
   label: "Icon",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return <img src={data[i]?.icon} style={{ height: "70px", maxHeight: "70px", maxWidth: "80px" }} alt="" />;
    },
   },
  },
  {
   value: "add_title",
   label: "Title",
   options: {
    filter: false,
    sort: false,
   },
  },

  {
   value: "createdAt",
   label: "Uploaded",
   options: {
    filter: false,
    sort: true,
    customBodyRender: (data, i) => <div>{moment(data[i]?.createdAt).format("DD/MM/YYYY")}</div>,
   },
  },
  {
   value: "enable",
   label: "Status",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => <div>{data[i]?.enable == 1 ? "Online" : "Offline"}</div>,
   },
  },
  {
   value: "action",
   label: "Action",
   options: {
    filter: false,
    sort: false,
    customBodyRender: (data, i) => {
     return (
      <div className="action-icons" key={data[i]?._id}>
       <div className="cust-drop-down-menu">
        <Dropdown drop="left">
         <Dropdown.Toggle className="cust-drop-btn" id="dropdown">
          <span style={{ color: "#93a2dd" }}>
           <i className="fa fa-cog"></i>
          </span>
         </Dropdown.Toggle>
         <Dropdown.Menu>
          <ul>
           <li>
            <Dropdown.Item
             onClick={() => {
              setId(data[i]?._id);
              setCustomAd(data[i]);
              setShow(true);
              setUpdate(true);
             }}
            >
             <i className="fa fa-edit pe-2"></i>
             Edit Details
            </Dropdown.Item>
           </li>
           <li>
            <Dropdown.Item
             onClick={() => {
              navigate("/banner", { state: { customAdData: data[i] } });
             }}
            >
             <i className="fa fa-image pe-2"></i>
             Manage Banners
            </Dropdown.Item>
           </li>
          </ul>
         </Dropdown.Menu>
        </Dropdown>
       </div>

       <div className="form-check form-switch" key={i}>
        <input className="form-check-input" type="checkbox" id="cad-status" defaultChecked={data[i]?.enable == 1 ? true : false} onChange={(e) => updateCusAd({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })} />
       </div>

       <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => {
         setCustomAd(data[i]);
         setDeleteConfirm(true);
        }}
       >
        <i className="fa fa-trash"></i>
       </span>
      </div>
     );
    },
   },
  },
 ];

 useEffect(() => getAllCusAd(), []);

 const getAllCusAd = (status, search) => {
  let data = status || status == 0 ? { enable: status, ...option } : { ...option, search: search };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllCustomAd, data))).then((res) => {
   if (res.status === 200) {
    setData(res.data.data.allAd);
    set_option({ ...option, totalRecord: res.data.data?.totalRecord });
   }
  });
 };

 const submitFormData = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.addCustomAd, formData))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    resetForm(formData);
    getAllCusAd();
    setShow(false);
   }
  });
 };

 const deleteItem = () => {
  new Promise((resolve) => resolve(PostApi(API_PATH.delCustomAd, { _id: customAd?._id, delArr: arr }))).then((res) => {
   if (res.status === 200) {
    toast.success(res.data.message);
    setDeleteConfirm(false);
    getAllCusAd();
   }
  });
 };

 const updateCusAd = (formData, resetForm) => {
  new Promise((resolve) => resolve(PostApi(API_PATH.editCustomAd, formData))).then((res) => {
   if (res.status === 200) {
    setShow(false);
    getAllCusAd();
    resetForm && resetForm(formData);
    toast.success(res.data.message);
   }
  });
 };

 const handleSelect = (status) => {
  setSelectedItem(status);
  let enable = status === "Offline" ? 0 : status === "Online" && 1;
  getAllCusAd(enable);
 };

 const tableCallBack = (option) => {
  set_option(option);
  getAllCusAd("", option.search);
 };

 const appModalClose = () => {
  setShow(false);
  setUpdate(false);
 };

 const checkboxCallback = (data) => {
  arr = data?.filter((item) => item?.checked)?.map((item) => item?._id);
 };

 return (
  <>
   <MainLayout>
    <div className="content-main-section">
     <div className="container-fluid">
      <div className="row">
       <div className="col-12">
        <div className="comn-inr-title d-flex align-items-center">
         <h1>Manage Custom-AD</h1>
        </div>
       </div>
      </div>
      <div className="row">
       <div className="col-12 d-flex p-2">
        <div className="custom-design-dropdwon">
         <Dropdown>
          <Dropdown.Toggle id="dropdown">
           <svg className="me-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.18126 5.17527C8.49179 4.86473 8.49179 4.34718 8.18126 4.01076L5.17942 0.982901C4.86889 0.672366 4.35133 0.672366 4.01491 0.982901L0.987052 4.01076C0.676517 4.3213 0.676517 4.83886 0.987052 5.17527C1.29759 5.4858 1.81514 5.4858 2.15156 5.17527L3.75599 3.57084V14.4396C3.75599 14.8795 4.11828 15.2677 4.58408 15.2677C5.024 15.2677 5.41217 14.9054 5.41217 14.4396V3.57084L7.0166 5.17527C7.17187 5.33054 7.37889 5.40817 7.58592 5.40817C7.79294 5.40817 8.02584 5.33054 8.18111 5.17527H8.18126Z" fill="#333333" />
            <path d="M15.013 10.817C14.7025 10.5065 14.1849 10.5065 13.8485 10.817L12.2441 12.4214V1.5527C12.2441 1.11278 11.8818 0.724609 11.416 0.724609C10.9502 0.750487 10.5879 1.11278 10.5879 1.57858V12.4473L8.98347 10.8429C8.8282 10.6876 8.62118 10.61 8.41415 10.61C8.20713 10.61 8.00011 10.6876 7.84484 10.8429C7.5343 11.1534 7.5343 11.671 7.84484 12.0074L10.8467 15.0092C11.1572 15.3197 11.6748 15.3197 12.0112 15.0092L15.013 12.0074C15.3236 11.671 15.3236 11.1534 15.013 10.817Z" fill="#333333" />
           </svg>
           {selectedItem}
           <img src={Arrow} alt="arrow" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
           <Dropdown.Item onClick={() => handleSelect("All")}>All</Dropdown.Item>
           <Dropdown.Item onClick={() => handleSelect("Online")}>Online</Dropdown.Item>
           <Dropdown.Item onClick={() => handleSelect("Offline")}>Offline</Dropdown.Item>
          </Dropdown.Menu>
         </Dropdown>
        </div>

        <div className="ms-auto">
         <button className="add-button me-2" onClick={() => setShow(true)}>
          <i className="fa fa-plus pe-1"></i>Add New
         </button>
         <button
          className="del-button"
          onClick={() => {
           arr.length > 0 && setDeleteConfirm(true);
           setData(data?.map((item) => (arr.includes(item._id) ? { ...item, checked: true } : { ...item, checked: false })));
          }}
         >
          <i className="fa fa-trash pe-1"></i>Delete Items
         </button>
        </div>
       </div>
      </div>
      <div className="col-12">
       <div className="table-custom-info">
        <RtdDatatable data={data} columns={columns} option={option} tableCallBack={tableCallBack} checkboxCallback={checkboxCallback} />
       </div>
      </div>
     </div>
    </div>

    <Modal show={show} onHide={() => appModalClose()} size="md" className="cust-comn-modal" aria-labelledby="contained-modal-title-vcenter" centered>
     <CustomAdModal update={update} customAd={customAd} updateApp={updateCusAd} submitFormData={submitFormData} setShow={setShow} />
    </Modal>

    <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)} size="sm" className="cust-comn-modal p-5" centered>
     <DeleteConfirmModal setDelete={setDeleteConfirm} setConfirmDel={deleteItem} delChecked={arr} />
    </Modal>
   </MainLayout>
  </>
 );
};

export default CustomAd;
