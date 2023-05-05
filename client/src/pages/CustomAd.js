import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import RtdDatatable from "./Common/DataTable/DataTable";
import { Dropdown, Modal } from "react-bootstrap";
import { API_PATH } from "../const";
import { toast } from "react-toastify";
import { CustomAdModal } from "../Modals/CustomAdModal";
import { PostApi } from "../Api/apiServices";
import moment from "moment/moment";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal";
import { ReactComponent as Loader } from "../Images/loader.svg";
import { useNavigate } from "react-router-dom";
import { StatusFilter } from "../components/Common/Common";

let arr = [];
const CustomAd = () => {
 const navigate = useNavigate();
 const [show, setShow] = useState(false);
 const [update, setUpdate] = useState(false);
 const [customAd, setCustomAd] = useState("");
 const [data, setData] = useState([]);
 const [loader, setLoader] = useState(false);
 const [selectedItem, setSelectedItem] = useState("All");
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
    customBodyRender: (data, i) => <div>{data[i]?.enable === 1 ? "Online" : "Offline"}</div>,
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
        <input className="form-check-input" type="checkbox" id="cad-status" defaultChecked={data[i]?.enable === 1 ? true : false} onChange={(e) => updateCusAd({ _id: data[i]._id, enable: e.target.checked ? 1 : 0 })} />
       </div>
       <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => {
         setCustomAd(data[i]);
         setDeleteConfirm(true);
         arr = [];
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
  setLoader(true);
  let data = status || status == 0 ? { enable: status, ...option } : { ...option, search: search };
  new Promise((resolve) => resolve(PostApi(API_PATH.getAllCustomAd, data))).then((res) => {
   if (res.status === 200) {
    setLoader(false);
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
    arr = [];
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

 const deleteMultiItem = () => {
  arr.length > 0 && setDeleteConfirm(true);
  setData(data?.map((item) => (arr.includes(item._id) ? { ...item, checked: true } : { ...item, checked: false })));
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
        <StatusFilter selectedItem={selectedItem} handleSelect={handleSelect} />
        <div className="ms-auto">
         <button className="add-button me-2" onClick={() => setShow(true)}>
          <i className="fa fa-plus pe-1"></i>Add New
         </button>
         <button className="del-button" onClick={() => deleteMultiItem()}>
          <i className="fa fa-trash pe-1"></i>Delete Items
         </button>
        </div>
       </div>
      </div>
      {loader ? (
       <div className="preloader">
        <div className="status">
         <Loader />
        </div>
       </div>
      ) : (
       <div className="col-12">
        <div className="table-custom-info">
         <RtdDatatable data={data} columns={columns} option={option} tableCallBack={tableCallBack} checkboxCallback={checkboxCallback} />
        </div>
       </div>
      )}
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
